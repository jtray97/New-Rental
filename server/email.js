var nodemailer = require('nodemailer');
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'Tyler.ray.97@gmail.com',
    pass: process.env.MY_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Tyler" tyler.ray.97@gmail.com',
  to: 'tyler.ray.97@gmail.com',
  subject: 'Whats up this is a test',
  text: 'Test Body'
};



  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
  });
// let {SERVER_PORT} = process.env
  app.listen(5000, () => { console.log(`${5000} emails per day`) })