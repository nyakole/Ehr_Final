import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import './Style.css';


function Uploadreportpatside() {
    const history = useHistory();
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const onchange = e => {
        setFile(e.target.files[0]);
    }

    function handleSubmit(event) {
        const pat = JSON.parse(sessionStorage.getItem('patientdata'))
        console.log(pat)
        console.log(pat.patientId)
        event.preventDefault();
        const formData = new FormData();
        formData.append('blogimage', file);
        formData.append('description', description);
        formData.append('patientId', pat.patientId)
        formData.append('doctorId', '')
        formData.append('doctorname', 'self')
        formData.append('date', moment().format("DD/MM/YYYY hh:mm a"))
        axios.post('http://localhost:8080/postReport', formData)
            .then((response) => {
                let userresponse = response;
                console.log(userresponse);
                if (userresponse.data.Success) {
                    history.push('/patientview')
                }
            })
            .catch((error) => alert(error))
    }
    function Logoutpatient(params) {
        sessionStorage.clear();
        history.push('/');
    }



    return (
        <div className="back">
            <Button variant="danger" style={{ float: "right", margin: '10px', marginRight: "80px" }} onClick={Logoutpatient}>Logout</Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="col-sm">

                <center><h2>Upload Medical Reports</h2></center>
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
                                <Form.Group>
                                    <br></br>

                                    <Form.File id="exampleFormControlFile1" contrilId="fileupload" accept="image/*,application/pdf"
                                        autoFocus
                                        required
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

export default Uploadreportpatside
