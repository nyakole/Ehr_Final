const {Router} = require('express');

const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
let network = require('../fabric/network.js');


let downloadfile = Router();

downloadfile.post('', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    path1=req.body.url;
    fileName='1614846184646hi.png'
    //const fileName = req.params.name;
  //const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(path1, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
  //res.send(req.body)
  
});





  module.exports=downloadfile;