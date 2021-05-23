const {Router} = require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');
const otpGen  = require("otp-generator");
const otpTool = require("otp-without-db"); 
//const key     = "secretKey"; // Use unique key and keep it secret

//let phone = "88017009090";  


const otpverification=Router();

// view engine setup
//app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
//app.set('view engine','handlebars');

// body parser middleware
otpverification.use(bodyparser.urlencoded({extended : false}));
otpverification.use(bodyparser.json());



otpverification.post('/send',function(req,res){
    console.log('req.body: ');
    console.log(req.body);
    let Email1=req.body.email;

     // send mail with defined transport object
     let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
           user: 'ehrsystem@yahoo.com',
           pass: 'smkttwgjuawjisdz'
        },
        debug: false,
        logger: true 
    });
     
    let otp   = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });  

    let hash = otpTool.createNewOTP(Email1,otp,key="",expiresAfter=5,algorithm="sha256");
    console.log(otp);
    console.log(hash)

    var mailOptions = {
        from: 'ehrsystem@yahoo.com',
        to: Email1,
        subject: 'Otp Verification for Ehr',
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(hash)
        }
      });
      
      
    
});

otpverification.post('/verify',function(req,res){
    console.log(req.body)
    phone=req.body.email;
    console.log(phone)
    otp=req.body.otp;
    hash=req.body.hash;

    veri=otpTool.verifyOTP(phone,otp,hash,key="",algorithm="sha256")
    res.send(veri)
    console.log(veri)
    if(veri=="true"){
        res.send("You has been successfully registered");
    }
    else{
        res.send('otp',{msg : 'otp is incorrect'});
    }
});  

otpverification.post('/resend',function(req,res){
    console.log('req.body: ');
    console.log(req.body);
    let Email1=req.body.email;
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
           user: 'adeshadikane@yahoo.com',
           pass: 'pjfffxpxejhdrhnz'
        },
        debug: false,
        logger: true 
    });
    let otp   = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });  

    let hash = otpTool.createNewOTP(Email1,otp,key="",expiresAfter=5,algorithm="sha256");
    console.log(otp);
    console.log(hash)

    var mailOptions = {
        from: 'adeshadikane@yahoo.com',
        to: Email1,
        subject: 'Sending Email using Node.js',
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(hash)

});
module.exports=otpverification;