import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi'
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateRecord extends LightningElement {
    formFields={}
    changeHandler(event){
        const {name ,value}=event.target
this.formFields[name]=value
window.localStorage.setItem('store', this.formFields[name]=value)
    }
    get stored(){
        return window.localStorage.getItem('store')
    }
createContact(){
    const recordInput={apiName:CONTACT_OBJECT.objectApiName,fields:this.formFields}
    createRecord(recordInput).then(result=>{
        this.showToast('Success!!','contact created with is ${result.id}')
        this.template.querySelecter('form.createForm').reset()
        this.formFields={}

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
}