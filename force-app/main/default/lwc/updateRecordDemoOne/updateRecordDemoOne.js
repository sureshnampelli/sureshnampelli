import { LightningElement ,track,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getSingleAccount from '@salesforce/apex/AccountDataController.getSingleAccount';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import ID_FIELD from '@salesforce/schema/Account.Id';
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
import LOGIN_ID from '@salesforce/schema/Login__c.Id'
import LOGIN_STATUS from '@salesforce/schema/Login__c.Status_Pro__c'
export default class UpdateRecordDemoOne extends LightningElement {
  
 disabled = false;
    @track error;
    @track showLoading = false;
    @wire(getSingleAccount)
    account;
    handleChange(event) {
        // Display field-level errors and disable button if a name field is empty.
        if (!event.target.value) {
            event.target.reportValidity();
            this.disabled = true;
        }
        else {
            this.disabled = false;
        }
    }
    handleUpdate() {   
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if (allValid) {
            this.showLoading = true;
            
            // Create the recordInput object
            const fields = {};
            fields[ID_FIELD.fieldApiName] = this.account.data.Id;
            fields[NAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='Name']").value;
            fields[RATING_FIELD.fieldApiName] = this.template.querySelector("[data-field='Rating']").value;
            const recordInput = { fields };
            console.log(recordInput);
            updateRecord(recordInput)
                .then(() => {
                    this.showToast('Success!!', 'Account updated successfully!!', 'success', 'dismissable');
                    // Display fresh data in the form
                    this.showLoading = false;
                    return refreshApex(this.account);
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
    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

    columns = [
      
        { label: 'Full Name', fieldName: 'Full_Name__c' },{ label: 'Status', fieldName: 'Status_Pro__c' },]


    loginRecordsData
loginRecordsOne
loginRecordsDataOneTwo
@wire(loginRecords)
wiredLoginRecords(result){
    this.loginRecordsOne=result.data
    console.log('resOne',this.loginRecordsOne)
    this.loginRecordsDataOneTwo=result
    if(result.error){
        console.error(error)
    }
}


selectCheckBoxHandler(){
    var selectedRecords =
      this.template.querySelector("lightning-datatable").getSelectedRows();  
      console.log('rows',selectedRecords)
      selectedRecords.filter(pre=>{
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
      if(selectedRecords){}
     /* deleteEnquiry({enquiryList: selectedRecords})  
     .then(result=>{  
       return refreshApex(this.loginRecordsDataOneTwo);  
     })  
     .catch(error=>{  
       alert('Cloud not delete'+JSON.stringify(error));  
     })  */

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
    await refreshApex(this.loginRecordsDataOneTwo);
}
}