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


let checkforexit = Router();


checkforexit.use(morgan('combined'));
checkforexit.use(bodyParser.json());
checkforexit.use(cors());


const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;




checkforexit.post('', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let email12 = req.body.email + "patient";
  var sha256 = crypto.createHash('sha256').update(email12).digest('hex');

  //check weather he is registered already or not
  
 
  let response = await network.verifypatient( req.body.email,sha256);
  console.log('response from registerPatient: ');
  console.log(response);
 
    res.send(response);
  

});
module.exports = checkforexit;
