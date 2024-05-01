require('dotenv').config();
const sessionClient = require('../config/dfconfig.js');
const fs = require('fs');

const chatAI = async (req, res) => {
  console.log(process.env.KNOWLEDGE_BASE_NAMES.split(','))
  const { message } = req.body;
  const userID = req.user_id;
  const sessionId = process.env.SESSION_ID + userID;
  // Create a new session
  const projectId = process.env.GOOGLE_PROJECT_ID

  // Correct way to generate session path
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
      queryParams: {
        timeZone: 'Asia/Beirut',
        sentimentAnalysisRequestConfig: {
          analyzeQueryTextSentiment: true
        },
        knowledgeBaseNames: ['projects/unicompanion-bnjr/knowledgeBases/NTIxODQzNDE5MjkwNzQzNjAzMw']
      },
    }
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
  
  // Check if file exists and handle file operations
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath);
      jsonData = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  }
  
  jsonData.push(dialog);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
  
  res.json(result);
}


const history = async (req, res) => {
  console.log("History request received.")
  const userID = req.user_id;
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