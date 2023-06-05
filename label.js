const {google} = require('googleapis');



async function getLabelId(auth,labelName) {
  
    const gmail = google.gmail({version: 'v1', auth});

    const listOflabel = await gmail.users.labels.list({
        userId: 'me',
    });

    let flag = true;
    let labels = listOflabel.data.labels
    for(let i=0;i<labels.length;i++){
        if(labels[i].name == labelName){
            
            flag = false;
            return labels[i].id
        }
    }

    
    const newLabel = await gmail.users.labels.create({
        userId: 'me',
        resource :{
            name : labelName
        }
    });

    return newLabel.data.id;


};


async function modifyLabel(auth,threadId,threadLabel) {
  
    const gmail = google.gmail({version: 'v1', auth});
    const res = await gmail.users.threads.modify({
        userId : "me",
        id : threadId,
        resource: {

            addLabelIds: [
                threadLabel
            ],
            removeLabelIds: [
              'INBOX'
            ]
        }
    });
    
    return res.data;

};


module.exports = {modifyLabel,getLabelId}


