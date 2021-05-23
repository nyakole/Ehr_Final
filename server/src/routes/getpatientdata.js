'use strict';


const {Router} = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
let network = require('../fabric/network.js');

let getpatientdata = Router();


getpatientdata.use(morgan('combined'));
getpatientdata.use(bodyParser.json());
getpatientdata.use(cors());



const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;


getpatientdata.post('', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    let networkObj = await network.connectToNetwork(appAdmin_pat);
    console.log('networkobj: ');
    console.log(util.inspect(networkObj));
  
    if (networkObj.error) {
      res.send(networkObj);
    }
    req.body = JSON.stringify(req.body);
    let args = [req.body];
    let invokeResponse = await network.invoke(networkObj, true, 'getpatientDatatodoctor', args);
    if (invokeResponse.error) {
      res.send(invokeResponse);
    } else {
      console.log('after network.invoke ');
      let parsedResponse = await JSON.parse(invokeResponse);
      // let response = `Patient with adharNo ${parsedResponse.adharNo} is logged in!.`  
      res.send(parsedResponse);
    }
  
  });





  module.exports=getpatientdata;