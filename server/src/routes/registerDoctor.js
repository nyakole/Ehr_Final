


'use strict';


const {Router} = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
let network = require('../fabric/network.js');
var crypto = require('crypto')
let registerDoctor = Router();


registerDoctor.use(morgan('combined'));
registerDoctor.use(bodyParser.json());
registerDoctor.use(cors());


const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;



registerDoctor.post('', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    //let licenseId = req.body.licenseId;
    let doctorId = Date.now().toString();
    req.body.doctorId = doctorId;
    let email12 = req.body.email + "Doctor";
    var sha256= crypto.createHash('sha256').update(email12).digest('hex');
    console.log(sha256)
    
  
    //first create the identity for the patient and add to wallet
    let response = await network.registerDoctor(doctorId,req.body.email, req.body.name,sha256);
    console.log('response from registerDoctor: ');
    console.log(response);
    if (response.error) {
      res.send(response.error);
    } else {
      console.log('req.body.licenseId');
      console.log(req.body.licenseId);
      let networkObj = await network.connectToNetwork(sha256);
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
  
      let invokeResponse = await network.invoke(networkObj, false, 'createDoctor', args);
      
      if (invokeResponse.error) {
        res.send(invokeResponse.error);
      } else {
  
        console.log('after network.invoke ');
        let parsedResponse = JSON.parse(invokeResponse);
        parsedResponse.Success += `. Use doctorId ${doctorId} and password doctor99 to login above.`;
        res.send(parsedResponse);
  
      }
  
    }
  
  
  });
  

module.exports=registerDoctor;