const {google} = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');
const credentials = require('./credentials.json');
const {modifyLabel,getLabelId} = require('./label')


const encodeMessage = (message) => {
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  
const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
  };

async function sendMail(auth,mailBody) {
    console.log('Sending the mail .....')
    const gmail = google.gmail({version: 'v1', auth});
    const options = {
      to: mailBody.to,
      replyTo: mailBody.to,
      subject:`Re:${mailBody.subject}`,
      text: 'This email is sent from the command line',
      html: `<p> ${mailBody.message}</p>`,
      textEncoding: 'base64',
      headers: [
        { key: 'X-Application-Developer', value: 'Ankit Singh' },
        { key: 'X-Application-Version', value: 'v1.0.0.2' },
        {key : 'In-Reply-To', value : mailBody.messageId},
        {key : 'References', value : mailBody.messageId},
      ]
    };
    const rawMessage = await createMail(options);
    const res = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        threadId : mailBody.id,
        raw: rawMessage
      }
      
    });

    console.log('Adding mail to the label .....')
    const labelId = await getLabelId(auth,mailBody.label)
    const respo = await modifyLabel(auth,mailBody.id,labelId);
    return res
}
  

module.exports = sendMail