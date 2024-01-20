import { LightningElement , wire } from 'lwc';
import patientAdmin from '@salesforce/apex/HospitalApex.patientAdmin';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 const columns = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone' },
    {type:'action',
typeAttributes:{
    rowActions:actions,
    menuAlignment:'right'
}}
   ];
   const actions=[
    {label:'Delete' , name:'delete'},
    {label:'View' , name:'view'}
   ]
export default class HospitalAdmin extends NavigationMixin(LightningElement) {
    columns=columns
    adminHospitalData
    recordId
    @wire(patientAdmin)
    adminwired({data,error}){
       if(data){
       this.adminHospitalData=data
        console.log('admin',data)
       }
       if(error){
        console.error(error)
       }
    }
/*deleteHandler(){
    deleteRecord(this.recordId).then(()=>{
        console.log('admin delete')
    })
}*/
handleRowActions(event){
    const actionName=event.detail.action.name
    const row=event.detail.row
    this.recordId=row.Id
    switch(actionName){
        case 'view':
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId:row.Id,
                    actionName:'view'
                }
            });
            break;
            case 'delete':
                deleteRecord(row.Id).then(()=>{
                    console.log('admin delete')
                })
    }
}

}