import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";


function Uploadreportdrside() {
    const history = useHistory();
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const onchange = e => {
        setFile(e.target.files[0]);
    }

    function handleSubmit(event) {
        const pat = JSON.parse(sessionStorage.getItem('patientdata'))
        const doctor = JSON.parse(sessionStorage.getItem('doctordata'))
        console.log(pat)
        console.log(pat.patientId)
        event.preventDefault();
        const formData = new FormData();
        formData.append('blogimage', file);
        formData.append('description', description);
        formData.append('patientId', pat.patientId)
        formData.append('doctorId', doctor.doctorId)
        formData.append('doctorname', `Dr.${doctor.name}`)
        formData.append('date', moment().format("DD/MM/YYYY hh:mm a"))
        axios.post('http://localhost:8080/postReport', formData)
            .then((response) => {
                let userresponse = response;
                console.log(userresponse);
                if (userresponse.data.Success) {

                    history.push('/doctorview')
                }

            })
            .catch((error) => alert(error))
    }

    function Logoutpatient(params) {
        sessionStorage.removeItem('patientdata');
        history.push('/normaloremg');
    }

    function LogoutDoctor(params) {
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <div className="back">
            <div className="col-sm">
            <br></br>
                <Button variant="danger" style={{ float: "right", margin: '10px', marginRight: "30px" }} onClick={LogoutDoctor}>Logout Doctor</Button>
                <Button variant="danger" style={{ float: "right", margin: '10px' }} onClick={Logoutpatient}>Logout Patient </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 className="center" >Upload Medical Reports</h1>

                <br></br>
                <br></br>
                <div className="center" >
                    <div className="form4" >
                        <Form onSubmit={handleSubmit} >
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Upload the medical report</Form.Label>
                                    <Form.Control type="text" placeholder="Enter description"
                                        autoFocus
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <br></br>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1"
                                        autoFocus
                                        required
                                        accept="image/*,application/pdf"
                                        onChange={onchange}
                                    />
                                </Form.Group>
                                <br></br>
                                <Button variant="primary" type="submit">
                                    Submit
                </Button>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uploadreportdrside
