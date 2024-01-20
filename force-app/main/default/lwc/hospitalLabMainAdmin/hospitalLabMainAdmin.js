import { LightningElement ,api,wire} from 'lwc';
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import apexLow from '@salesforce/resourceUrl/apexBottom';
import patientAdmin from '@salesforce/apex/HospitalApex.patientAdmin';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class HospitalLabMainAdmin extends NavigationMixin(LightningElement) {
    hospitalRemovebg=hospitalremovebg
    apexlow=apexLow
    @api staffUserName
        @api staffImage
     @api staffJobRole
 @api recordId
    columns = [
        { label: 'First Name', fieldName: 'First_Name__c' },
        { label: 'Full Name', fieldName: 'Full_Name__c' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone__c', type: 'phone' },
        {label:'Email',fieldName:'Email__c',type:'email'},
        {label:'Action' ,type:'action',initialWidth:'50px',
    typeAttributes:{
        rowActions:[
            {label:'Edit' , name:'edit'},
            {label:'Delete',name:'delete'},
            {label:'Lipid' , name:'lipid'},
            {label:'Blood' , name:'blood'}
           ]
    },}
       ];
       toggleIconName = '';toggleButtonLabel 
       
      
       get popvover(){
           return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
        }
        handleToggleClick() {
            // retrieve the classList from the specific element
            const contentBlockClasslist = this.template.querySelector(
                '.ImageStaff'
            ).classList;
            // toggle the hidden class
            contentBlockClasslist.toggle('slds-rise-from-ground');
        
            // if the current icon-name is `utility:preview` then change it to `utility:hide`
            if (this.toggleIconName === 'preview') {
                this.toggleIconName = '';
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
            }else {
                this.toggleIconName = 'preview';
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
            }
        }

        admin
       @wire(patientAdmin)
       adminwired({data,error}){
          if(data){
          this.admin=data
          }
          if(error){
           console.error(error)
          }
       }

       handleRowActions(event){
        const actionName=event.detail.action.name;
        const row=event.detail.row;
       // this.recordOne=row.Full_Name__c
        console.log('full',row.Full_Name__c)
        console.log('IDD' ,row.Id )
        switch(actionName){
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type:'standard__recordPage',
                    attributes:{
                        recordId:row.Id,
                        objectApiName:'Enquiry__c',
                        relationshipName: 'Hospital_Labs__r',
                        actionName:'view'
                    }
                })

                break;
                case 'delete':
                    deleteRecord(row.Id).then(()=>{
                        console.log('admin delete')                        
                    });
                    break;
                    case 'lipid': this.childLipid(row.Id)  //this.filteredHandler(row.Id) 
                    break;
                    case 'blood':this.childBlood(row.Id)
        }
    }

    lipidData
    lipidShow=false
childLipid(data){
this.lipidData=data
this.lipidShow=true
}


    navigateToLwcLogin(){
    
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
            }
        })             
    }
}