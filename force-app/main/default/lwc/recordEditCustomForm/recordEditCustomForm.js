import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class RecordEditCustomForm extends LightningElement {
    objectName=ACCOUNT_OBJECT 
    inputValue=''
    handleChange(event){
this.inputValue=event.target.value
    }
    handleSubmit(event){
        event.preventDefault();
        const inputCmp=this.template.querySelector('lightning-input')
        const value=inputCmp.value
        if(!value.includes('ABC')){
            inputCmp.setCustomValidity("The Master Name must includes'ABC'")
        }else {
            inputCmp.setCustomValidity("")
            const fields=event.detail.fields
            fields.Name=value
            this.template.querySelector('lightning-record-edit-form').submit(fields)
        }
        inputCmp.reportValidity()

    }
    successHandler(event){
 const toastEvent=new ShowToastEvent({
    title:"Record Created",
    message:"Record Id:"+event.detail.id,
    variant:"success"
})
this.dispatchEvent(toastEvent)
    }
    handleError(event){
        const toastEvent=new ShowToastEvent({
           title:" Error Record Created",
           message:event.detail.message,
           variant:"error"
       })
       this.dispatchEvent(toastEvent)
           }
}