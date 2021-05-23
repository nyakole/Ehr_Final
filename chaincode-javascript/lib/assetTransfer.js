

'use strict';

const { Contract } = require('fabric-contract-api');
let Patient = require('./Patient.js');
let Doctor = require('./Doctor.js');
let Report = require('./Report.js');

class AssetTransfer extends Contract {
  async init(ctx) {
    console.log('instantiate was called!');
  }



  async createMyAsset(ctx, myAssetId, value) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (exists) {
      throw new Error(`The my asset ${myAssetId} already exists`);
    }
    const asset = { value };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(myAssetId, buffer);
  }

  async readMyAsset(ctx, args) {
    args = JSON.parse(args);
    let myAssetId = args.patientId;
    console.log("HELLO");
    console.log(myAssetId);
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error({ "error": "The my asset ${myAssetId} does not exist" });
    }
    const buffer = await ctx.stub.getState(myAssetId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  async checkMyAsset(ctx, args) {
    args = JSON.parse(args);
    let myAssetId = args.patientId;
    if (!myAssetId) {
      myAssetId = args.doctorId;
    }
    if (!myAssetId) {
      myAssetId = args.reportId;
    }
    console.log("HELLO");
    console.log(myAssetId);
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error({ "error": "The my asset ${myAssetId} does not exist" });
    }
    if (args.pswd != "secret99") {
      if (args.pswd != "doctor99") {
        return ({ "error": "Wrong Password" })
      }
    }

    const buffer = await ctx.stub.getState(myAssetId);
    if (buffer) {
      return ({ "Success": "Logged in successfully" });
    }
  }




  async updateMyAsset(ctx, myAssetId, newValue) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }
    const asset = { value: newValue };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(myAssetId, buffer);
  }

  async deleteMyAsset(ctx, myAssetId) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }
    await ctx.stub.deleteState(myAssetId);
  }

  //My First Smart Contract

  async printSomething(ctx, text) {

    return JSON.parse(text);
  }







  // CreateAsset issues a new asset to the world state with given details.


  async myAssetExists(ctx, myAssetId) {
    const buffer = await ctx.stub.getState(myAssetId);
    return (!!buffer && buffer.length > 0);

  }

  async createPatient(ctx, args) {

    args = JSON.parse(args);

    //create a new Patient
    let newPatient = new Patient(args.patientId, args.email, args.userid, args.password, args.dob, args.adharNo, args.name, args.age, args.phNo)

    //update state with new patient
    ctx.stub.putState(newPatient.patientId, Buffer.from(JSON.stringify(newPatient)));

    let response = { "Success": `Patient with adharNo ${newPatient.adharNo} has been successfully updated in the world state of the EHR blockchain network` };
    console.log(response)
    return response;
  }



  async createDoctor(ctx, args) {

    args = JSON.parse(args);

    //create a new Doctor
    let newDoctor = new Doctor(args.doctorId, args.email, args.userid, args.password, args.dob, args.adharNo, args.licenseId, args.name, args.age, args.phNo,args.hospitalname,args.address,args.edu);

    //update state with new Doctor
    ctx.stub.putState(newDoctor.doctorId, Buffer.from(JSON.stringify(newDoctor)));

    let response = { "Success": `Doctor with licenseId ${newDoctor.licenseId} is updated in the world state of the EHR blockchain network` };
    return response;
  }



  async createReport(ctx, args) {

    args = JSON.parse(args);

    let newReport = new Report(args.reportId, args.patientId, args.doctorId, args.doctorname, args.date, args.description, args.viewurl, args.downloadurl);

    ctx.stub.putState(newReport.reportId, Buffer.from(JSON.stringify(newReport)));

    let response = { "Success": `New report with reportId ${newReport.reportId} for Patient with patientId has been added to the world state of the EHR blockchain network` };
    console.log(response)
    return response;
  }


  async queryByObjectType(ctx, objectType) {

    let queryString = {
      selector: {
        type: objectType

      }
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }




  async getpatientDatatodoctor(ctx, args) {

    args = JSON.parse(args);
    let email = args.email;
    let queryString = {
      selector: {
        type: 'patient',
        email: email
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  async getpatientDatapatient(ctx, args) {
    args = JSON.parse(args);
    let email = args.email;
    let password = args.password;
    let queryString = {
      selector: {
        type: 'patient',
        email: email,
        password: password
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }


  async getpatientReport(ctx, args) {
    args = JSON.parse(args);
    let patientId = args.patientId;
    let queryString = {
      selector: {
        type: 'report',
        patientId: patientId
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  async getdoctorDatodoctor(ctx, args) {
    args = JSON.parse(args);
    let email = args.email;
    let password = args.password;
    let queryString = {
      selector: {
        type: 'doctor',
        email: email,
        password: password
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }


  async getemergency(ctx, args) {
    args = JSON.parse(args);
    let phNo = args.phNo;
    let adharNo = args.adharNo;
    let queryString = {
      selector: {
        type: 'patient',
        phNo: phNo,
        adharNo: adharNo
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }


  async queryWithQueryString(ctx, queryString) {

    console.log('query String');
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));

        return JSON.stringify(allResults);

      }
    }
  }

  async checkExist(ctx, query) {

    let queryString = {
      selector: {
        adharNo: query
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }



  // ReadAsset returns the asset stored in the world state with given id.



  async getPatients(ctx) {

    let queryResults = await this.queryByObjectType(ctx, 'patient');
    return queryResults;

  }

  async getDoctors(ctx) {

    let queryResults = await this.queryByObjectType(ctx, 'doctor');
    return queryResults;

  }


  async getReports(ctx) {

    let queryResults = await this.queryByObjectType(ctx, 'report');
    return queryResults;

  }

  async getpatientData(ctx, args) {
    //args = JSON.parse(args);
    args = JSON.parse(args);
    let myAssetId = args.email;
    

    let queryResults = await this.checkExist1(ctx, myAssetId);
    return queryResults;
  }
 
}

module.exports = AssetTransfer;
