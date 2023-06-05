const {google} = require('googleapis');



async function listMail(auth,req) {
  
    console.log('Fecthing the mail.......')
    const gmail = google.gmail({version: 'v1', auth});
    const res = await gmail.users.threads.list({
        userId: 'me',
        labelIds :['INBOX'],
        q :`after:${req.timestamp}`
    });
    
    return res.data;

};

module.exports = listMail