

const verifyThread = async (threads, req) => {

    console.log('Verify the thread if it is already replied ......')
    let messages = threads.messages;
    let subject;
    let messageId;
    let to;

    for(let i=0;i < messages.length;i++){
        let headers = messages[i].payload.headers;
        for(let j=0;j<headers.length;j++){
            if(headers[j].name == 'From'){
                to = headers[j].value;
                if(headers[j].value.match(req.email)) {
                    return undefined;
                }
            }else if(headers[j].name == 'Subject' && !subject){
                subject = headers[j].value;
            }else if( headers[j].name == 'Message-ID'){
                messageId = headers[j].value;
            }
        }
    }

    return {
        subject,
        messageId,
        to,
        id : threads.id,
        message : req.message,
        label : req.label

    }
  };

module.exports = verifyThread