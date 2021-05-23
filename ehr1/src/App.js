import React,{Component} from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import Home from './components/pages/patient/Loginpatient';
//import Loginpatient from './components/pages/patient/Login';
import Resgisterpatient from './components/pages/patient/Registerpatient';
import Logindoctor from './components/pages/Doctor/Logindoctor';
import Resgisterdoctor from './components/pages/Doctor/Resgisterdoctor';
import Uploadreportdrside from './components/pages/Doctor/Uploadreportdrside';
import Uploadreportpatside from './components/pages/patient/Uploadreportpatside';
import patientview from './components/pages/patient/patientview';
import Login from './components/pages/patient/Login';
import Navbar1 from './components/Navbar/index';
import Doctorview from './components/pages/Doctor/Doctorview';
import Verifyotp from './components/pages/Doctor/Verifyotp';
import Emailpatient from './components/pages/Doctor/Emailpatient';
import Home from './components/home/Home';
import Emailreg from './components/pages/patient/Emailreg';
import Verifyotp1 from './components/pages/patient/Verifyotp1';
import Normaloremg from './components/pages/Doctor/Normaloremg';
import Emergency from './components/pages/Doctor/Emergency'
import Emergencyotp from './components/pages/Doctor/Emergencyotp'
class  App extends Component {
  render(){
    return (
      <Router>
      <Navbar1 />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/patient' component={Login} />
        <Route path='/doctor' component={Logindoctor} />
        <Route path='/resgisterpatient' component={Resgisterpatient} />        
        <Route path='/resgisterdoctor' component={Resgisterdoctor} />
        <Route path='/uploadreportdrside' component={Uploadreportdrside} />
        <Route path='/uploadreportpatside' component={Uploadreportpatside} />
        <Route path='/patientview' component={patientview} />
        <Route path='/doctorview' component={Doctorview} />
        <Route path='/emailpatient' component={Emailpatient} />
        <Route path='/verifyotp' component={Verifyotp} />
        <Route path='/emailreg' component={Emailreg} />   
        <Route path='/Verifyotp1' component={Verifyotp1} />   
        <Route path='/normaloremg' component={Normaloremg} />
        <Route path='/emergency' component={Emergency} />
        <Route path='/emergencyotp' component={Emergencyotp} />
      </Switch>
      
    </Router>
    )

  };
  
}

export default App;
