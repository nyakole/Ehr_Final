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
    console.log(patotp)
    axios.post('http://localhost:8080/otpverification/verify', patotp)
      .then((response) => {
        let userresponse = response;
        console.log(userresponse);
        console.log(userresponse.data);
        if (userresponse.data === true) {
          console.log("ok")
          console.log("done")
          history.push('/resgisterpatient')
        }
        else {
          setShow(true)
        }
      })
      .catch((error) => alert(error))
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
      .catch((error) => alert(error))


  }


  return (
    <div className="Login">

      <Form onSubmit={handleSubmit}>
        {show ? (<Alert show={show} variant="danger" >
          <Alert.Heading>Otp is invalid</Alert.Heading></Alert>) : null}
        {show1 ? (<Alert show={show1} variant="success" >
          <Alert.Heading>Otp resended Successfully</Alert.Heading></Alert>) : null}

        <Form.Group size="lg" controlId="email">
          <Form.Label>Enter otp</Form.Label>
          <Form.Control
            autoFocus
            required
            type="Number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" >
          verify Otp
        </Button>

      </Form>


      <div style={{ fontSize: '20px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

    </div>
  );
}