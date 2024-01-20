import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import LOGIN_OBJECT from '@salesforce/schema/Login__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class LoginSignUpDemo extends LightningElement {
    formFields={}
    changeHandler(event){
const {name, value}=event.target
this.formFields[name]=value
    }
    createSignUp(){
        const recordInput={apiName:LOGIN_OBJECT.objectApiName,fields:this.formFields}
    createRecord(recordInput).then(result=>{
       
        this.formFields={}
        setTimeout(() => {
            this.showToast('Success!!','contact created with is ${result.id}')
            
            this.closeHandler()   
        }, 1000);

    }).catch(error=>{
        this.showToast('Error Creating record ', 'error.body.message','error')
    })
   
   
    }

    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant:variant || 'success'
        }))
    }

    closeHandler(){
        const myEvent=new CustomEvent('closed')
        this.dispatchEvent(myEvent)
    }

}