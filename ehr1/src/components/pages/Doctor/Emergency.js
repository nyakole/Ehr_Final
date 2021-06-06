import React, { useState } from 'react'
import { Form, Button, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { validationSchema ,validationSchema1} from '../../../validation/validationSchemsforemgencyperson';
import moment from "moment";
import './Style.css';

function Resgisterdoctor() {
    const history = useHistory();
    const [values, setValues] = useState({
        name: '',
        userid: '',
        email: '',
        phNo: '',
    });
    const [values1, setValues1] = useState({
        adharNo: '',
        phNo: '',

    });
    const [errors, setErrors] = useState({});
    const [errors1, setErrors1] = useState({});
    const [show3, setShow3] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChange1 = e => {
        const { name, value } = e.currentTarget
        setValues1(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        //console.log(values)
        const err = await validate(values);
        const err1 = await validate1(values1);
        console.log(err1)
        console.log(err)
        setErrors1(err1)
        setErrors(err);
        const doctor1 = JSON.parse(sessionStorage.getItem('doctordata'))
        const res = {
            patient: values1,
            person: values,
            doctor:doctor1,
            date:moment().format("DD/MM/YYYY hh:mm a")
        }
        console.log(res)
        //console.log(Object.keys(err).length)
        if (Object.keys(err).length === 0) {
            console.log("done")
            //sessionStorage.clear()
            axios.post('http://localhost:8080/emergency/send', res)
                .then((response) => {
                    console.log(response)
                    let userresponse = response;
                    console.log(userresponse.data);

                    if (userresponse.data === true) {
                        console.log("Done for")
                        axios.post('http://localhost:8080/otpverification/send', values)
                        .then((response) => {
                          let userresponse = response;
                          console.log(userresponse);
                          console.log(userresponse.data);
                          if (userresponse) {
                            sessionStorage.setItem('emmergency',JSON.stringify(res))
                            sessionStorage.setItem('hash', userresponse.data);
                            sessionStorage.setItem('email', values.email);
                            history.push('/emergencyotp')
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
    const validate1 = async (values) => {
        try {
            await validationSchema1.validate(values, { abortEarly: false });
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
          <Alert.Heading>Check Mobile No. and Adhar No. of Patient</Alert.Heading></Alert>) : null}
             {show3 ? (<Alert show={show3} variant="danger" >
        <Alert.Heading>Network Error</Alert.Heading></Alert>) : null}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <center><h2>Consent Form for Emergency care</h2></center>
            <br></br>
            <br></br>
            <div className="center">
            <div className="form6" >
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Enter Your Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Full Name"
                            autoFocus
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGriduserid">
                        <Form.Label>Relation With patient</Form.Label>
                        <Form.Control type="text" placeholder="Enter Userid"
                            autoFocus
                            name="userid"
                            value={values.userid}
                            onChange={handleChange}
                            isInvalid={!!errors.userid}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.userid}</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Enter Your Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            autoFocus
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridmobile">
                        <Form.Label>Enter Your Mobile Number</Form.Label>
                        <Form.Control type="tel" placeholder="Mobile Number"
                            autoFocus
                            name="phNo"
                            value={values.phNo}
                            onChange={handleChange}
                            isInvalid={!!errors.phNo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.phNo}</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridmobile">
                        <Form.Label>Enter Patient Mobile Number</Form.Label>
                        <Form.Control type="tel" placeholder="Mobile Number"
                            autoFocus
                            name="phNo"
                            value={values1.phNo}
                            onChange={handleChange1}
                            isInvalid={!!errors.phNo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors1?.phNo}</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridadharNo">
                        <Form.Label>Enter Patient AdharNo</Form.Label>
                        <Form.Control type="tel" placeholder="Enter adharNo"
                            autoFocus
                            name="adharNo"
                            value={values1.adharNo}
                            onChange={handleChange1}
                            isInvalid={!!errors.adharNo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors1?.adharNo}</Form.Control.Feedback>
                    </Form.Group>


                </Form.Row>









                <Form.Group>
                    <Form.Check
                        required
                        label="By ticking, you're agreeing to our terms of service "
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <br></br>
                
                <Button variant="primary" type="submit">
                    Submit
  </Button>
            </Form>
            </div>
            </div>
        </div>
    )
}

export default Resgisterdoctor
