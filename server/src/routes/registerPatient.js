'use strict';


const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
var crypto = require('crypto')
let network = require('../fabric/network.js');


let registerPatient = Router();


registerPatient.use(morgan('combined'));
registerPatient.use(bodyParser.json());
registerPatient.use(cors());


const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;




registerPatient.post('', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let adharNo = req.body.adharNo;
  let patientId = Date.now().toString();
  req.body.patientId = patientId;
  console.log('req.body: ');
  let email12 = req.body.email + "patient";
  var sha256 = crypto.createHash('sha256').update(email12).digest('hex');

  //check weather he is registered already or not
  let networkObj = await network.connectToNetwork(appAdmin_pat);
  let check = await network.invoke(networkObj, true, 'checkExist', req.body.adharNo);
  console.log('req.body: ');
  let parsedCheck = await JSON.parse(check);
  console.log(parsedCheck);
  console.log('req.body: ');
  //if (!(Object.keys(parsedCheck).length === 0 && obj.constructor === Object)){
  //res.send({"error":"The patient is already registered"});
  //}
  console.log("Hi");
  //first create the identity for the patient and add to wallet
  let response = await network.registerPatient(patientId, req.body.email, adharNo, req.body.name,  sha256);
  console.log('response from registerPatient: ');
  console.log(response);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('req.body.adharNo');
    console.log(req.body.adharNo);
    networkObj = await network.connectToNetwork(sha256);
    console.log('networkobj: ');
    console.log(networkObj);

    if (networkObj.error) {
      res.send(networkObj.error);
    }
    console.log('network obj');
    console.log(util.inspect(networkObj));


    req.body = JSON.stringify(req.body);
    let args = [req.body];
    //connect to network and update the state  

    let invokeResponse = await network.invoke(networkObj, false, 'createPatient', args);

    if (invokeResponse.error) {
      res.send(invokeResponse.error);
    } else {

      console.log('after network.invoke ');
      let parsedResponse = JSON.parse(invokeResponse);
      parsedResponse.Success += `. Use patientId ${patientId} and password secret99 to login above.`;
      const dir = `./tmp/${patientId}`;

      fs.mkdir(dir, { recursive: true }, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("New directory successfully created.")
        }
      })

      res.send(parsedResponse);

    }

  }

});
module.exports = registerPatient;
