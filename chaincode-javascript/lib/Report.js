'use strict';

class Report {
  /**
   *
   * Report
   *
   * Constructor for a Report object.
   * @param args.viewurl - viewurl of report  
   * @param args.downloadurl - downloadurl of report
   * @param args.patientId - patientId of report
   * @param args.doctorId - doctorId of report
   * @param args.doctorname - doctorname of report
   * @param args.date - date of report
   * @param args.description - description of report
   * 
   * @returns - report object
   */
  constructor(reportId, patientId,doctorId,doctorname,date,description,viewurl,downloadurl) {

      this.reportId = reportId;
      this.patientId = patientId;
      this.doctorId =  doctorId;
      this.doctorname=doctorname;
      this.date =  date;
      this.description  =  description ;
      this.viewurl = viewurl;
      this.downloadurl = downloadurl;
      
      //this.isAsked = isAsked;
      //this.isGiven = isGiven;
      this.type = 'report';

      return this;

    } 

  }



module.exports = Report;