import { LightningElement ,wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi'
import Id from '@salesforce/user/Id'
import NAME_FIELD from '@salesforce/schema/User.Name'
import EMAIL_FIELD from '@salesforce/schema/User.Email'
const fields=[NAME_FIELD,EMAIL_FIELD]
export default class WireDemoUserDetails extends LightningElement {
    userId=Id
    userDetail

    //0055j000009tgG2AAI

   // @wire(adapter , {adapeterConfig})
    //propertyorFunction
@wire(getRecord, {recordId:`$userId` , fields})
userDetailHandler({data,error}){
    if(data){
this.userDetail=data.fields
console.log('@###############',data.fields)
    }
    if(error){
console.error('#############', error)
    }
}

}