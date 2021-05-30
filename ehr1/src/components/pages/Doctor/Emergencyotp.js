import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';

export default function Logindoctor() {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  let expiryTimestamp = time

  const {
    seconds,
    minutes,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => { resend(); } });

  function handleSubmit(event) {
    event.preventDefault();
    const hash = sessionStorage.getItem('hash')
    const email = sessionStorage.getItem('email')
    const patotp = {
      email: email,
      otp: otp,
      hash: hash
    };
    const req = JSON.parse(sessionStorage.getItem('emmergency'))
    console.log(req)
    axios.post('http://localhost:8080/otpverification/verify', patotp)
      .then((response) => {
        let userresponse = response;
        console.log(userresponse);
        console.log(userresponse.data);
        if (userresponse.data === true) {
          console.log("done")
          axios.post('http://localhost:8080/emergency/verify', req)
            .then((response) => {
              let userresponse = response;
              console.log(userresponse);
              console.log(userresponse.data);
              if (userresponse.status === 200) {
                sessionStorage.setItem('patientdata', JSON.stringify(userresponse.data[0].Record));
                sessionStorage.removeItem('hash');
                sessionStorage.removeItem('email');
                history.push('/doctorview')
              }
            })
            .catch((error) => {
              setShow3(true)
            })
        }
        else {
          setShow(true)
        }
      })
      .catch((error) => {
        setShow3(true)
      })
  }

  const resend = () => {
    console.log('onExpire called')
    const email = sessionStorage.getItem('email')
    const patotp = {
      email: email
    }
    console.log(email)
    console.log("Success")
    axios.post('http://localhost:8080/otpverification/send', patotp)
      .then((response) => {
        let userresponse = response;
        console.log(userresponse);
        console.log(userresponse.data);
        if (userresponse) {
          sessionStorage.removeItem('hash');
          sessionStorage.setItem('hash', userresponse.data);
          sessionStorage.setItem('email', email);
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time)
          setShow1(true);

        }
      })
      .catch((error) => {
        setShow3(true)
      })
  }


  return (
    <div className="col-sm back">
      {show ? (<Alert show={show} variant="danger" >
        <Alert.Heading>OTP is invalid</Alert.Heading></Alert>) : null}
      {show1 ? (<Alert show={show1} variant="success" >
        <Alert.Heading>OTP resended Successfully</Alert.Heading></Alert>) : null}
        {show3 ? (<Alert show={show3} variant="danger" >
        <Alert.Heading>Network Error</Alert.Heading></Alert>) : null}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center><h2>Verify OTP</h2></center>
      <br></br>

      <div className="center">
        <Form onSubmit={handleSubmit}>


          <br></br><div className="form6" >

            <Form.Group size="lg" controlId="email">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                autoFocus
                required
                type="Number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div style={{ fontSize: '25px', margin: "10px" }}>
              <center>  <span>{minutes}</span>:<span>{seconds}</span></center>
            </div>

            <center>
              <Button block size="lg" type="submit" >
                Verify OTP
        </Button>
            </center>
          </div>
        </Form>



      </div>
    </div>
  );
}