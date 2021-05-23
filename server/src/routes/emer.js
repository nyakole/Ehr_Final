'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
let network = require('../fabric/network.js');
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;

exports.emergency1=async function (req) {
    console.log('req.body: ');
    console.log(req);
    let networkObj = await network.connectToNetwork(appAdmin_pat);
    //console.log('networkobj: ');
    //console.log(util.inspect(networkObj));
  
    if (networkObj.error) {
        return(networkObj);
    }
    req = JSON.stringify(req);
    let args = [req];
    console.log(args)
    let invokeResponse = await network.invoke(networkObj, true, 'getemergency', args);
    //console.log(invokeResponse)
    if (invokeResponse.error) {
        return(invokeResponse);
    } else {
      console.log('after network.invoke ');
      console.log("Hi")
      console.log(JSON.parse(invokeResponse))

      let parsedResponse = await JSON.parse(invokeResponse);
      // let response = `Patient with adharNo ${parsedResponse.adharNo} is logged in!.`  
      return parsedResponse;
    }
}