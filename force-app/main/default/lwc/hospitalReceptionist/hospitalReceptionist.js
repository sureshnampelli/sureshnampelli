import { LightningElement , wire,api,track} from 'lwc';
import patientType from '@salesforce/apex/HospitalApex.typePatient';
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';

import loginSearch from '@salesforce/apex/LoginApex.loginSearch';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import deleteEnquiry from '@salesforce/apex/HospitalApex.deleteEnquiry';
import { NavigationMixin } from 'lightning/navigation'
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import LoginFingerRemovebg from '@salesforce/resourceUrl/LoginFingerBlack'
import LOGIN_ID from '@salesforce/schema/Login__c.Id'
import LOGIN_STATUS from '@salesforce/schema/Login__c.Status_Pro__c'
import {loadStyle} from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'
export default class HospitalReceptionist extends NavigationMixin(LightningElement) {
    hospitalRemovebg=hospitalremovebg
    Loginfingerremovebg=LoginFingerRemovebg
    //User_Name__c ,Full_Name__c,Login_Time__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c
    headings=["Full Name","Profession", "Status","Picture"]
   @api staffUserName
   @api staffImage
   @api staffJobRole
   saveDraftValues = [];
   toggleIconName = '';toggleButtonLabel 
  toggledropdownlabel
  @track error;
  @track showLoading = false;
  isCssLoaded = false
  renderedCallback(){ 
    if(this.isCssLoaded) return
    this.isCssLoaded = true
    loadStyle(this, COLORS).then(()=>{
        console.log("Loaded Successfully")
    }).catch(error=>{ 
        console.error("Error in loading the colors")
    })
}

 get dropDown(){
    return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
 }
   get popvover(){
       return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
    }
    handleToggleClick() {
        // retrieve the classList from the specific element
        const contentBlockClasslist = this.template.querySelector(
            '.ImageStaff'
        ).classList;
        // toggle the hidden class
        contentBlockClasslist.toggle('slds-rise-from-ground');
    
        // if the current icon-name is `utility:preview` then change it to `utility:hide`
        if (this.toggleIconName === 'preview') {
            this.toggleIconName = '';
           this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click ";
            this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
        }else {
            this.toggleIconName = 'preview';
             this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open";
            this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
        }
    }


    toggleAttName=''
    handleAttClick() {
        // retrieve the classList from the specific element
        const contentBlockClasslist = this.template.querySelector(
            '.finterAttand'
        ).classList;
        // toggle the hidden class
        contentBlockClasslist.toggle('slds-rise-from-ground');
    
        // if the current icon-name is `utility:preview` then change it to `utility:hide`
        if (this.toggleAttName === 'preview') {
            this.toggleAttName = '';
         this.presentCheckBoxHandler()
        }else {
            this.toggleAttName = 'preview';
            
        }
    }
    showModal=false
    clickHandler(){
        this.showModal=true
    }

    closeHandler(){
        this.showModal=false
    }

    columnsOne = [
        { label: 'In Out', fieldName: 'In_Or_Out__c', editable: true, },
        { label: 'Name', fieldName: 'Full_Name__c' },
    ]
    columns = [
        { label: 'First Name', fieldName: 'First_Name__c' },
        { label: 'Last Name', fieldName: 'Last_Name__c' },
        { label: 'Phone', fieldName: 'Phone__c', type: 'phone ' ,editable: true },
        { label: 'Email', fieldName: 'Email__c', type: 'email',editable: true },
       ]
 
      
    selectedType=''
patientData
@wire(patientType, {type:'$selectedType'})
filteredEnquiry(result){
    this.patientData=result;
    if(result.error){
        this.patientData=undefined;
    }
}
get typePatient(){
    return [
        
        {label:"InPatient" ,value:"InPatient"},
        {label:"OutPatient" ,value:"OutPatient"}
    ]
}
typeHandler(event){
    this.selectedType=event.target.value
}

selectedJobType=""
selectedStatusType=""
loginRecordsTwo=[]
showLoginData=[]
/*@wire(loginSearch,{typed:'$selectedJobType', statusPro:'$selectedStatusType'})
loginHandleTwooo(result){
    this.loginRecordsTwo=result
    this.showLoginData=result
    this.loginRecordsData=Array.isArray(this.showLoginData) ? this.loginRecordsTwo:this.loginRecordsDataOneTwo
    if(result.error){
        console.error(error)
    }
}*/
 
@wire(loginSearch,{typed:'$selectedJobType', statusPro:'$selectedStatusType'})
loginHandlerOne({data,error}){
if(data){
    this.loginRecordsTwo=data
console.log('log',data)
/*if(this.loginRecordsTwo.length===0){
this.loginRecordsData=this.loginRecordsDataOneTwo.data
}
if(this.loginRecordsTwo.length>=1){
    this.loginRecordsData=this.loginRecordsTwo
}*/}
if(error){
    console.error(error)
}}


get typeJob(){
    return [
        {label:"All" ,value:""},
        {label:"Doctor" ,value:"Doctor"},
        {label:"Pharmacist" ,value:"Pharmacist"},
        {label:"LabAssistant" ,value:"LabAssistant"},
        {label:"Receptionist" ,value:"Receptionist"},
        {label:"Nurse" ,value:"Nurse"},
        {label:"Management" ,value:"Management"},

    ]
}
typeJobHandler(event){
    this.selectedJobType=event.target.value
}

get typeStatus(){
    return [
        
        {label:"Present" ,value:"Present"},
        {label:"Absent" ,value:"Absent"},]
}

typeStatusHandler(event){
    this.selectedStatusType=event.target.value
}

handleCheckboxPresent(event){
    this.checkedThree=event.target.name
}


/*@wire(loginRecords)
wiredRecordsLogins({data,error}){
if(data){
    this.loginRecordsDataOneTwoThree=data
}if(error){
    console.error(error)
}
}*/

 
loginRecordsData
loginRecordsOne
loginRecordsDataOneTwo
loginRecordsDataOneTwoThree
@wire(loginRecords)
wiredLoginRecords(result){
    this.loginRecordsOne=result.data
    this.loginRecordsDataOneTwo=result
   
  
    if(result.error){
        console.error(error)
    }
}
columnsTable = [{ label: 'Full Name', fieldName: 'Full_Name__c',cellAttributes:{
    class:{fieldName:'FullNameColor'}
} },
{ label: 'Status', fieldName: 'Status_Pro__c',cellAttributes:{
    class:{fieldName:'statusColor'},
    iconName:{fieldName:'iconName'}, iconPosition:'right' }}]

presentCheckBoxHandler(){
    console.log('rrrrrrrrr')
    var selectedRecord =
      this.template.querySelector("lightning-datatable").getSelectedRows();  
      console.log('rows',selectedRecord)
      selectedRecord.filter(pre=>{
        if(pre.Status_Pro__c==='Present'){
            this.showLoading = true;
console.log('present',pre)

const fields = {};
fields[LOGIN_ID.fieldApiName] = pre.Id;
fields[LOGIN_STATUS.fieldApiName] ='Absent';

const recordInput = { fields };
console.log(recordInput);
updateRecord(recordInput)
.then(() => {
    this.showToast('Success!!', 'Att updated successfully!!', 'success', 'dismissable');
    // Display fresh data in the form
    this.showLoading = false;
    return refreshApex(this.loginRecordsDataOneTwo);
})
.catch(error => {
    this.showLoading = false;
    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
});
        }if(pre.Status_Pro__c==='Absent'){
            this.showLoading = true;
            console.log('Absent',pre)
            const fields = {};
fields[LOGIN_ID.fieldApiName] = pre.Id;
fields[LOGIN_STATUS.fieldApiName] ='Present';

const recordInput = { fields };
console.log(recordInput);
updateRecord(recordInput)
.then(() => {
    this.showToast('Success!!', 'Att updated successfully!!', 'success', 'dismissable');
    // Display fresh data in the form
    this.showLoading = false;
    return refreshApex(this.loginRecordsDataOneTwo);
})
.catch(error => {
    this.showLoading = false;
    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
});
        }
      })
      

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


async refresh() {
    await refreshApex(this.loginRecordsDataOneTwo);
}

selectCheckBoxHandler(){
    var selectedRecords =  
      this.template.querySelector("lightning-datatable").getSelectedRows();  
      console.log('rows',selectedRecords)
      deleteEnquiry({enquiryList: selectedRecords})  
     .then(result=>{  
       return refreshApex(this.patientData);  
     })  
     .catch(error=>{  
       alert('Cloud not delete'+JSON.stringify(error));  
     })  

}



handleSave(event) {
    this.saveDraftValues = event.detail.draftValues;
    const recordInputs = this.saveDraftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });

    // Updateing the records using the UiRecordAPi
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(res => {
        this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
        this.saveDraftValues = [];
        return this.refresh();
    }).catch(error => {
        this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
    }).finally(() => {
        this.saveDraftValues = [];
    });
}

ShowToast(title, message, variant, mode){
    const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
}

// This function is used to refresh the table once data updated
async refresh() {
    await refreshApex(this.patientData);
}


handleSubmit(event){
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    this.template.querySelectorAll('lightning-record-edit-form').submit(fields);
 }

navigateToLwcLogin(){
    
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
        }
    })             
}



currentTime=''
connectedCallback(){
    this.currentTimeHandler()
   
}

// Method to update the current time every second.
currentTimeHandler(){

    setInterval(()=>{
    
    // These are used for getting the current time
    let dateTime=new Date()
    let hours=dateTime.getHours()
    let minutes=dateTime.getMinutes()
    let seconds=dateTime.getSeconds()

    // used for the meridian
    let ampm="AM"

    // If the hour is equal to 0, it means that it's 12:00 midnight
    // Therefore, assign the hours to 12 instead of 0
    if(hours==0){
        hours=12
    }

    // If hours is greater than or equal to 12, it means that it's in the afternoon or evening
    else if(hours>=12){
        hours=hours-12
        ampm="PM"
    }

    // Adding a zero in front of hours, minutes, and seconds if the value is less than 10
    hours=hours<10 ? "0"+hours :hours
    minutes=minutes<10  ? "0"+minutes :minutes
    seconds=seconds<10 ? "0"+seconds: seconds

     // Setting the currentTime property with the current time and meridian
    this.currentTime=`${hours}:${minutes}:${seconds} ${ampm}`

    // Checking if the current time matches the alarm time
   
    },1000) // Running the function every 1 second
    
}


}