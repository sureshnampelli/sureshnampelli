import { LightningElement,wire } from 'lwc';
import getAdmin from '@salesforce/apex/AzCompanyController.getAdmin';
import getAzChat from '@salesforce/apex/AzCompanyController.getAzChat';
import createAzChat from '@salesforce/apex/AzCompanyController.createAzChat';
import AZADMIN_ID from '@salesforce/schema/Az_Admin__c.Id'
import AZADMIN_TOOGLE from '@salesforce/schema/Az_Admin__c.Toogle__c'
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns=[ 
    {
       label:"Name", fieldName:"toogleName",
     type:"customLink",typeAttributes:{
         toogleLink:{ fieldName:"toogleLink" },
         toogleEmail:{fieldName:"toogleEmail"},
         tooglePhone:{fieldName:"tooglePhone"},
         toogleImage:{fieldName:"toogleImage"}
      } }
    ]
    
export default class AzAdminShiftHome extends LightningElement {
  columns= columns
    logins=[]
    adminRefreshData=[]
    chatData=[]
    chatRefreshData=[]
    @wire(getAzChat)
    wiredChat(result){
        this.chatRefreshData=result
        if(result.data){
this.chatData=result.data
        }
        if(result.error){

        }
    }
    inputNameChat
    chatInputHandler(event){
this.inputNameChat=event.target.value
    }
    chatOutHandler(){
        const chat={
            Name:this.inputNameChat
        }
        createAzChat({createChat:chat}).then(result=>{
            refreshApex(this.chatRefreshData)
        })
    }
    connectedCallback(){
        setInterval(() => {
            refreshApex(this.chatRefreshData)  
        }, 1000);
    }
    @wire(getAdmin)
wiredLogin(result){
    this.adminRefreshData=result
    if(result.data){
      //  console.log('custom',result.data)
       // this.logins=data
       this.logins=result.data.map((record)=>{
       // let loginLink="/" + record.Id;
      // let loginName =record.Name;
       // let statusPro=record.Status_Pro__c === 'Present'?PresentLogo:AbsentLogo
       // let toogleIcon=record.Status__c==='Present'?PresentLogo:AbsentLogo
      let toogleLink =record.Toogle__c==="YES"?record.Full_Name__c:""
      let toogleImage=record.Toogle__c==="YES"?record.Image__c:""
      let tooglePhone=record.Toogle__c==="YES"?record.Phone__c:""
      let toogleEmail=record.Toogle__c==="YES"?record.Email__c:""
      let toogleName = record.Toogle__c==="YES"?"":record.Name
    
        return {
            ...record,
           // loginLink:loginLink,
            
          // loginName:loginName ,
          //  rankIcon:rankIcon,
           // statusPro:statusPro,
            toogleLink:toogleLink,
           toogleName:toogleName,
           toogleImage:toogleImage,
           tooglePhone:tooglePhone,
           toogleEmail:toogleEmail
         // toogleIcon:toogleIcon
        }
       })

    }if(result.error){
        console.error(error)
    }
}
selectCheck=[]
arr
getSelectedRow(){
    
    this.selectCheck=this.template.querySelector("c-az-custom-data-table").getSelectedRows()
    if(this.selectCheck.length===1){
        console.log('ifcheck')
        this.arr=this.selectCheck[0].Id
        if(this.selectCheck[0].Toogle__c==="No"){
            const fields = {};
            fields[AZADMIN_ID.fieldApiName] =this.selectCheck[0].Id;
            fields[AZADMIN_TOOGLE.fieldApiName] ="YES"
            const recordInput = { fields };
            console.log(recordInput);
            updateRecord(recordInput)
                .then(() => { 
                        refreshApex(this.adminRefreshData )     
                })
                }
    }else{
        console.log('a',this.arr)
        const fields = {};
        fields[AZADMIN_ID.fieldApiName] =this.arr
        console.log('b')
        fields[AZADMIN_TOOGLE.fieldApiName] ="No"
        const recordInput = { fields };
        console.log(recordInput);
        updateRecord(recordInput)
            .then(() => { 
                    refreshApex(this.adminRefreshData )      
            })
        console.log('elseChecked')
    }
   
  /*  var selectedRecords=this.template.querySelector("c-az-custom-data-table").getSelectedRows(); 
console.log('kkkkllll',JSON.stringify(selectedRecords))
    if(selectedRecords[0].Toogle__c==="No"){
    const fields = {};
    fields[AZADMIN_ID.fieldApiName] =selectedRecords[0].Id;
    fields[AZADMIN_TOOGLE.fieldApiName] ="YES"
    const recordInput = { fields };
    console.log(recordInput);
    updateRecord(recordInput)
        .then(() => { 
                refreshApex(this.adminRefreshData )     
        })
        }
        if(selectedRecords[0].Toogle__c==="YES"){
            console.log('a')
            const fields = {};
            fields[AZADMIN_ID.fieldApiName] =selectedRecords[0].Id
            console.log('b')
            fields[AZADMIN_TOOGLE.fieldApiName] ="No"
            const recordInput = { fields };
            console.log(recordInput);
            updateRecord(recordInput)
                .then(() => { 
                        refreshApex(this.adminRefreshData )      
                })
                }*/
            }
}

