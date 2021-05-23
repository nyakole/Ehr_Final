import React, { useState, useEffect } from "react";

import { Button, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
    sessionStorage.clear();
    history.push('/');
  }
  return (
    <div className="dashbord">
      <h1>{patientdata1.name}</h1>
      <Button variant="danger" onClick={Logoutpatient}>Logout</Button>
      <Button variant="danger" href='/uploadreportpatside'>uploadreport</Button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Description </th>
            <th>Date of Modification</th>
            <th>View the file</th>
            <th>Download the file</th>
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
                <td> <a href={item.Record.viewurl}>CliCk Here</a></td>
                <td> <a href={item.Record.downloadurl}>Click Here</a></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}