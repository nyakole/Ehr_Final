'use strict';

class Patient {
  /**
   *
   * Patient
   *
   * Constructor for a Patient object.    *   
   *  
   * @param args.email - the email  of the patient
   * @param args.userid - the userid of the patient
   * @param args.password - the password of the patient
   * @param args.dob - the dob of the patient
   * @param args.adharNo - the adhar number of the patient 
   * @param args.name - name of patient 
   * @param args.age - age of patient
   * @param args.phNo - phone number of patient
   * @returns - patient object
   */
  constructor(patientId,email,userid,password,dob, adharNo, name, age, phNo) {

      this.patientId = patientId;
      this.email = email;
      this.userid = userid;
      this.password = password;
      this.dob = dob;
      this.adharNo = adharNo;
      this.name = name;
      this.age = age;
      this.phNo = phNo;
      this.type = 'patient';

      return this;

    } 

  }



module.exports = Patient;