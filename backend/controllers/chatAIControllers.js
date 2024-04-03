require('dotenv').config();
const sessionClient = require('../config/dfconfig.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const chatAI = async (req, res) => {
  const { message } = req.body;
  const token = req.headers.token;
  //const decodedToken = jwt.verify(token, process.env.JWT_SECRET) || {id: '11'};
  //const userID = decodedToken.id;
  const userID = '11';
  const sessionId = process.env.SESSION_ID + userID;
  // Create a new session
  const projectId = process.env.GOOGLE_PROJECT_ID
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
      queyParams: {
        source: 'DIALOGFLOW_CONSOLE',
        timeZone: 'Asia/Beirut',
        sentimentAnalysisRequestConfig: {
          analyzeQueryTextSentiment: true
        }
      },
      queryParams: {
        knowledgeBaseNames: process.env.KNOWLEDGE_BASE_NAMES
      },
    },

  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  const dialog = {
    request: message,
    response:  result.fulfillmentText,
    timestamp: new Date().toISOString(),
  };

  let jsonData = [];

  const filePath = './chatDialogs/dialog' + userID + '.json';
  
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
}

const history = async (req, res) => {
  console.log("History request received.")
  const token = req.headers.token;
  //const decodedToken = jwt.verify(token, process.env.JWT_SECRET) || {id: '11'};
  //const userID = decodedToken.id;
  const userID = '11';
  const filePath = './chatDialogs/dialog' + userID + '.json';
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
}

module.exports = {
  chatAI,
  history
}