'use strict';

class Doctor {
  /**
   *
   * Doctor
   *
   * Constructor for a Doctor object.    
   * @param args.email - the email  of the Doctor 
   * @param args.userid - the userid of the Doctor 
   * @param args.password - the password of the Doctor 
   * @param args.dob - the dob of the Doctor 
   * @param args.adharNo - the adharNo of the Doctor  
   * @param args.licenseId - the license number of the Doctor 
   * @param args.name - name of Doctor
   * @param args.age - age of Doctor
   * @param args.phNo - phone number of Doctor
   * @param args.hospitalname-name of hospital
   * @param args.address-address of hospital
   * @param args.edu-address of hospital
   * @returns - doctor object
   */
  constructor(doctorId,email,userid,password,dob, adharNo, licenseId, name, age, phNo,hospitalname,address,edu) {

      this.doctorId =  doctorId;
      this.licenseId = licenseId;
      this.email = email;
      this.userid = userid;
      this.password = password;
      this.dob = dob;
      this.adharNo = adharNo;
      this.name = name;
      this.age = age;
      this.phNo = phNo;
      this.hospitalname=hospitalname;
      this.address=address;
      this.edu=edu;
      this.type = 'doctor';

      return this;

    } 

  }



module.exports = Doctor;