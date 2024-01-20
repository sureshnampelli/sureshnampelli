import { LightningElement ,wire,api } from 'lwc';
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import apexLow from '@salesforce/resourceUrl/apexBottom';
import patientAdmin from '@salesforce/apex/HospitalApex.patientAdmin';
import hospitalLab from '@salesforce/apex/HospitalApex.hospitalLab';
import bloodTest from '@salesforce/apex/HospitalApex.bloodTest';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
export default class HospitalLab extends NavigationMixin(LightningElement) {
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
       pdfShowOne=false
       pdfShow=false
       labShow=true
       transfor
       val
recordOne
       admin
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
       @wire(patientAdmin)
       adminwired({data,error}){
          if(data){
          this.admin=data
          
          data.forEach(item=>{
    
            console.log('admin' , item.Id)
          })
    
          }
          if(error){
           console.error(error)
          }
       }
       labPdf
       labedPdf
@wire(hospitalLab)
labAdmin({data,error}){
    if(data){
this.labPdf=data

console.log('labed',data)
    }
    if(error){
        console.error(error)
    }
}
bloodPdf
bloodedPdf
@wire(bloodTest)
wiredBlood({data,error}){
    if(data){
        this.bloodPdf=data
    }
    if(error){
        console.error(error)
    }
}

       handleRowActions(event){
        const actionName=event.detail.action.name;
        const row=event.detail.row;
        this.recordOne=row.Full_Name__c
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
                    case 'lipid': this.filterHandler(row.Patient_Id__c)  //this.filteredHandler(row.Id) 
                    break;
                    case 'blood':this.filteredHandler(row.Patient_Id__c)
        }
    }
    
   /* testName
    testLab
    handlTest(){
        console.log('king')
        this.admin.forEach(item=>{
            this.testName=item.Full_Name__c
        })
        this.labPdf.forEach(item=>{
this.testLab=item.Full_Name__c
console.log(item.Full_Name__c)
        })
        if(this.testLab===this.testName){
            console.log('test' ,'test Success')
        }
    } 
*/
   filterHandler(data){
this.labedPdf=this.labPdf.filter(eachObj=>{
    
    if(data===eachObj.Patient_Id__c ){
        console.log('same to u','wish u the same')
     this.val=eachObj.Patient_Id__c
return eachObj
        console.log('apple Filter',eachObj)
    }
  
})
setTimeout(() => {
    this.labShow=false
    this.pdfShow=true 
}, 500);

    }

    filteredHandler(data){
        this.bloodedPdf=this.bloodPdf.filter(eachObj=>{
            
            if(data===eachObj.Patient_Id__c ){
                console.log('same to u','wish u the same')
             this.val=eachObj.Patient_Id__c
        return eachObj
                console.log('apple Filter',eachObj)
            }
          
        })
        setTimeout(() => {
            this.labShow=false
            this.pdfShowOne=true 
        }, 500);
        
            }
    closeHandler(){
        this.pdfShow=false
        this.labShow=true
        this.pdfShowOne=false

    }

    navigateToLwcLogin(){
    
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
            }
        })             
    }

    pdfHandler(){
        
        let content=this.template.querySelector('.container')
        console.log(content.outerHTML)
        //Hospital_Account__c (Attachment Cost(a065j00000NssHuAAJ) Id)
        generatePDF({recordId:"a065j00000NssHuAAJ", htmlData:content.outerHTML }).then(result=>{
            console.log('attachment id',result)
            console.log('record',this.recordId)
            window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='a045j00000Mz7H4AAJ'`)
        }).catch(error=>{
            console.error(error)
        })
            }
}