require("dotenv").config();
const sessionClient = require("../config/dfconfig.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("../config/dbconfig.js");

const chatAI = async (req, res) => {
  const { message } = req.body;
  const userID = req.user_id;
  const sessionId = process.env.SESSION_ID + userID;
  // Create a new session
  const projectId = process.env.GOOGLE_PROJECT_ID;
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
      queyParams: {
        source: "DIALOGFLOW_CONSOLE",
        timeZone: "Asia/Beirut",
        sentimentAnalysisRequestConfig: {
          analyzeQueryTextSentiment: true,
        },
      },
      queryParams: {
        knowledgeBaseNames: process.env.KNOWLEDGE_BASE_NAMES,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  const dialog = {
    request: message,
    response: result.fulfillmentText,
    timestamp: new Date().toISOString(),
  };

  let jsonData = [];

  const filePath = "./chatDialogs/dialog" + userID + ".json";

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Read existing JSON file content
    try {
      const fileContent = fs.readFileSync(filePath);
      jsonData = JSON.parse(fileContent);
      console.log("JSON file read successfully.");
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  }

  // Append new dialog to JSON data
  jsonData.push(dialog);

  // Write updated JSON data back to the file
  try {
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log("Dialog appended to JSON file.");
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }

  // Send response
  res.json(result);
};

const history = async (req, res) => {
  console.log("History request received.");
  const userID = req.user_id;
  const filePath = "./chatDialogs/dialog" + userID + ".json";
  let jsonData = [];

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Read existing JSON file content
    try {
      const fileContent = fs.readFileSync(filePath);
      jsonData = JSON.parse(fileContent);
      console.log("JSON file read successfully.");
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  }

  // Send response
  res.json(jsonData);
};

const normalChats = async (req, res) => {
  const userId = req.user_id; // Assuming this comes from some authentication middleware
  try {
    const chatrooms = await db("chatrooms")
      .select("*")
      .where("user1_id", userId)
      .orWhere("user2_id", userId);
    const chatDetails = await Promise.all(
      chatrooms.map(async (room) => {
        const otherUserId =
          room.user1_id == userId ? room.user2_id : room.user1_id;
        const otherUser = await db("users")
          .where("users.user_id", otherUserId)
          .join("users_roles", "users.user_id", "users_roles.user_id")
          .join("roles", "users_roles.role_id", "roles.role_id")
          .select("first_name", "last_name", "users.user_id as user_id", "picture", "roles.name as roles")
          .first();

        const path = room.path_to_json;
        const messages = JSON.parse(fs.readFileSync(`${path}`));
        const lastMessage = messages[messages.length - 1];
        return {
          user: {
             name: `${otherUser.first_name} ${otherUser.last_name}`,
              id: otherUser.user_id,
              picture: otherUser.picture,
              role: otherUser.roles
            },
          last_message: lastMessage ? lastMessage.message : "No messages yet",
          last_message_date: lastMessage.date ?? null,
          unreadMessages: lastMessage.read
        };
      })
    );

    chatDetails.sort(
      (a, b) => new Date(b.last_message_date) - new Date(a.last_message_date)
    );
    res.json(chatDetails);
  } catch (error) {
    console.error("Error fetching chatrooms:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  chatAI,
  history,
  normalChats,
};
