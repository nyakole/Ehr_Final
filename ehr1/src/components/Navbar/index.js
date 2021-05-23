import React from 'react';
import {  Link } from 'react-router-dom';
import { Navbar,Nav,Form,Button,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar1 = () => {
  return (
   

    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to= '/'>Home</Nav.Link>
      <Nav.Link as={Link} to='/patient'>Patient</Nav.Link>
      <Nav.Link as={Link} to= '/doctor'>Doctor</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  );
};

export default Navbar1;
