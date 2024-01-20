import { LightningElement ,wire,api} from 'lwc';
import getAllotedMedcine from '@salesforce/apex/HospitalAllotedMedicineController.getAllotedMedcine';
import getDailyMedicine from '@salesforce/apex/HospitalAllotedMedicineController.getDailyMedicine';
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
import uploadFile from '@salesforce/apex/FileUploadClass.uploadFile'
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import Hospitalgifcompressor from '@salesforce/resourceUrl/Hospitalgifcompressor'
import apexLow from '@salesforce/resourceUrl/apexBottom';
import DoctorOneGif from '@salesforce/resourceUrl/DoctorOneGif'
import { createRecord } from 'lightning/uiRecordApi';
import {deleteRecord} from 'lightning/uiRecordApi'
import { updateRecord } from 'lightning/uiRecordApi';
import deleteEnquiry from '@salesforce/apex/HospitalApex.deleteEnquiry';
//Id,Name,Ex_Date__c,Cost__c,AMOUNT__c,Alloted_Medicine__c,Each_Med_Cost__c,Medicine_Left__c,Total__c FROM Hospital_Alloted_Medicine__c
import HA_OBJECT from '@salesforce/schema/Hospital_Alloted_Medicine__c'
import HA_NAME from '@salesforce/schema/Hospital_Alloted_Medicine__c.Name'
import HA_COST from '@salesforce/schema/Hospital_Alloted_Medicine__c.Cost__c'
import HA_EXDATE from '@salesforce/schema/Hospital_Alloted_Medicine__c.Ex_Date__c'
import HA_ALLMED from '@salesforce/schema/Hospital_Alloted_Medicine__c.Alloted_Medicine__c'
//import HA_ from '@salesforce/schema/Hospital_Alloted_Medicine__c'
import HD_OBJECT from '@salesforce/schema/Hospital_Daily_Medicine__c'
import HD_HA_ID from '@salesforce/schema/Hospital_Daily_Medicine__c.Hospital_Alloted_Medcine__c'
import HD_NAME from '@salesforce/schema/Hospital_Daily_Medicine__c.Name'
import HD_EXDATE from '@salesforce/schema/Hospital_Daily_Medicine__c.Ex_Date__c'
import HD_COST from '@salesforce/schema/Hospital_Daily_Medicine__c.Cost__c'
import HD_NOMED from '@salesforce/schema/Hospital_Daily_Medicine__c.No_Of_Medicine__c'
import HD_EACHCOST from '@salesforce/schema/Hospital_Daily_Medicine__c.Each_Medicine_Cost__c'
//Id,Name,Ex_Date__c,Cost__c,Each_Medicine_Cost__c,Amount__c,No_Of_Medicine__c
const columns=[{label:"Name",fieldName:"Name"},{label:"Cost",fieldName:"Cost__c"},
{label:"Ex Date",fieldName:"Ex_Date__c"},{label:"Amount",fieldName:"Amount__c"}]
export default class HospitalAllotedMedicine extends LightningElement {
    hospitalRemovebg=hospitalremovebg
    columns=columns
    apexlow=apexLow
    doctoronegif=DoctorOneGif
    hospitalGifCompressor=Hospitalgifcompressor+'/hospital-min.gif'
    @api staffUserName
    @api staffImage
   @api staffJobRole
   @api recordId
    arrMedPush=[]
    darkShow='Success'
modeShow='Dark'
 handleToggleDarkMode() {
    const darkModeClasslist = this.template.querySelector('.darkModeMain').classList;
    darkModeClasslist.toggle("dark-mode");
    if (this.darkShow === 'Success') {
        this.darkShow = 'error';
        this.modeShow='Bright';
    }  else {
            this.darkShow = 'Success';
            this.modeShow='Dark';
        }}

   createDailyRecord(){
    if(this.allotedMedineData.Id,this.MedNo){
        console.log('true')
        this.allotedMedineData.forEach(each=>{
            var fields={}
            fields[HD_NAME.fieldApiName]=each.Name
            fields[HD_EXDATE.fieldApiName]=each.Ex_Date__c
            fields[HD_COST.fieldApiName]=each.Cost__c
            fields[HD_EACHCOST.fieldApiName]=each.Each_Med_Cost__c
           fields[HD_NOMED.fieldApiName]=this.MedNo
            fields[HD_HA_ID.fieldApiName]=each.Id
            const recordInputOne = { apiName: HD_OBJECT.objectApiName, fields };
            createRecord(recordInputOne)
        .then(acc => { console.log('secon',acc)
        
       this.arrMedPush.push({"id":acc.id,"MedName":acc.fields.Name.value,"ExpiryDate":acc.fields.Ex_Date__c.value,
           "No":acc.fields.No_Of_Medicine__c.value,"Amount":acc.fields.Amount__c.value,
           "Cost":acc.fields.Cost__c.value})
           window.localStorage.setItem('memo',JSON.stringify(this.arrMedPush))
 this.arrMedPush= JSON.parse(window.localStorage.getItem('memo') );
                       console.log('arrPush',JSON.stringify(this.arrMedPush))
       
     
    })
    
})

    }
   }
   get  totalAmount(){
    if(this.arrMedPush.length>=1){
    return  this.arrMedPush.map(o=>o.Amount).reduce((a,b)=>
            (a+b) )
    }
   
}

get totalGst(){
    if(this.arrMedPush.length>=1){
        return  this.arrMedPush.map(o=>o.Amount).reduce((a,b)=>
                (a+b) )+ this.arrMedPush.map(o=>o.Amount).reduce((a,b)=>
                (a+b) )*12.5/100
        }
}      
   createAllotedRecord(){
    
        const fields = {};
            fields[HA_NAME.fieldApiName] =this.MedName;
           fields[HA_COST.fieldApiName]=this.MedCost
           fields[HA_EXDATE.fieldApiName]=this.MedExpiry
           fields[HA_ALLMED.fieldApiName]=this.Alloted
            const recordInput = { apiName: HA_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(account => {
                    console.log('acccc',account.id)
                    console.log('FIEL',account.fields)
                    console.log('FNAME',account.fields.Name.value)
                   // this.accountId = account.id;
                    
                        var fields={}
                        fields[HD_NAME.fieldApiName]=account.fields.Name.value
                        fields[HD_EXDATE.fieldApiName]=account.fields.Ex_Date__c.value
                        fields[HD_COST.fieldApiName]=account.fields.Cost__c.value
                        fields[HD_EACHCOST.fieldApiName]=account.fields.Each_Med_Cost__c.value
                        fields[HD_NOMED.fieldApiName]=this.MedNo
                        fields[HD_HA_ID.fieldApiName]=account.id
                        const recordInputOne = { apiName: HD_OBJECT.objectApiName, fields };
                        createRecord(recordInputOne)
                    .then(acc => { console.log('secon',acc.fields.Name.value)
                    this.arrMedPush.push({"id":acc.id,"MedName":acc.fields.Name.value,"ExpiryDate":acc.fields.Ex_Date__c.value,
                    "No":acc.fields.No_Of_Medicine__c.value,"Amount":acc.fields.Amount__c.value,
                    "Cost":acc.fields.Cost__c.value})
                    window.localStorage.setItem('memo',JSON.stringify(this.arrMedPush))
          this.arrMedPush= JSON.parse(window.localStorage.getItem('memo') );
                                console.log('arrPush',JSON.stringify(this.arrMedPush))
                  
                })
               
                    })                    
   }

   deleteHandler(event){
    var ind = this.arrMedPush.findIndex(element=>{
        return element.MedName===event.target.name.MedName;
     })
     if(ind!==-1){
        this.arrMedPush.splice(ind, 1)
     }
       deleteRecord(event.target.name.id).then(()=>{
           this.showToast("Sucess!!", "Deleted Successfully!!", 'success')
       }).catch(error=>{
           console.error(error)
           this.showToast("Error!!", "Error Occurred!!", 'error')
       })
       window.localStorage.setItem('memo',JSON.stringify(this.arrMedPush))
 this.arrMedPush= JSON.parse(window.localStorage.getItem('memo') );
                       console.log('arrPushde',JSON.stringify(this.arrMedPush))
   }
   showToast(title, message, variant){
       this.dispatchEvent(new ShowToastEvent({
           title,
           message,
           variant
       }))
   }
showEdit=false
   editRecordId
   EditOutHandler(event){
    this.showEdit=true
this.editRecordId=event.target.name.id
   }
   editSubmitHandler(){
    this.showEdit=false
   }
   objectName =HD_OBJECT
   fields={ 
      // accountField:ACCOUNT_FIELD,
      nameField:HD_NAME, 
      noMedField:HD_NOMED,
      // titleField:TITLE_FIELD,
      // phoneField:PHONE_FIELD,
      // emailField:EMAIL_FIELD
   }
   handleReset(){ 
       const inputFields = this.template.querySelectorAll('lightning-input-field')
       if(inputFields){ 
           Array.from(inputFields).forEach(field=>{ 
               field.reset()
           })
       }
   }

   medNoChageHandler(event){
    console.log('mednooo',event.target.value)
   // this.editShow=false
    if(event.target.value){
        this.arrMedPush.filter(fill=>{
            if(fill.id===this.editRecordId){
                var ind = this.arrMedPush.findIndex(element=>{
                    return element.id===this.editRecordId;
                 })
                 if(ind!==-1 ){
                    console.log('edit')
                    this.arrMedPush[ind].MedName=fill.MedName   
                    this.arrMedPush[ind].ExpiryDate=fill.ExpiryDate
                    this.arrMedPush[ind].No=event.target.value
                    this.arrMedPush[ind].Amount=fill.Cost*event.target.value/10
                }   
            }
        })
       
    }
    window.localStorage.setItem('memo',JSON.stringify(this.arrMedPush))
    this.arrMedPush= JSON.parse(window.localStorage.getItem('memo') );
                          console.log('arrPushde',JSON.stringify(this.arrMedPush))
}
    //Id,Name,Ex_Date__c,Cost__c,Each_Medicine_Cost__c,Amount__c,No_Of_Medicine__c
   allotedMedineData=[]

    @wire(getAllotedMedcine,{allotedName:'$MedName'})
    wiredAlloted({data,error}){
        if(data){
            this.allotedMedineData=data
            console.log('resultAlllot',this.allotedMedineData)
        }

if(error){
    console.log(error)
}
    }
medShow=false
    dailyMedData=[]
    @wire(getDailyMedicine)
    wiredDailyMedicine({data,error}){
        if(data){
            console.log('daily med',data)
this.dailyMedData=data
        }
        if(error){
            console.error(error)
        }
    }
    hospitalGifDaily=''
    todayMedicineHandler(){
if(this.hospitalGifDaily===''){
    this.hospitalGifDaily='preview'
    this.medShow=true
}else{
    this.hospitalGifDaily=''
}
    }
 get totalAmountToday(){
    if(this.dailyMedData.length>=1){
        return  this.dailyMedData.map(o=>o.Amount__c).reduce((a,b)=>
                (a+b) )
        }
 } 
 getBackHandler(){
    this.medShow=false
 }  
    timer
    MedName='';

inputPharmaHandlerOne(event){   
this.MedName=event.target.value
}
MedCost
inputPharmaHandlerTwo(event){
   this.MedCost=event.target.value;
   console.log('cost',this.MedCost)
}
MedExpiry
inputPharmaHandlerThree(event){
   this.MedExpiry=event.target.value
}
MedNo
inputPharmaHandlerFour(event){
  this.MedNo=event.target.value
}
Alloted
inputPharmaHandlerFive(event){
this.Alloted=event.target.value
}
toggleIconName = '';toggleButtonLabel 
        toggledropdownlabel
        get dropDown(){
            return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
         }
        handleToggleClick() {
            const contentBlockClasslist = this.template.querySelector('.ImageStaff').classList;
            contentBlockClasslist.toggle('slds-rise-from-ground');
            if (this.toggleIconName === 'preview') {
                this.toggleIconName = '';
               this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click ";
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
            }else {
                this.toggleIconName = 'preview';
                 this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open";
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
            }
        }
navigateToLwcLogin(){
    
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
        }
    })             
}
fileData
pdfHandler(){    
    let content=this.template.querySelector('.container')
    console.log(content.outerHTML)
    //Hospital_Account__c (Attachment Cost(a065j00000NssHuAAJ) Id)
    generatePDF({recordId:'a065j00000NssHuAAJ', htmlData:content.outerHTML }).then(result=>{
        console.log('attachment id',result)
        console.log('record',this.recordId)
        window.open('https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='+'a045j00000NJKIoAAP')
    }).catch(error=>{
        console.error(error)
    })
    const encodeval=btoa(content.outerHTML)
    console.log('fmmff',JSON.stringify(encodeval))
        this.fileData= {
            'filename':'asd.docx',
            'base64':encodeval,
            'recordId':this.recordId
        }
        console.log('file',JSON.stringify(this.fileData))

    const {base64 ,filename ,recordId} =this.fileData
    uploadFile({base64 , filename , recordId}).then(result=>{
        this.fileData = null
        let title = `${filename} uploaded successfully!`
        this.toast(title)
    })
        }
        toast(title){
            const toastEvent = new ShowToastEvent({
                title,
                variant:"success"
            })
            this.dispatchEvent(toastEvent)
          }
}