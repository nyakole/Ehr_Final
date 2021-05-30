import React from "react";
import './style.css';
import './Container.css';
import block from './Blockchain.jpg';
import hf from './hf.png';


const Home = () =>{

   
    const mystyle = {
      color: "Black",
      backgroundColor: " ",
      padding: "10px",
      fontFamily: "serif",
      fontSize:"80px"
    };


  return (
     <div>
        <div className="bg">
        <div className="header">
          <h1 style={mystyle}>Electronic Health Records Access System Using Hyperledger Fabric</h1>
          <p></p>
        </div>
        <br></br>
      </div>
      
      
      <div className="container">
  <div className="row">
  
    <div className="column-66">
    
      <h1 className="xlarge-font"><b>Blockchain Technology</b></h1>
      <h1 className="large-font" style={{color:"MediumSeaGreen"}}><b>What is Blockchain?</b></h1>
      <p><span style={{fontSize:"36px"}}>The new technology of Trust. </span> A blockchain , originally block chain, is a growing list of records, called blocks, which are linked using cryptography.</p>
      <a href="https://www.ibm.com/in-en/topics/what-is-blockchain" target="_parent"><button>Read More</button></a>
      
    </div>
    <div className="column-33">
    <img src={block} width="350" height="400" alt="Write something here"></img>
    </div>
    
  </div>
</div>

<div className="container" style={{backgroundColor:"#f1f1f1"}}>
  <div className="row">
    <div className="column-33">
      <img src={hf} alt="App" width="335" height="471" >
         </img>
    </div>
    <div className="column-66">
      <h1 className="xlarge-font"><b>HyperLedger Fabric</b></h1>
      <h1 className="large-font" style={{color:"red"}}><b>How does it work?</b></h1>
      <p><span style={{fontSize:"24px"}}>A revolution in resolution.</span> Hyperledger Fabric is an open, proven, enterprise-grade, distributed ledger platform. It has advanced privacy controls so only the data you want shared gets shared among the “permissioned” (known) network participants.</p>
      <a href="https://hyperledger-fabric.readthedocs.io/en/release-2.2/" target="_parent"><button className="button">Read More</button></a>
    </div>
  </div>
</div>

<br></br>
      <center ><h1 style={{color:"Red",fontFamily: "serif",fontSize:"80px"}}>How to Use?</h1></center>
      <br></br>

<div className="container" style={{backgroundColor:"#f1f1f1"}}>
  <div className="row">
    <div className="column-50">
    <h1 className="xlarge-font" style={{color:"MediumSeaGreen"}}><b>Doctor</b></h1>
      <h3 ><b>How does it work?</b></h3>
      <p><span style={{fontSize:"24px"}}>1. You have to Sign Up as a doctor if you are new user on the system.</span></p>
      <p><span style={{fontSize:"24px"}}>2. You have to login with correct username and password.</span></p>
      <p><span style={{fontSize:"24px"}}>3. You can get access to patient's medical records after OTP verification.</span></p>
      <p><span style={{fontSize:"24px"}}>4. You can see and upload new medical records in respective patient account</span></p>
      <p><span style={{fontSize:"24px"}}>Use below button to login as doctor.</span></p>
      <a href="/doctor" target="_parent"><button className="button">Doctor</button></a>
    </div>
    <div className="column-50">
      <h1 className="xlarge-font" style={{color:"MediumSeaGreen"}}><b>Patient</b></h1>
      <h3 ><b>How does it work?</b></h3>
      <p><span style={{fontSize:"24px"}}>1. You have to Sign up as a patinet if you are new user on the system.</span></p>
      <p><span style={{fontSize:"24px"}}>2. You have to login with correct username and password.</span></p>
      <p><span style={{fontSize:"24px"}}>3. You can give access to the doctor after OTP sharing . </span></p>
      <p><span style={{fontSize:"24px"}}>4. You can download and upload the new medical records on your account.</span></p>
      <p><span style={{fontSize:"24px"}}>Use below button to login as patient.</span></p>
      <a href="/patient" target="_parent"><button className="button">Patient</button></a>
    </div>
  </div>
</div>
<br></br>    
      <br></br>
<div className="about-section">
  <h1>About Us </h1>
</div>
<br></br> 
<h2 style={{textAlign:"center"}}>Our Project Team</h2>
<div className="row">
  <div className="columns">
    <div className="card">
      <div className="containers">
        <h2>Adesh Adikane</h2>
        <p className="title">BE Student at SCOE, PUNE</p>
        <p>PRN : 71812683B</p>
        <p>adeshadikane@gmail.com</p>
      </div>
    </div>
  </div>

  <div className="columns">
    <div className="card">
      <div className="containers">
        <h2>Nikhil Akole</h2>
        <p className="title">BE Student at SCOE, PUNE</p>
        <p>PRN : 71812717L</p>
        <p>akolenikhil@gmail.com</p>
      </div>
    </div>
  </div>
  
  <div className="columns">
    <div className="card">
      <div className="containers">
        <h2>Ashutosh Auti</h2>
        <p className="title">BE Student at SCOE, PUNE</p>
        <p>PRN : 71812777D</p>
        <p>autiashutosh0@gmail.com</p>
      </div>
    </div>
  </div>

  <div className="columns">
    <div className="card">
      <div className="containers">
        <h2>Shubham Bhosale</h2>
        <p className="title">BE Student at SCOE, PUNE</p>
        <p>PRN : 71812869K</p>
        <p>bhosaleshubham27@gmail.com</p>
      </div>
    </div>
  </div>
  </div>

  <h2 style={{textAlign:"center"}}>Our Project Guide</h2>
<div className="row">
  <div className="column1">
    <div className="card">
      <div className="containers">
        <h2>Prof Nalini Mhetre</h2>
        <p className="title">Assistant Professor at SCOE, PUNE</p>
        <p>namhetre@sinhgad.edu</p>
      </div>
    </div>
  </div>

  <div className="column1">
    <div className="card">
      <div className="containers">
        <h2>Prof Girija Chiddarwar</h2>
        <p className="title">Assistant Professor at SCOE, PUNE</p>
        <p>ggchiddarwar.scoe@sinhgad.edu</p>
      </div>
    </div>
  </div>
  </div>
      <br></br>    
      <br></br>  
      <br></br>  
        <center style={{fontFamily: "serif"}}>Copyright © 2021 All rights are reserved</center>
        </div>
        
     
      
      
  
  );
}
export default Home;