import { LightningElement ,wire } from 'lwc';
import {getListUi} from 'lightning/uiListApi'
import HOS_NAME from '@salesforce/schema/Hospital_Lab__c.Name'
import HOS_Id from '@salesforce/schema/Hospital_Lab__c.Id'
import ENQID from '@salesforce/schema/Hospital_Lab__c.Lab__c'
import {getRecord ,getFieldValue} from 'lightning/uiListApi'
import ENQUIRY from '@salesforce/schema/Enquiry__c'
export default class HospitalLabRecord extends LightningElement {

    @wire(getListUi,{objectApiName:ENQUIRY,listViewApiName:'All',childObjectApiName: 'Hospital_Lab__c',
     relationshipName: 'Hospital_Labs__r'})
    listViewHandler({data,error}){
        if(data){
console.log('Lab Record kj',data)
console.log('IDmm' ,data.records.records[1].id)}}

@wire(getRecord,{recordId:'$recordId',fields:[HOS_NAME,HOS_Id,ENQID]})
acccountHand({data}){
    if(data){
console.log('log' ,data)
    }
}
}