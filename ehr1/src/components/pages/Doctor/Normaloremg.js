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
  function LogoutDoctor(params) {
    sessionStorage.clear();
    history.push('/');
  }

  return (
    <div className="back">
      <div className="col-sm">
      <Button variant="danger" style={{ float: "right", margin: '10px', marginRight: "30px" }} onClick={LogoutDoctor}>Logout Doctor</Button>
        <div className="center back">


          <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
            <div className="row">
              <div className="column-50">
                <h1 className="xlarge-font" style={{ color: "MediumSeaGreen" }}><b>Normal Condition</b></h1>
                <h3 ><b>Click below button</b></h3>
                <Button block size="lg" style={{ alignItems: "center", margin: '5px' }} onClick={handleSubmit} >
                  Normal
        </Button>
              </div>
              <div className="column-50">
                <h1 className="xlarge-font" style={{ color: "MediumSeaGreen" }}><b>Emergency Condition</b></h1>
                <h3 ><b>Click below button</b></h3>
                <Button block size="lg" style={{ alignItems: "center", margin: '5px' }} onClick={handleSubmit1} >
                  Emergency
        </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}