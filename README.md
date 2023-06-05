# gmail-auto-reply

1) To start this app use "node server.js" and required credential.json which is a oauth client id and client secret
2) Library use are googleapi , node-cron and nodemailer
3) googleapi is use to call the google services in functional way
4) node-cron a simple cron-like task scheduler for Node.js
5) nodemailer libary to compose the mail in format accordance with google api


# Area where it can improve

1) I have used the file to store the credentials and in-memory taskqueue this can be move to persistance storage 
2) Outh client id and client can be move to env variable
3) Currently using the postman for request and response , this can be shifted to UI
4) Reply to thread can be extened to cc and bcc also
5) Need to have the Validation and error handling
6) Require to add timestamp logger 
7) Can be more optimize the api call by using timestamp updation
