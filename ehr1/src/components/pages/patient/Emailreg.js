import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { validationSchema } from '../../../validation/validationSchemaemail';

export default function Emailve() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  
  const [values, setValues] = useState({
    email: '',
  })

  const handleChange = e => {
    const { name, value } = e.currentTarget
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    const err = await validate(values);
    console.log(err)
    setErrors(err);
    console.log(Object.keys(err).length)
    if (Object.keys(err).length === 0) {
      axios.post('http://localhost:8080/checkforexit', values)
        .then((response) => {
          let userresponse = response;
          console.log(userresponse);
          console.log(userresponse.data);
          if (userresponse.data.error) {
            console.log("error")
            setShow(true)
          }
          else if (userresponse.data.Success) {
            console.log("Success")
            axios.post('http://localhost:8080/otpverification/send', values)
              .then((response) => {
                let userresponse = response;
                console.log(userresponse);
                console.log(userresponse.data);
                if (userresponse) {
                  sessionStorage.setItem('hash', userresponse.data);
                  sessionStorage.setItem('email', values.email);
                  history.push('/Verifyotp1')
                }
              })
              .catch((error) => { setShow3(true)})
            
          }
        })
        .catch((error) => {
           setShow3(true)
          })
    }
  }

  const validate = async (values) => {
    try {

      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      let errObj = {};
      for (let { path, message } of err.inner) {
        errObj[path] = message;
      }
      return errObj;
    }
  };



  return (
    <div className="col-sm back">
      {show ? (<Alert show={show} variant="danger" >
        <Alert.Heading>Patient is already exits in database</Alert.Heading></Alert>) : null}
        {show3 ? (<Alert show={show3} variant="danger" >
        <Alert.Heading>Network Error</Alert.Heading></Alert>) : null}
      <div className="center">

        <Form onSubmit={handleSubmit}>
          <br>
          </br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2>Registration Through email</h2>
          <br></br>

          <br></br>
          <div className="form" >
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <br></br>
            <Button block size="lg" type="submit" >
              Send OTP
        </Button>
          </div>
        </Form>

      </div>
    </div>
  );
}