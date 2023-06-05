const {google} = require('googleapis');


async function getMail(auth,threadId) {
  
    console.log('Fetching the mail with the threadId .......')
    const gmail = google.gmail({version: 'v1', auth});
    const res = await gmail.users.threads.get({
        userId: 'me',
        id : threadId
    });
    
  return res.data

};

module.exports = getMail