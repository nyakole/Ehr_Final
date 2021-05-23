//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const {  FileSystemWallet,Wallets,Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const mspOrg1 = 'Org1MSP';
const path = require('path');
const fs = require('fs');
//const enrollAdmin = require('./enrollAdmin.js');
//const {registerAndEnrollUser}= require('./registerUser.js');
const { buildCAClient, enrollAdmin } = require('../../../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../../../test-application/javascript/AppUtil.js');
//connect to the config file
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
// let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;
let appAdmin_pat = config.appAdmin_pat;
let appAdmin_doc = config.appAdmin_doc;
let orgMSPID_pat = config.orgMSPID_pat;
let orgMSPID_doc = config.orgMSPID_doc;


// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const walletPath = path.join(process.cwd(), 'wallet');
//const ccp1 = buildCCPOrg1();
//const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');


const util = require('util');

exports.connectToNetwork = async function (userName) {
  
  
    console.log('adminregisterd: ');
    ///a//wait registerAndEnrollUser(userName);
    //console.log('userName: ');
   // console.log(userName);
    const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1,userName);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		//await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');

      
    //const wallet = await buildWallet(Wallets, walletPath);
    const gateway = new Gateway();
  
    try {
      //const ccp = buildCCPOrg1();
      //const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
      //const walletPath = path.join(process.cwd(), 'wallet');
      //const wallet = new FileSystemWallet(walletPath);
      //const wallet = await buildWallet(Wallets, walletPath);
      //await enrollAdmin(caClient, wallet, mspOrg1,userName);
      //console.log(`Wallet path: ${walletPath}`);
     // console.log('userName: ');
     // console.log(userName);
  //
     /* console.log('wallet: ');
      console.log(util.inspect(wallet));
      console.log('ccp: ');
      console.log(util.inspect(ccp));*/
      
      // userName = 'V123412';
      /*const userExists = await wallet.exists(userName);
      if (!userExists) {
        console.log('An identity for the user ' + userName + ' does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        let response = {};
        response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
        return response;
      }*/
  
     // console.log('before gateway.connect: ');
  
      await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });
  
      // Connect to our local fabric
      const network = await gateway.getNetwork('mychannel');
  
    //  console.log('Connected to mychannel. ');
      // Get the contract we have installed on the peer
      const contract = await network.getContract('fabcar');
  
  
      let networkObj = {
        contract: contract,
        network: network,
        gateway: gateway
      };
  
      return networkObj;
      
  
    } catch (error) {
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
      let response = {};
      response.error = error;
      return response;
    } finally {
      console.log('Done connecting to network.');
      // gateway.disconnect();
    }
  };


//Client application part for calling/invoking any smart contract function(query etc)
  
exports.invoke = async function (networkObj, isQuery, func, args) {
    try {
      console.log('inside invoke');
      console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
      //console.log(util.inspect(networkObj));
  
  
      // console.log(util.inspect(JSON.parse(args[0])));
  
      if (isQuery === true) {
        console.log('inside isQuery');
  
        if (args) {
          console.log('inside isQuery, args');
          args = JSON.parse(args[0]);
          //console.log(util.inspect(args));
          args = JSON.stringify(args);
          //console.log(util.inspect(args));
         // console.log('123');

          //console.log(args);
          let response = await networkObj.contract.evaluateTransaction(func, args);
          //console.log(response);
          console.log(`Transaction ${func} with args ${args} has been evaluated`);
          console.log("hi fine");
    
          await networkObj.gateway.disconnect();

    
          return response;
          
        } else {
  
          let response = await networkObj.contract.evaluateTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} without args has been evaluated`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      } else {
        console.log('notQuery');
        if (args) {
          console.log('notQuery, args');
          console.log('$$$$$$$$$$$$$ args: ');
          console.log(args);
          console.log(func);
          console.log(typeof args);
  
          args = JSON.parse(args[0]);
  
          console.log(util.inspect(args));
          args = JSON.stringify(args);
          console.log(util.inspect(args));
  
          console.log('before submit');
          console.log(util.inspect(networkObj));
          let response = await networkObj.contract.submitTransaction(func, args);
          console.log('after submit');
  
          console.log(response);
          console.log(`Transaction ${func} with args ${args} has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
  
  
        } else {
          let response = await networkObj.contract.submitTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} with args has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      }
  
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      return error;
    }
  };






//Client application part for registering a new Patient


exports.registerPatient = async function (patientId,email, adharNo, name,sha256) {
  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await buildWallet(Wallets, walletPath);
    //const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);
    

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.get(sha256);
    
    if (userExists) {
      let response = {};
      console.log(`An identity for the patient with patientId ${email} already exists in the wallet`);
      response.error = `Error! the patient with Email ${email}  and Name ${name} already exists in the database.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get(appAdmin_pat);
    if (!adminIdentity) {
      console.log(`An identity for the admin user ${appAdmin_pat} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin_pat} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }
    

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin_pat, discovery: gatewayDiscovery });
    console.log('i am finewallet');

    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, appAdmin_pat);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
    const ccp1 = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
		const secret = await caClient.register({
			affiliation: '',
			enrollmentID: sha256,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: sha256,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMSPID_pat,
			type: 'X.509',
		};
		await wallet.put(sha256, x509Identity);
		console.log(`Successfully registered and enrolled user ${email} and imported it into the wallet`);

    // Get the CA client object from the gateway for interacting with the CA.
    //const ca = gateway.getClient().getCertificateAuthority();
    //const adminIdentity = gateway.getCurrentIdentity();
    //console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    //const secret = await ca.register({ affiliation: '', enrollmentID: patientId, role: 'client' }, adminIdentity);

    //const enrollment = await ca.enroll({ enrollmentID: patientId, enrollmentSecret: secret });
    //const userIdentity = await X509WalletMixin.createIdentity(orgMSPID_pat, enrollment.certificate, enrollment.key.toBytes());
    //await wallet.import(patientId, userIdentity);
    console.log(`Successfully registered Patient ${name} . Use patientId ${patientId} and password: secret99 to login above.`); //password is static and set to secret99 for patients
    let response = `Successfully registered Patient ${name} . Use patientId ${patientId} and password: secret99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register patient + ${adharNo} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};


//Client application part for registering a new Doctor

 
exports.registerDoctor = async function (doctorId,email,name,sha256) {
  try {
    // Create a new file system based wallet for managing identities.
    const ccp1 = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await buildWallet(Wallets, walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);
    await enrollAdmin(caClient, wallet, orgMSPID_pat,appAdmin_doc);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.get(sha256);
    if (userExists) {
      
      let response = {};
      console.log(`An identity for the user ${name} already exists in the wallet`);
      response.error = `Error! the Doctor with Email ${email}  and Name ${name} already exists in the database.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get(appAdmin_doc);
    if (!adminIdentity) {
      console.log(`An identity for the admin user ${appAdmin_doc} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin_doc} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin_pat, discovery: gatewayDiscovery });


    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, appAdmin_doc);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
    //const ccp1 = buildCCPOrg1();
    //const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
		const secret = await caClient.register({
			affiliation: '',
			enrollmentID: sha256,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: sha256,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMSPID_pat,
			type: 'X.509',
		};
		await wallet.put(sha256, x509Identity);
		console.log(`Successfully registered and enrolled user ${doctorId} and imported it into the wallet`);


    // Get the CA client object from the gateway for interacting with the CA.
    /*const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: doctorId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: doctorId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID_doc, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(doctorId, userIdentity);*/
    console.log(`Successfully registered Doctor ${name} . Use DoctorId ${doctorId} and password: doctor99 to login above.`); //password is static and set to doctor99 for doctors
    let response = `Successfully registered Doctor ${name} . Use DoctorId ${doctorId} and password: doctor99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register doctor + ${name} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};



exports.registerReport = async function (reportId, patientId, url) {

  
  try {

    // Create a new file system based wallet for managing identities.
    const ccp1 = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await buildWallet(Wallets, walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);
    await enrollAdmin(caClient, wallet, orgMSPID_pat,appAdmin_doc);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.get(reportId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the user ${reportId} already exists in the wallet`);
      response.error = `Error! An identity for the user ${reportId} already exists in the wallet. Please enter a different license number.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get(appAdmin_doc);
    if (!adminIdentity) {
      console.log(`An identity for the admin user ${appAdmin_doc} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin_doc} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin_pat, discovery: gatewayDiscovery });


    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, appAdmin_doc);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
    //const ccp1 = buildCCPOrg1();
    //const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
		const secret = await caClient.register({
			affiliation: '',
			enrollmentID: reportId,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: reportId,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMSPID_pat,
			type: 'X.509',
		};
		await wallet.put(reportId, x509Identity);
		console.log(`Successfully registered and enrolled user ${reportId} and imported it into the wallet`);


    // Get the CA client object from the gateway for interacting with the CA.
    /*const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: doctorId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: doctorId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID_doc, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(doctorId, userIdentity);*/
    console.log(`Successfully registered Doctor ${patientId} . Use DoctorId ${reportId} and password: doctor99 to login above.`); //password is static and set to doctor99 for doctors
    let response = `Successfully registered Doctor ${url} . Use DoctorId ${reportId} and password: doctor99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to upload report + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};


exports.verifypatient = async function (email,sha256) {
  try {
    // Create a new file system based wallet for managing identities.
    const ccp1 = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp1, 'ca.org1.example.com');
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await buildWallet(Wallets, walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);
    await enrollAdmin(caClient, wallet, orgMSPID_pat,appAdmin_doc);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.get(sha256);
    if (userExists) {
      
      let response = {};
      console.log(`An identity for the user  already exists in the wallet`);
      response.error = `Error! the Patient with Email ${email}   already exists in the database.`;
      return response;
    }
    else{
      let response = {};
      response.Success = `Success! the Patient with Email ${email}   not exists in the database.`;
      return response;
    }
  }
  catch (error) {
    console.error(`Failed to register Patient + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};


