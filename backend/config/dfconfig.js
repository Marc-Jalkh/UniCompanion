require('dotenv').config();
const dialogflow = require('dialogflow').v2beta1;

const credts ={
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY
};
   

const sessionClient  =  null// new dialogflow.SessionsClient({credentials: credts});

module.exports = sessionClient;