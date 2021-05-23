import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";


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
        <div>
            <Button variant="danger" onClick={Logoutpatient}>Logout</Button>

            <Form onSubmit={handleSubmit} >
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                            autoFocus
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Example file input" accept="image/*,application/pdf"
                            autoFocus
                            required
                            onChange={onchange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form.Row>
            </Form>

        </div>
    )
}

export default Uploadreportpatside
