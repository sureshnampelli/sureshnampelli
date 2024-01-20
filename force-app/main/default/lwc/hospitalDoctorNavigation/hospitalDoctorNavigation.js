import { LightningElement,api,wire,track } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/FilePreviewAndDownloadController.getRelatedFilesByRecordId';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation';
import getDoctorsLogin from '@salesforce/apex/HospitalApexFour.getDoctorsLogin';
import getHospitalPatientDoctor from '@salesforce/apex/HospitalApexFour.getHospitalPatientDoctor';
import DoctorAppointmentLogo from '@salesforce/resourceUrl/DoctorAppointmentLogo'
import HP_OBJECT from '@salesforce/schema/Hospital_Patient__c';
import HP_TEST from '@salesforce/schema/Hospital_Patient__c.Test_Name__c';
import HP_VAR from '@salesforce/schema/Hospital_Patient__c.Variable__c';
import HP_ID from '@salesforce/schema/Hospital_Patient__c.Id';
export default class HospitalDoctorNavigation extends NavigationMixin(LightningElement) {
    doctorappointmentlogo=DoctorAppointmentLogo
    @track showLoading = false;
pdfFileShow=false
fileRecordId
fields={
   // testByField:HP_TESTBY,
    testField:HP_TEST
}

//Id,Name,Fee__c,Doctor_Type__c,Image__c,Patient_Name__c FROM Hospital_Doctor__c
@api doctorProfile
docId
doctorAppoinments=[]
@wire(getHospitalPatientDoctor,{patientDoctorId:'$doctorProfile.Id'})
wiredPatientDoctor({data,error}){
    if(data){
console.log('doc login',data)
this.doctorAppoinments=data

    }
    if(error){
        console.error(error)
    }
}
editShow=false
recordEditHandler(event){
   
    this.doctorAppoinments.filter(d=>{
        if(d.Id===event.target.name){
            this.editShow=true
            this.recordId=event.target.name
        }
    })
    }
    closeHandler(){
        this.editShow=false
    }
showAppHistory=false
showDashboard=true
appHistoryHandler(){
   
    if( this.showAppHistory===false){
        if(this.showDashboard===true){
            this.template.querySelector(".apphistorybtn").classList.toggle("myAppHistory")
            this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
            this.showDashboard=false
            this.showAppHistory=true
        }       
    }
    else{
        this.showAppHistory=false
        this.showDashboard=true
        this.template.querySelector(".apphistorybtn").classList.toggle("myAppHistory")
        this.template.querySelector(".dashboardbtn").classList.toggle("myDashboard")
    }
}


columns=[{label:'Name',fieldName:"Name"},{label:"Contact",fieldName:"Phone__c"},
{label:"Email",fieldName:"Email__c"},{label:"Current Status",fieldName:"Cancelled_By__c"}
, { type: "button", typeAttributes: {  
    label: {fieldName:"cancellabelName"},  
    name: 'Edit',  
    title: 'Edit',  
    disabled: {fieldName:"buttonDisable"},  
    value: 'edit', 
    iconName: {fieldName:"cancelIconName"}, 
    iconPosition: 'left'  
} }, { type: "button", typeAttributes: {  
    label:"Files",  
    name: 'View',  
    title: 'View',  
    disabled: false,  
    value: 'view', 
    iconName:'utility:file', 
    iconPosition: 'left'  
} } ]
doctorAppoinment=[]
doctorRefreshAppointment
@wire(getHospitalPatientDoctor,{patientDoctorId:'$doctorProfile.Id'})
wiredPatientDoctors(result){
this.doctorRefreshAppointment=result
    if(result.data){
console.log('doc login',result.data)
this.doctorAppoinment=result.data.map((record)=>{
    let cancellabelName=record.Cancelled_By__c==='Active'?'Cancel':'Cancelled';
    let cancelIconName=record.Cancelled_By__c==='Active'?'standard:record_update':'standard:question_feed';
    let buttonDisable=record.Cancelled_By__c==='Active'? false: true ;
    return{
      ...record,
        cancellabelName:cancellabelName,
        cancelIconName:cancelIconName,
        buttonDisable:buttonDisable
    }
})

    }
if(result.error){
    console.error(error)
}
}
callRowAction( event ) {  
          
    const recId =  event.detail.row.Id;
    console.log( 'call Row',recId,event.detail.row.Doctor_Name__c)  
  //  const actionName = event.detail.action.name; 
  const actionName = event.detail.action.name;  
  if ( actionName === 'Edit' ) {  
  
    if (recId) {
        console.log('kkkkkkkkkkkkkkkkkk')
        this.showLoading = true;
        // Create the recordInput object
        const fields = {};
        fields[HP_ID.fieldApiName] = recId;
        fields[HP_VAR.fieldApiName] =event.detail.row.Doctor_Name__c
        const recordInput = { fields };
        console.log(recordInput);
        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success!!', 'Patient Record updated successfully!!', 'success', 'dismissable');
                // Display fresh data in the form
                this.showLoading = false;
            refreshApex(this.doctorRefreshAppointment )    
            
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
}
else if ( actionName === 'View') {
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
closePreviewHandler(){
    this.pdfFileShow=false
}
}
