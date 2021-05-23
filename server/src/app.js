'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
var fileupload = require('express-fileupload');
let registerPatient=require('./routes/registerPatient.js');
let registerDoctor=require('./routes/registerDoctor.js');
let loginpatient=require('./routes/loginpatient.js');
let logindoctor=require('./routes/logindoctor.js');
let getreport=require('./routes/getreport.js');
let otpverification=require('./routes/otpverification.js');
let getpatientdata = require('./routes/getpatientdata')
let downloadfile = require('./routes/downloadfile')
let checkforexit = require('./routes/checkforexit')
let emergency=require("./routes/emergency")
let network = require('./fabric/network.js');

const app = express();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());



const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;



app.use('/registerPatient',registerPatient);
app.use('/registerDoctor',registerDoctor);
app.use('/loginpatient',loginpatient);
app.use('/logindoctor',logindoctor);
app.use('/getreport',getreport);
app.use('/otpverification',otpverification);
app.use('/getpatientdata',getpatientdata);
app.use('/downloadfile',downloadfile);
app.use('/checkforexit',checkforexit);
app.use('/emergency',emergency);

//use this identity to query
//const appAdmin = config.appAdmin;
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081/RegisterPatient"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

*/

app.get('/api/printSomething', async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin_pat);
    let response = await network.invoke(networkObj, true, 'printSomething', '{"Name":"Saxena","Emote":"Take the L"}');
    let parsedResponse = await JSON.parse(response);
    res.send(response);

});
app.post('/postReport', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let reportId = Date.now().toString();
  
  req.body.reportId = reportId;
  let file = req.files.blogimage;
  
  const dir=`./tmp/${req.body.patientId}`;

  fs.mkdir(dir, { recursive: true }, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("New directory successfully created.")
  }
})
  console.log(dir)
    
  let path1=`${dir}/` + (reportId +file.name)
  //let path2= `/tmp/${req.body.patientId}/`+(reportId +file.name)
  let viewurl="http://localhost:8080/view?filepath="+path1;
  let downloadurl="http://localhost:8080/download?filepath="+path1;
  
  file.mv(path1, function(err, result) {
   if(err) 
    throw err;
   console.log({
    success: true,
    message: "File uploaded!"
   });
  })
  console.log(file)
  console.log(path1)
  let url = viewurl;
  console.log(reportId)
  console.log(url)
  req.body.viewurl = viewurl;
  req.body.downloadurl = downloadurl;
  
  let response = await network.registerReport(reportId, req.body.patientId,req.body.doctorId,req.body.doctorname,req.body.date,req.body.description, url);
  console.log('response from registerDoctor: ');
  console.log(response);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('req.body.licenseId');
    console.log(req.body.url);
    let networkObj = await network.connectToNetwork(reportId);
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

    let invokeResponse = await network.invoke(networkObj, false, 'createReport', args);
    
    if (invokeResponse.error) {
      res.send(invokeResponse.error);
    } else {

      console.log('after network.invoke ');
      let parsedResponse = JSON.parse(invokeResponse);
      parsedResponse.Success += `. Use doctorId ${reportId} and password doctor99 to login above.`;
      res.send(parsedResponse);

    }

  }

app.get('/abc', async (req, res) => {
    
    path1='./tmp/1614846100112/1614846184646hi.png';
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


});
app.post('/tp', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin_doc);
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
    let args = [req.body];

  let response = await network.invoke(networkObj, true, 'tp', args);
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});  
app.get('/view', async (req, res) => {
  const abc =req.query;
  console.log(abc);
  const filepath=req.query.filepath;
  console.log(filepath);
  let ext = path.parse(filepath).ext;
  fs.readFile(filepath,(err,data)=>{
    if(err){
      res.statusCode=500;
      res.end(err);
    }else{
      res.setHeader("ContentType",`application/${ext}`);
      res.end(data);
    }
  })
  
  
});

app.get('/download', async (req, res) => {
  const filepath=req.query.filepath;
  console.log(filepath);
  
  
  res.download(filepath, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
  //res.send(req.body)
});

app.get('/getPatients', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin_doc);
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getPatients', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});

app.get('/getDoctors', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin_doc);
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getDoctors', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});


app.get('/getReports', async (req, res) => {
  let networkObj = await network.connectToNetwork('admin');
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getReports', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});










app.listen(process.env.PORT || 8080);