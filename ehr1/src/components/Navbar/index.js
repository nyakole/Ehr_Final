import React from 'react';
import {  Link } from 'react-router-dom';
import { Navbar,Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import logo from './logo.png'

const Navbar1 = () => {


  return (
    
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor:"transparent" }} className="center"  fixed="top" variant="secondary" > 
    
    <Navbar.Brand href="#home" style={{ color:"rgb(194, 31, 158)" }} > 
    <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      EHR</Navbar.Brand>
     
    <Nav  >
      <Nav.Link  className="colours12" as={Link} to= '/'>Home</Nav.Link>
      <Nav.Link className="colours12" as={Link} to='/patient'>Patient</Nav.Link>
      <Nav.Link className="colours12" as={Link} to= '/doctor'>Doctor</Nav.Link>
    </Nav>
   
  </Navbar>
  
  );
};


export default Navbar1;
