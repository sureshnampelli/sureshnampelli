import { LightningElement ,wire} from 'lwc';
import patientAdmin from '@salesforce/apex/HospitalApex.patientAdmin';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class HospitalAdminMain extends NavigationMixin(LightningElement) {
    columns = [
        { label: 'First Name', fieldName: 'First_Name__c' },
        { label: 'Full Name', fieldName: 'Full_Name__c' },
        { label: 'Phone', fieldName: 'Phone__c', type: 'phone' },
        {label:'Action' ,type:'action',initialWidth:'50px',
    typeAttributes:{
        rowActions:[
            {label:'View' , name:'view'},
            {label:'Delete',name:'delete'}
           ]
    },}
       ];
    
       admin
       @wire(patientAdmin)
       adminwired({data,error}){
          if(data){
          this.admin=data
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
       const actionName=event.detail.action.name;
       const row=event.detail.row;
      /* this.recordId=row.Id;*/
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
                   });
                   break;
       }
   }
   
   }