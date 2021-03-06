import dialogflow from 'dialogflow'
const sessionClient = new dialogflow.SessionsClient();
const projectId = "newagent-a0c16";
const sessionId = "quickstart-session-id";
const query = 'Schedule a meeting with Francis';
const languageCode = "en-US";


 export default function interpret(slackId, query){
  const sessionPath = sessionClient.sessionPath(projectId, slackId);
  const request = {
    session: sessionPath, //keeps track of which conversation is which, using unique sessionId/slackId
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };
  return sessionClient
    .detectIntent(request)
    //implicitly detect intent trying to trigger / should sent trigger
    .then(responses => {
      const result = responses[0].queryResult;      // if(!result.allRequredParamsPresent){
      //     //call function again
      // }

      if (result.intent) {
        console.log(`************  Intent: ${result.intent.displayName}`);
        return result;
      } else {
        console.log(`  No intent matched.`);
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  // .catch(resp=> console.log('Error', error))
  }
