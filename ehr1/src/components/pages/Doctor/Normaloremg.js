import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';




export default function Logindoctor() {
  const history = useHistory();
  

  

  const handleSubmit = async (event) => {
   
    
            history.push('/emailpatient')
        
  }
  const handleSubmit1 = async (event) => {
   
    
    history.push('/emergency')

}

  return (
    <div className="Login">
      
        <Button block size="lg" onClick={handleSubmit} >
        Normal 
        </Button>
        <Button block size="lg" onClick={handleSubmit1} >
        Emergency 
        </Button>
       
    </div>
  );
}