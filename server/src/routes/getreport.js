'use strict';


const {Router} = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
var fileupload = require('express-fileupload');
let network = require('../fabric/network.js');

let getreport = Router();

getreport.use(morgan('combined'));
getreport.use(bodyParser.json());
getreport.use(cors());
getreport.use(fileupload());




const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;


  getreport.post('/getpatientReport', async (req, res) => {
    let networkObj = await network.connectToNetwork(appAdmin_doc);
    //console.log('networkobj: ');
    //console.log(util.inspect(networkObj));
    req.body = JSON.stringify(req.body);
      let args = [req.body];
  
    let response = await network.invoke(networkObj, true, 'getpatientReport', args);
    let parsedResponse = await JSON.parse(response);
    res.send(parsedResponse);
  
  
  });  






  module.exports=getreport;