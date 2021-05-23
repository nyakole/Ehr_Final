import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { validationSchema } from '../../../validation/validationSchemalogin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";




export default function Logindoctor() {
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
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
      axios.post('http://localhost:8080/loginpatient', values)
        .then((response) => {
          let userresponse = response;
          console.log(userresponse);
          console.log(userresponse.data);
          console.log(userresponse.data[0].Record);
          sessionStorage.clear()
          if (userresponse) {
            sessionStorage.setItem('patientdata', JSON.stringify(userresponse.data[0].Record));
            history.push('/patientview')
          }
        })
        .catch((error) => {
          setShow(true)
          console.log(error)
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
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        {show ? (<Alert show={show} variant="danger" >
          <Alert.Heading>Check Email And Password </Alert.Heading></Alert>) : null}
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordShown ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type='invalid'>{errors?.password}</Form.Control.Feedback>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
        </Form.Group>
        <Button block size="lg" type="submit" >
          Login
        </Button>
        <p className="forgot-password text-right">
          <a href='/emailreg'>Resgister patient</a>
        </p>
      </Form>
    </div>
  );
}