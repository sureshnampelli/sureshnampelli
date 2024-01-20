import { LightningElement,api,wire } from 'lwc';
import getPatientEnquiryDoctor from '@salesforce/apex/HospitalApexFour.getPatientEnquiryDoctor';
import getHospitalDoctors from '@salesforce/apex/HospitalApexFour.getHospitalDoctors';
import getHospitalPatientEnquiry from '@salesforce/apex/HospitalApexFour.getHospitalPatientEnquiry';
import generatePatientPDF from '@salesforce/apex/HospitalPatientPdfController.generatePatientPDF';
import getPdf from '@salesforce/apex/HospitalPatientPdfController.getPdf';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { NavigationMixin } from 'lightning/navigation'
import {ShowToastEvent} from'lightning/platformShowToastEvent'
//Id,FULL_NAME__C,Name ,Gender__c,Age__c ,Sample_ID__c,Ref_Doctor__c ,Sample_Drawn_Date__c,
import HL_OBJECT from '@salesforce/schema/Hospital_Lab__c'
import HL_EN from '@salesforce/schema/Hospital_Lab__c.Lab__c'
import HL_NAME from '@salesforce/schema/Hospital_Lab__c.Name'
import HL_GENDER from '@salesforce/schema/Hospital_Lab__c.Gender__c'
import HL_FNAME from '@salesforce/schema/Hospital_Lab__c.FULL_NAME__C'
import HL_AGE from '@salesforce/schema/Hospital_Lab__c.Age__c'
import HL_EMAIL from '@salesforce/schema/Hospital_Lab__c.Email__c'
import HL_SID from '@salesforce/schema/Hospital_Lab__c.Sample_ID__c'
import HL_RD from '@salesforce/schema/Hospital_Lab__c.Ref_Doctor__c'
import HL_SDD from '@salesforce/schema/Hospital_Lab__c.Sample_Drawn_Date__c'
//Sample_Regd_Date__c,Sample_Auth_Date__c,S_Total_Cholesterol__c,S_Triglycerides__c,
import HL_SRD from '@salesforce/schema/Hospital_Lab__c.Sample_Regd_Date__c'
import HL_SAD from '@salesforce/schema/Hospital_Lab__c.Sample_Auth_Date__c'
import HL_STC from '@salesforce/schema/Hospital_Lab__c.S_Total_Cholesterol__c'
import HL_ST from '@salesforce/schema/Hospital_Lab__c.S_Triglycerides__c'
//S_Hdl__c,	VLDL__c,SLDL__c,
//TChol__c,	LDL_HDL__c ,Email__c,Test__c,Patient_Id__c FROM Hospital_Lab__c
import HL_SH from '@salesforce/schema/Hospital_Lab__c.S_Hdl__c'
import HL_VL from '@salesforce/schema/Hospital_Lab__c.VLDL__c'
import HL_SL from '@salesforce/schema/Hospital_Lab__c.SLDL__c'
import HL_TC from '@salesforce/schema/Hospital_Lab__c.TChol__c'
import HL_LH from '@salesforce/schema/Hospital_Lab__c.LDL_HDL__c'

export default class HospitalLipidTestMain extends LightningElement {
@api lipiddata ; labedpdf=false ;bloodedpdf=false
inputsampleId
sampleIdHandler(event){
this.inputsampleId= event.target.value
}
inputsampleDrawnDate
sampleDrawnDateHandler(event){
   this.inputsampleDrawnDate= event.target.value
}
inputsampleRegDate
sampleRegDateHandler(event){
    this.inputsampleRegDate =event.target.value

}
inputsampleAuthDate
sampleAuthDateHandler(event){
   this.inputsampleAuthDate= event.target.value
}
inputtotalChol
totalCholHandler(event){
 this.inputtotalChol=event.target.value

}
inputtriglycerides
triglyceridesHandler(event){
  this.inputtriglycerides =event.target.value
}
inputsHdl
sHdlHandler(event){
  this.inputsHdl=  event.target.value
}
inputvldl
vldlHandler(event){
   this.inputvldl= event.target.value
}
inputsldl
sldlHandler(event){
   this.inputsldl= event.target.value
}
inputtChol
tCholHandler(event){
   this.inputtChol= event.target.value
}
inputldldhl
ldlHdlHandler(event){
   this.inputldldhl= event.target.value
}

patientAppointmentHandler(){
    //master relaion Hospital_Lab__c.Lab__c
    console.log('0')
    var fields={}
    fields[HL_NAME.fieldApiName]= this.patientFullName
    fields[HL_FNAME.fieldApiName]= this.patientFullName
   fields[HL_AGE.fieldApiName]= this.patientAge
    fields[HL_GENDER.fieldApiName]= this.patientGender
    fields[HL_EMAIL.fieldApiName]= this.patientEmail
    fields[HL_SID.fieldApiName]= this.inputsampleId
    fields[HL_RD.fieldApiName]=this.selectDocName
    fields[HL_SDD.fieldApiName]= this.inputsampleDrawnDate
    fields[HL_SRD.fieldApiName]= this.inputsampleRegDate
    fields[HL_SAD.fieldApiName]= this.inputsampleAuthDate
    fields[HL_STC.fieldApiName]= this.inputtotalChol
    fields[HL_ST.fieldApiName]= this.inputtriglycerides
    fields[HL_SH.fieldApiName]= this.inputsHdl
    fields[HL_VL.fieldApiName]= this.inputvldl
    fields[HL_SL.fieldApiName]= this.inputsldl
    fields[HL_TC.fieldApiName]= this.inputtChol
    fields[HL_LH.fieldApiName]= this.inputldldhl
    //master relaion Hospital_Lab__c.Lab__c 
    fields[HL_EN.fieldApiName]=this.lipiddata
   console.log('4')
    const recordInputOne = { apiName:HL_OBJECT.objectApiName, fields };
    createRecord(recordInputOne)
.then(acc => { console.log('secon',acc)
this.dispatchEvent(
    new ShowToastEvent({
        title: 'Success',
        message: 'Account created',
        variant: 'success',
    }),      
);
})
.catch(error => {
this.dispatchEvent(
    new ShowToastEvent({
        title: 'Error creating record',
        message: error.body.message,
        variant: 'error',
    }),
);
})
}
get docrefdis(){
    return this.docRef ? true :false
}
patientFullName
patientAge
patientGender
patientEmail
docRef
patientAppointmentData=[]
@wire(getHospitalPatientEnquiry,{patientEnquiryId:'$lipiddata'})
wiredPatientEnquiry({data,error}){
    if(data){
        console.log('patient enquiry',data)
        this.patientAppointmentData=data
        this.patientFullName=this.patientAppointmentData[0].Name
        this.patientAge=this.patientAppointmentData[0].Age__c
this.patientGender=this.patientAppointmentData[0].Gender__c
this.patientEmail=this.patientAppointmentData[0].Email__c
var ind1=this.patientAppointmentData[1].Test_Name__c
console.log('multi',ind1.indexOf('Lipid'),ind1.length)
data.filter(g=>{
    if(g.Test_Name__c){
       var ind=g.Test_Name__c
        console.log('multi',ind.indexOf('Lipid'),ind.length)
        if(ind.indexOf('Lipid')){
        this.docRef=  g.Hospital_Doctor__c?g.Hospital_Doctor__c:this.doctorId
        this.selectDocName=g.Doctor_Name__c? g.Doctor_Name__c: this.selectedDoctorType
        console.log('refc',g.Test_Name__c ,g.Hospital_Doctor__c) 
        this.callApex()
    }}
})

     }
    if(error){
            console.error(error)
    }
}
pdfPatientId
//String DoctorId ,String EnquiryId
callApex(){
getPatientEnquiryDoctor({EnquiryId:this.lipiddata,DoctorId:this.docRef}).then(result=>{
    console.log('enDoc',result[0])
    if(result[0]){
        this.pdfPatientId=result[0].Id
        console.log('ppp',result[0].Id)
       
    }

})}

get typeDoctor(){
    return [{label:"General",value:"general"},{label:"Aadi",value:"aadi"},
    {label:"Allu Arjun",value:"alluarjun"}, {label:"Bala Krishna",value:"balakrishna"},
    {label:"Mahesh Babu",value:"maheshbabu"},{label:"Nagarjuna",value:"nagarjuna"},
    {label:"Prabhas",value:"prabhas"},{label:"Ram charan",value:"ramcharan"},
    {label:"Raviteja",value:"raviteja"}, {label:"Sai Kumar",value:"saikumar"},
    {label:"Srikanth",value:"srikanth"},{label:"Venkatesh",value:"venkatesh"},]
}
selectedDoctorType="general"
selectDocName
typeDoctorHandler(event){
    
    this.selectedDoctorType=event.target.value
}
doctorsData=[]
doctorId
@wire(getHospitalDoctors,{docName:'$selectedDoctorType'})
wiredDoctors({data,error}){
    if(data){
this.doctorsData=data
        this.doctorId=data[0].Id
        this.callApex()
        console.log('doctor',data)
        console.log('doc info',data[0].Name,data[0].Id)
    }
    if(error){
        console.error(error)
    }
}


pdfHandler(){
    let content=this.template.querySelector('.container')
    console.log(content.outerHTML)
    //Hospital_Account__c (Attachment Cost(a065j00000NssHuAAJ) Id)
    generatePatientPDF({recordId:this.pdfPatientId, htmlData:content.outerHTML }).then(result=>{
        console.log('attachment id',result)
        console.log('record',this.recordId)
        window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=this.pdfPatientId`)
    }).catch(error=>{
        console.error(error)
    })
}

emailHandler(){
    let content=this.template.querySelector('.container')
    getPdf({recordId:this.pdfPatientId , htmlData:content.outerHTML ,emailTo:this.patientEmail}).then(result=>{
        console.log('attachment email',result)
        window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=this.pdfPatientId`)
    }).catch(error=>{
        console.error(error)
    })
}
}
