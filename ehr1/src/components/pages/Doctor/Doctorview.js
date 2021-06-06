import React, { useState, useEffect } from "react";

import { Button, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

export default function Dashbord() {
  const history = useHistory();
  const [data, setData] = useState([]);
  let patientdata1 = JSON.parse(sessionStorage.getItem('patientdata'))


 useEffect(() => {
    async function fetchData() {
      let patientdata = JSON.parse(sessionStorage.getItem('patientdata'))
      const Result = await axios.post('http://localhost:8080/getreport/getpatientReport', patientdata)
      setData(Result.data)
    }
    fetchData();
  }, []); 
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
      <br></br>
      <Button variant="danger" style={{ float: "right", margin: '10px', marginRight: "30px" }}onClick={LogoutDoctor}>Logout Doctor</Button>
     
      
      <Button variant="danger" style={{ float: "right", margin: '10px' }} onClick={Logoutpatient} >Logout patient</Button>
      &nbsp;&nbsp;
      <h3 className="H3" >Patient Name : {patientdata1.name}</h3>
      <br></br>
      <h3 className="H3">Mobile No. : {patientdata1.phNo}</h3>
      <br></br>
      <h3 className="H3">Emai ID : {patientdata1.email}</h3>
      <br></br>
      <h3 className="H3">Age : {patientdata1.age}</h3>
      <br></br>
      <h3 className="H3">Adhar No. : {patientdata1.adharNo}</h3>
      <br></br>

      
      &nbsp;&nbsp;
      <Button variant="danger" style={{ float: "right", margin: '10px', marginRight: "40px" }} href='/uploadreportdrside'>Upload Medical report</Button>
      &nbsp;&nbsp;
      <br></br>
      <Table striped bordered hover variant="primary" >
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Doctor Name</th>
            <th>Description </th>
            <th>Date of Modification</th>
            <th>View the file</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.Record.doctorname}</td>
                <td>{item.Record.description}</td>
                <td>{item.Record.date}</td>
                <td> <a href={item.Record.viewurl}>Click here</a></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}