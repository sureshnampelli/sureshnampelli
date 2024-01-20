import { LightningElement ,api } from 'lwc';
import ENQUIRY_OBJECT from '@salesforce/schema/Enquiry__c'
import FIRSTNAME from '@salesforce/schema/Enquiry__c.First_Name__c'
import LASTNAME from '@salesforce/schema/Enquiry__c.Last_Name__c'
import PHONE from '@salesforce/schema/Enquiry__c.Phone__c'
import EMAIL from '@salesforce/schema/Enquiry__c.Email__c'
import AGE from '@salesforce/schema/Enquiry__c.Age__c'
import GENDER from '@salesforce/schema/Enquiry__c.Gender__c'
import PATIENTTYPE from '@salesforce/schema/Enquiry__c.Patient_Type__c'
import { NavigationMixin } from 'lightning/navigation'
import {ShowToastEvent} from'lightning/platformShowToastEvent'
export default class HospitalEnquiryForm extends LightningElement {
@api recordId
@api objectApiName
objectName=ENQUIRY_OBJECT
fieldList=[FIRSTNAME,LASTNAME ,AGE,GENDER,PHONE ,EMAIL,PATIENTTYPE]


successHandler(event){
    const toastEvent=new ShowToastEvent({
        title:"Record Created",
        message:"Record ID:"+event.detail.Id,
        variant:"Success"
    })
    this.dispatchEvent(toastEvent)
    
}
closeHandler(){
    const myEvent=new CustomEvent('close')
    this.dispatchEvent(myEvent)
}

}