require('dotenv').config();
const knex = require('knex');

const dialogflow = require('dialogflow').v2beta1;
const db = require('../config/dbconfig.js');
const sessionClient = require('../config/dfconfig.js');

const chatAI = async (req, res) => {
  const { message } = req.body;
  const sessionId = "b2f763a9-9e5f-fd3c-2b26-0318b3cfcede11";

  // Create a new session
  const projectId = process.env.GOOGLE_PROJECT_ID
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  console.log('session path: ', sessionPath)
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
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  res.json(result);
}
  ;

module.exports = {
  chatAI
}