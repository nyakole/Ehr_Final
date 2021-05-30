import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { validationSchema } from '../../../validation/validationSchemapatientres';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Registerpatient() {
    const history = useHistory();
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const eye1 = <FontAwesomeIcon icon={faEye} />;
    const eye_slash1 = <FontAwesomeIcon icon={faEyeSlash} />;
    const [email1, setEmail1] = useState();
    const [values, setValues] = useState({
        name: '',
        userid: '',
        email: '',
        phNo: '',
        password: '',
        confirmPassword: '',
        address: '',
        dob: '',
        adharNo: '',
        age: '',
        gender: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown1, setPasswordShown1] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const togglePasswordVisiblity1 = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const handleChange = e => {
        const { name, value } = e.currentTarget
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    useEffect(() => {
        async function fetchData() {
            const patientdata = sessionStorage.getItem('email')
            console.log(patientdata)
            setEmail1(patientdata)
            setValues(prevState => ({
                ...prevState,
                email: patientdata
            }))


        }
        fetchData();

    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values)
        const err = await validate(values);
        console.log(err)
        setErrors(err);
        console.log(Object.keys(err).length)
        if (Object.keys(err).length === 0) {
            console.log("done")
            sessionStorage.clear()
            axios.post('http://localhost:8080/registerPatient', values)
                .then((response) => {
                    let userresponse = response;
                    console.log(userresponse);
                    if (userresponse.data.Success) {
                        sessionStorage.removeItem('email');

                        history.push('/patient')
                    }

                })
                .catch((error) => alert(error))
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
        <div className="col-sm back1">
            <br></br>
            <center><h2>Registration Form For Patient</h2></center>
            <br></br>
            <br></br>
            <div className="center">
            <div className="form5" >
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
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
                        <Form.Label>UserId</Form.Label>
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
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control type="text" placeholder={email1}
                            readOnly
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridmobile">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="tel" placeholder="Mobile Number"
                            autoFocus
                            name="phNo"
                            value={values.phNo}
                            onChange={handleChange}
                            isInvalid={!!errors.phNo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.phNo}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={passwordShown ? 'text' : 'password'}
                            placeholder="Password"
                            autoFocus
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <i className="eye" onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
                        <Form.Control.Feedback type='invalid'>{errors?.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridrePassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type={passwordShown1 ? 'text' : 'password'}
                            placeholder="Password"
                            autoFocus
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <i className="eye" onClick={togglePasswordVisiblity1}>{passwordShown1 ? eye1 : eye_slash1}</i>
                        <Form.Control.Feedback type='invalid'>{errors?.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St"
                        autoFocus
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type='invalid'>{errors?.address}</Form.Control.Feedback>
                </Form.Group>




                <Form.Row>
                    <Form.Group as={Col} controlId="formGriddob">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date"
                            autoFocus
                            name="dob"
                            value={values.dob}
                            onChange={handleChange}
                            isInvalid={!!errors.dob}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.dob}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="tel" placeholder="Enter Age"
                            autoFocus
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                            isInvalid={!!errors.age}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.age}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridadharNo">
                        <Form.Label>Adhar Card No.</Form.Label>
                        <Form.Control type="tel" placeholder="Enter adharNo"
                            autoFocus
                            name="adharNo"
                            value={values.adharNo}
                            onChange={handleChange}
                            isInvalid={!!errors.adharNo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.adharNo}</Form.Control.Feedback>
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

export default Registerpatient
