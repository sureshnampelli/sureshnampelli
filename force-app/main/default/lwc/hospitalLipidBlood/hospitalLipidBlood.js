import { LightningElement,wire,api } from 'lwc';
import hospitalLabEnquiry from '@salesforce/apex/HospitalApex.hospitalLabEnquiry';
export default class HospitalLipidBlood extends LightningElement {
    lipidPdf
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
            {label:'Show' , name:'show'}
           ]
    },}
       ];
    @wire(hospitalLabEnquiry)
    wiredHospitalLab({data,error}){
        if(data){
            this.lipidPdf=data
            console.log('wiredHospitalLab',this.lipidPdf)
          console.log('lkjhg',data[1].Hospital_Labs__r[0])
    
        }
        if(error){
            console.error(error)
        }
    }
    lipidProfile
    changeHandler(){
        this.lipidPdf[1].Hospital_Labs__r[0]
        this.lipidPdf.forEach(item=>{
           this.lipidProfile=item.Hospital_Labs__r[0] 
        })
        console.log(this.lipidPdf[0].Hospital_Labs__r[0])
        console.log(this.lipidProfile)
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
                    case 'show': this.filterHandler(row.Id)  //this.filteredHandler(row.Id) 
                    break;
        }
    }
    pdfLipid=[]
    filterHandler(data){
        console.log(data)
        this.lipidPdf.filter(eachObj=>{
            if(data===eachObj.Hospital_Labs__r[0].Lab__c){

                this.pdfLipid= eachObj.Hospital_Labs__r[0]
                console.log('jhgfdg',this.pdfLipid)
             }
        })
            
    }
    }

