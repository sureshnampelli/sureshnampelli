import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_Field from '@salesforce/schema/Account.Phone';
import Industry_Field from '@salesforce/schema/Account.Industry';
import Type from '@salesforce/schema/Account.Type';
export default class CreateRecordDemo extends LightningElement {
formFields={
    Name:'',
    Phone:'',
    Industry:'',
    Type:''
}
changeHandler(event){
    const { value,name }=event.target
    this.formFields={...this.formFields , [name]:value}
    console.log('@@@@@@@@@@@@@@@',this.formFields.Name)
}
handleSave(){
    const fields={}
    fields[NAME_FIELD.fieldApiName]=this.formFields.Name
    fields[Phone_Field.fieldApiName]=this.formFields.Phone
    fields[Industry_Field.fieldApiName]=this.formFields.Industry
    fields[Type.fieldApiName]=this.formFields.Type
    let recordInput={apiName:ACCOUNT_OBJECT.objectApiName,fields}
    createRecord(recordInput).then(result=>{
        this.formFields={}
console.log('Account created ID',JSON.stringify(result.id))
    }).catch(error=>(console.error(error)))
}
}