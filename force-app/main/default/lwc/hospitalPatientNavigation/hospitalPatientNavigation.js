import { LightningElement,api,wire,track } from 'lwc';
import getPatientDetails from '@salesforce/apex/HospitalApexFour.getPatientDetails';
import getHospitalDoctors from '@salesforce/apex/HospitalApexFour.getHospitalDoctors';
import getHospitalPatientEnquiry from '@salesforce/apex/HospitalApexFour.getHospitalPatientEnquiry';
import getDoctorsLogin from '@salesforce/apex/HospitalApexFour.getDoctorsLogin';
import createHospitalPatient from '@salesforce/apex/HospitalAllotedMedicineController.createHospitalPatient';
import getRelatedFilesByRecordId from '@salesforce/apex/FilePreviewAndDownloadController.getRelatedFilesByRecordId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
//Id ,Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
//Gender__c, Email__c , Fee__c FROM Hospital_Patient__c
import HP_OBJECT from '@salesforce/schema/Hospital_Patient__c'
import HP_NAME from '@salesforce/schema/Hospital_Patient__c.Name'
import HP_FNAME from '@salesforce/schema/Hospital_Patient__c.First_Name__c'
import HP_LNAME from '@salesforce/schema/Hospital_Patient__c.Last_Name__c'
import HP_AGE from '@salesforce/schema/Hospital_Patient__c.Age__c'
import HP_DATETIME from '@salesforce/schema/Hospital_Patient__c.Date_Time__c'
import HP_DOCTORNAME from '@salesforce/schema/Hospital_Patient__c.Doctor_Name__c'
import HP_DOCTYPE from '@salesforce/schema/Hospital_Patient__c.Doctor_Type__c'
import HP_PHONE from '@salesforce/schema/Hospital_Patient__c.Phone__c'
import HP_GENDER from '@salesforce/schema/Hospital_Patient__c.Gender__c'
import HP_EMAIL from '@salesforce/schema/Hospital_Patient__c.Email__c'
import HP_FEE from '@salesforce/schema/Hospital_Patient__c.Fee__c'
import HP_EN_ID from '@salesforce/schema/Hospital_Patient__c.Enquiry__c'
import HP_HD_ID from '@salesforce/schema/Hospital_Patient__c.Hospital_Doctor__c'
import HP_VAR from '@salesforce/schema/Hospital_Patient__c.Variable__c';
import HP_ID from '@salesforce/schema/Hospital_Patient__c.Id';
//import EN_ID from '@salesforce/schema/Hospital_Patient__c.Id'
//import EN_HD from '@salesforce/schema/Enquiry__c.Hospital_Doctor__c'
import PatientAppointmentRemovebg from '@salesforce/resourceUrl/PatientAppointmentRemovebg'
import AppointmentHistoryRemovebg from '@salesforce/resourceUrl/AppointmentHistoryRemovebg'
export default class HospitalPatientNavigation extends NavigationMixin(LightningElement) {
    pdfFileShow=false
    patientappointmentremovebg=PatientAppointmentRemovebg
    appointmenthistoryremovebg=AppointmentHistoryRemovebg
@api patientProfile
@track showLoading = false;
genImage
doctorName
doctorId
doctorFee
doctorType
patientIdO
patientEnquiryData=[]
fileRecordId
showBookApp=false
showAppHistory=false
showDashboard=true

bookAppHandler(){
   
    if( this.showBookApp===false){
        if( this.showAppHistory===true){
            this.showBookApp=false 
        }
        if( this.showAppHistory===false){
            this.template.querySelector(".bookappbtn").classList.toggle("myBookApp")
            this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
            this.showDashboard=false
            this.showBookApp=true
        }
  //  this.showAppHistory=false
}
    else{
        this.showBookApp=false
        this.showDashboard=true
        this.template.querySelector(".bookappbtn").classList.toggle("myBookApp")
        this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
       // this.showAppHistory=true
    }
}
"slds-hidden"
appHistoryHandler(){
   
    if( this.showAppHistory===false){
        if( this.showBookApp===true){
            this.showAppHistory===false

        }
        if(this.showBookApp===false){
            this.template.querySelector(".apphistorybtn").classList.toggle("myAppHistory")
            this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
            this.showAppHistory=true
            this.showDashboard=false
        }
       
       
    }
    else{
        this.showAppHistory=false
        this.showDashboard=true
        this.template.querySelector(".apphistorybtn").classList.toggle("myAppHistory")
        this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
    }
}

doctorsLoginData=[]
@wire(getDoctorsLogin)
wiredDoctorsLog({data,error}){
    if(data){
        console.log('doc log',data)
        this.doctorsLoginData=data

    }
    if(error){
        console.error(error)
    }
}

//'$patientProfile.Id'
@wire( getPatientDetails,{patientId:'$patientProfile.Id'})
wiredPatientDetails({data,error}){
    if(data){
this.patientEnquiryData=data[0]
        console.log('patient Details',data)

this.patientIdO=data[0].Id
}
    if(error){
            console.error(error)
    }
}
//////////////////////////
patientAppointmentDataOne=[]
@wire(getHospitalPatientEnquiry,{patientEnquiryId:'$patientIdO'})
wiredPatientEnquiry({data,error}){
    if(data){
       // patientName=data[0].F
        console.log('patient enquiry',data)
this.patientAppointmentDataOne =data
     }
    if(error){
            console.error(error)
    }
}
/*Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
       Gender__c, Email__c ,Variable__c,Cancelled_By__c, Fee__c,Date_Time__c,Test_By__c,Test_Name__c,Hospital_Patient__c.Enquiry__c,Hospital_Patient__c.Hospital_Doctor__c FROM Hospital_Patient__c WHERE  Hospital_Patient__c.Enquiry__c=:patientEnquiryId];
    }*/

    columns=[{label:"Doctor Name",fieldName:"Doctor_Name__c"},{label:"Fee",fieldName:"Fee__c"},
    {label:"Appointment Time",fieldName:"Date_Time__c"},{label:"Current Status",fieldName:"Cancelled_By__c"},
     { type: "button", typeAttributes: {  
        label: {fieldName:"cancellabelName"},  
        name: 'Edit',  
        title: 'Edit',  
        disabled: {fieldName:"buttonDisable"},  
        value: 'edit',  
        iconPosition: 'left'  
    } }, { type: "button", typeAttributes: {  
        label:"Files",  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    } }]

   

   patientAppointmentData=[]
   patientRefreshAppointmentData
@wire(getHospitalPatientEnquiry,{patientEnquiryId:'$patientIdO'})
wiredPatientEnquiry(result){
    this.patientRefreshAppointmentData=result
    if(result.data){
       // patientName=data[0].F
        console.log('patient result enquiry',result.data)
this.patientAppointmentData=result.data.map((record)=>{
    let cancellabelName=record.Cancelled_By__c==='Active'?'Cancel':'Cancelled';
    let buttonDisable=record.Cancelled_By__c==='Active'? false: true ;
    return{
        ...record,
        cancellabelName:cancellabelName,
        buttonDisable:buttonDisable
    }
})

     }
    if(result.error){
            console.log(result.error)
    }
}

callRowAction( event ) {  
          
    const recId =  event.detail.row.Id;
    console.log( 'call Row',recId,event.detail.row.Name)  
  //  const actionName = event.detail.action.name; 
  const actionName = event.detail.action.name;  
  if ( actionName === 'Edit' ) {  

    if (recId) {
        this.showLoading = true;
        
        // Create the recordInput object
        const fields = {};
        fields[HP_ID.fieldApiName] = recId;
        fields[HP_VAR.fieldApiName] =event.detail.row.Name
        const recordInput = { fields };
        console.log(recordInput);
        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success!!', 'Patient Record updated successfully!!', 'success', 'dismissable');
                // Display fresh data in the form
                this.showLoading = false;
                refreshApex(this.patientRefreshAppointmentData);
            })
            .catch(error => {
                this.showLoading = false;
                this.showToast('Error!!', error.body.message, 'error', 'dismissable');
            });
    }

    else {
        // The form is not valid
        this.showToast('Error!!', 'Check your input and try again.', 'error', 'dismissable');
    }

  } else if ( actionName === 'View') {
    

    this.fileRecordId=event.detail.row.Id
    console.log('fileeeee',this.fileRecordId)
    if(this.fileRecordId){
        this.callFilePreview()
    }
}
       
}
showToast(title, message, variant, mode) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(evt);
}

closePreviewHandler(){
    this.pdfFileShow=false
}
////////////////////////
get typeDoctor(){
    return [{label:"General",value:"general"},{label:"Aadi",value:"aadi"},
    {label:"Allu Arjun",value:"alluarjun"}, {label:"Bala Krishna",value:"balakrishna"},
    {label:"Mahesh Babu",value:"maheshbabu"},{label:"Nagarjuna",value:"nagarjuna"},
    {label:"Prabhas",value:"prabhas"},{label:"Ram charan",value:"ramcharan"},
    {label:"Raviteja",value:"raviteja"}, {label:"Sai Kumar",value:"saikumar"},
    {label:"Srikanth",value:"srikanth"},{label:"Venkatesh",value:"venkatesh"},]
}
selectedDoctorType="general"
typeDoctorHandler(event){
    this.selectedDoctorType=event.target.value
}

doctorsData=[]
@wire(getHospitalDoctors,{docName:'$selectedDoctorType'})
wiredDoctors({data,error}){
    if(data){
this.doctorsData=data
       this.genImage=data[0].Image__c
        this.doctorName=data[0].Name
        this.doctorId=data[0].Id
this.doctorFee=data[0].Fee__c
this.doctorType=data[0].Doctor_Type__c
        console.log('doctor',data)
        console.log('doc info',data[0].Name,data[0].Id)
    }
    if(error){
        console.error(error)
    }
}
appointDate
appointmentDateHandler(event){
console.log('date',event.target.value)
this.appointDate=event.target.value
}
patientAppointmentHandler(){
    const patientObject={Name:this.patientEnquiryData.Full_Name__c,First_Name__c:this.patientEnquiryData.First_Name__c ,
 Last_Name__c: this.patientEnquiryData.Last_Name__c,Age__c:this.patientEnquiryData.Age__c,
 Doctor_Name__c:this.doctorName,Doctor_Type__c:this.doctorType,Phone__c:this.patientEnquiryData.Phone__c ,
 Gender__c:this.patientEnquiryData.Gender__c, Email__c:this.patientEnquiryData.Email__c ,
        Fee__c:this.doctorFee,Date_Time__c:this.appointDate,
        Enquiry__c:this.patientIdO,Hospital_Doctor__c:this.doctorId
    }
    createHospitalPatient({createPatient:patientObject}).then(result => {
        window.console.log('result^^' + result);
      //  this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message:  'Patient Appointment Created.',
            variant: 'success'
        })); 
       refreshApex(this.patientAppointmentData)           
    }).catch(error => {
        window.console.log('Error ====> ' + error);
       // this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!',
            message: JSON.stringify(error),
            variant: 'error'
        }));            
    });    
}


@api recordId=this.fileRecordId
filesList =[]
callFilePreview(){

getRelatedFilesByRecordId({recordId:this.fileRecordId}).then(data=>{
    console.log('domnmwMn',data)
    this.filesList = Object.keys(data).map(item=>({"label":data[item],
     "value": item,
     "url":`/sfc/servlet.shepherd/document/download/${item}`
    }))
    console.log('HHHHH', JSON.stringify(this.filesList))
})
this.pdfFileShow=true
}
previewHandler(event){
    console.log(event.target.dataset.id)
    this[NavigationMixin.Navigate]({ 
        type:'standard__namedPage',
        attributes:{ 
            pageName:'filePreview'
        },
        state:{ 
            selectedRecordId: event.target.dataset.id
        }
    })
}
randomcards

randomImage
randomDocName
randomDocT

connectedCallback(){
    
    setInterval(()=> {
        this.renCallback()  
    }, 3000);}
    renCallback(){
        var num = Math.floor(Math.random()*this.doctorsLoginData.length); // get a random number between 0-9
   
    for(let i=0; i<=this.doctorsLoginData.length;i++){
        if(this.doctorsLoginData[i]==this.doctorsLoginData[num]){
          this.randomcards=this.doctorsLoginData[i]
this.randomImage=this.doctorsLoginData[i].Image__c
this.randomDocName=this.doctorsLoginData[i].Name
this.randomDocT=this.doctorsLoginData[i].Doctor_Type__c
         // console.log('ran', this.randomcards)
        }
    } 
    }
    particularDoctorShow=false

showToast(title, message, variant, mode) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(evt);
}

}
