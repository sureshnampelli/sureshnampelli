import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
 
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetPicklistDemo extends LightningElement {
    picklistvalue
    @wire(getObjectInfo, {objectApiName:ACCOUNT_OBJECT})
    objectInfo

@wire(getPicklistValues , {recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD} )
IndustryPicklistValues

handleChange(event){
    this.picklistvalue=event.target.value;
}
}