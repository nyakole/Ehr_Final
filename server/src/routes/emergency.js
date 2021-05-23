'use strict';


const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
let emer = require("./emer")
const nodemailer = require('nodemailer');



let emergency = Router();


emergency.use(morgan('combined'));
emergency.use(bodyParser.json());
emergency.use(cors());
//emergency.use(bodyparser.urlencoded({extended : false}));



const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;

emergency.post('/send', async (req, res) =>{
  console.log('req.body: ');
  console.log(req.body);
  let invokeResponse = await emer.emergency1(req.body.patient);

  if (invokeResponse.length == 0) {
    console.log("Hifsggdfdfgdfdf")
    res.send(invokeResponse);
  } else {
    
      res.send(true)
  }


});

emergency.post('/verify', async (req, res) => {

  console.log('req.body: ');
  console.log(req.body);
  // send mail with defined transport object
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'yahoo',
    secure: false,
    auth: {
      user: 'ehrsystem@yahoo.com',
      pass: 'smkttwgjuawjisdz'
    },
    debug: false,
    logger: true
  });
  let invokeResponse = await emer.emergency1(req.body.patient);

  if (invokeResponse.length == 0) {
    console.log("Hifsggdfdfgdfdf")
    res.send(invokeResponse);
  } else {
    console.log('after network.invoke ');
    console.log(invokeResponse[0].Record.email)
    console.log(req.body.person.name )
    var mailOptions = {
      from: 'ehrsystem@yahoo.com',
      to: invokeResponse[0].Record.email,
      subject: 'Your account has been opened in Emergency',
      html: "<h3>Your account has been opened in Emergency </h3>" +

        "<h4>The information of the person who admitted you </h4>" +
        "<table style='font-family: arial, sans-serif;border-collapse: collapse; width: 100%;'>" +


        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Name" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.person.name + "</td>" + "</tr>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Mobile No." + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.person.phNo + "</td>" + "</tr>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Email" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.person.email + "</td>" + "</tr>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Realation with you" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.person.userid + "</td>" + "</tr>" +


        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Date and Time " + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.date + "</td>" + "</tr>" + "</table></br> </br>" +

        "<h4> Hospital Information </h4>" +
        "<table style='font-family: arial, sans-serif;border-collapse: collapse; width: 100%;'>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Doctor Name" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.doctor.name + "</td>" + "</tr>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Hospital Name" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.doctor.hospitalname + "</td>" + "</tr>" +


        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Mobile No." + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.doctor.phNo + "</td>" + "</tr>" +

        " <tr style=' background-color: #dddddd'>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + "Address of Hospital" + "</td>" +
        "<td  style='border: 1px solid red;text-align: left;padding: 8px;'>" + req.body.doctor.address + "</td>" + "</tr>" + "</table>"


      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send(invokeResponse);
      }
    });
    


  }


});








module.exports = emergency;



