const fs = require('fs')
const express = require('express')
const googleAuthorization = require('./auth')
const listMail = require('./listMail')
const getMail = require('./getMail')
const verifyThread = require('./verifyEmail');
const sendMail = require('./sendMail');

const cron = require("node-cron");
const { translate } = require('googleapis/build/src/apis/translate')
const { async } = require('q')



const app = express();

const port = 3001;

app.use(express.json());

let taskMap ={}

app.post('/api/v1/subscribe',async (req,res) => {

    
    req.body.timestamp = Math.floor(new Date().getTime() / 1000);
    if(!taskMap[req.body.email]){
        taskMap[req.body.email] = req.body
    }

    // try{ 
    // let auth = await googleAuthorization();
    // let messages = await listMail(auth);
    // let threads = await getMail(auth,messages.threads[0].id);
    // let dec = await verifyThread(threads,req.body)
    // let sendMailResp = await sendMail(auth,dec)
    // console.log(sendMailResp)
    // console.log(JSON.stringify(threads));
    // console.log('here');

    // }catch(error){
    //     console.log(error);
    //     res.status(500).send();
    // }

    res.status(200).json({
        status : 'success',
        data:{
            done:'Succesfully Subscribe'
        }
        });
})

app.post('/api/v1/unsubscribe',(req,res) =>{

    if(taskMap[req.body.email]){
        delete taskMap[req.body.email];
    }

    res.status(200).json({
        status : 'success',
        data:{
            done:'Succesfully Unsubscribe'
        }
    });
})

// Creating a cron job which runs on every 45 second
cron.schedule("*/45 * * * * *", async function(){
    console.log("running a task every 45 second");
    for(const key in taskMap){
        let req = taskMap[key];
        let auth = await googleAuthorization();
        let messages = await listMail(auth,req);
        let threads = messages.threads;
        for(let i = 0;i < threads.length;i++){
            let thread = await getMail(auth,threads[i].id);
            let dec = await verifyThread(thread,req)
            if(dec){
                await sendMail(auth,dec)
            }else{
                console.log('Email is already replied .....')
            }
        }
        
    }
    
}); 



// will start the server 
app.listen(port ,() =>{
    console.log(`App running on port ${port}`);
    
}); 


 