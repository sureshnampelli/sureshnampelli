import { LightningElement ,track,wire,api} from 'lwc';
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
import uploadFile from '@salesforce/apex/FileUploadClass.uploadFile'
import saveFileChildPharma from '@salesforce/apex/hospitalPharmasyCsvController.saveFileChildPharma';
import medicalMedPharma from '@salesforce/apex/HospitalApexTwo.medicalMedPharma';
import apexLow from '@salesforce/resourceUrl/apexBottom';
import medical from '@salesforce/apex/HospitalApex.medical';
import {getListUi} from 'lightning/uiListApi'
import MEDICAL_OBJECT from '@salesforce/schema/Hospital_Medical__c';
import { updateRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    { label: '"Expiry Date"', fieldName: 'Ex_Date__c' },
     { label: 'No Of', fieldName: 'No_Of_Medicine__c' },
     { label: 'Cost', fieldName: 'Cost__c'  },
     { label: 'Name', fieldName: 'Medicine_Name__c' },
   
  ];
export default class HospitalPharamasy extends NavigationMixin(LightningElement) {
    apexlow=apexLow
    headings=["Name","Cost","Each Medicine","Ex.Date"," Alloted","Medicine Left"  ,"Total"]
    fieldList=['Name','Phone']
    formField=[]
    draftValues={}
    @api staffUserName
    @api staffImage
   @api staffJobRole
   @api recordId
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
darkShow='Success'
modeShow='Dark'
 handleToggleDarkMode() {
    // retrieve the classList from the specific element
    const darkModeClasslist = this.template.querySelector(
        '.darkModeMain'
    ).classList;
    // toggle the hidden class
    darkModeClasslist.toggle("dark-mode");
    

    // if the current icon-name is `utility:preview` then change it to `utility:hide`
    if (this.darkShow === 'Success') {
        this.darkShow = 'error';
        this.modeShow='Bright';
    
    }  else {
            this.darkShow = 'Success';
            this.modeShow='Dark';
        }}


        currentTime=''
        connectedCallback(){
            this.currentTimeHandler()
           
        }
    
        // Method to update the current time every second.
        currentTimeHandler(){
    
            setInterval(()=>{
            
            // These are used for getting the current time
            let dateTime=new Date()
            let hours=dateTime.getHours()
            let minutes=dateTime.getMinutes()
            let seconds=dateTime.getSeconds()
    
            // used for the meridian
            let ampm="AM"
    
            // If the hour is equal to 0, it means that it's 12:00 midnight
            // Therefore, assign the hours to 12 instead of 0
            if(hours==0){
                hours=12
            }
    
            // If hours is greater than or equal to 12, it means that it's in the afternoon or evening
            else if(hours>=12){
                hours=hours-12
                ampm="PM"
            }
    
            // Adding a zero in front of hours, minutes, and seconds if the value is less than 10
            hours=hours<10 ? "0"+hours :hours
            minutes=minutes<10  ? "0"+minutes :minutes
            seconds=seconds<10 ? "0"+seconds: seconds
    
             // Setting the currentTime property with the current time and meridian
            this.currentTime=`${hours}:${minutes}:${seconds} ${ampm}`
    
            // Checking if the current time matches the alarm time
            if(this.alarmTime===`${hours}:${minutes} ${ampm}`){
               // console.log("Alarm Triggered");
               // Setting the isAlarmTriggered property to true
                this.isAlarmTriggered=true
    
                // Playing the alarm sound
                this.ringtone.play()
    
                // Looping the alarm sound until it's turned off
                this.ringtone.loop=true
            }
            },1000) // Running the function every 1 second
            
        }
    


inputPharmaHandler(event){
    const {name,value}=event.target
    this.draftValues[name]=value
  
     
        console.log('cost',JSON.stringify(this.draftValues))
      
}
formFiel=[]
pharmaOutHandler(){

    console.log('out',JSON.stringify(this.formFields))
    this.formField.push(this.formFields)
    
  window.localStorage.setItem('store', JSON.stringify(this.formField)) 
this.formField=JSON.parse(window.localStorage.getItem('store'))
    console.log('form',JSON.stringify(this.formField))
}

MedName
MedCost=0
MedExpiry
MedNo=0
valueName
valueExpiry
valueNo
valueCost
medname=''
medData=[]

callApex(){
    medicalMedPharma({medBulkName:this.MedName}).then(result=>{
this.medData=result
console.log('med',result[0].Id)
console.log('med',result)
    }).catch(error=>{
        console.error(error)
    })
}


timer
inputPharmaHandlerOne(event){
    window.clearTimeout(this.timer)
this.MedName=event.target.value
this.timer=setTimeout(() => {
    this.callApex() 
}, 1000);

}
inputPharmaHandlerTwo(event){
   this.MedCost=(event.target.value)/10;
   console.log('cost',this.MedCost)
}
inputPharmaHandlerThree(event){
   this.MedExpiry=event.target.value
}
inputPharmaHandlerFour(event){
  this.MedNo=event.target.value
}
inputFive
inputPharmaHandlerFive(event){
this.inputFive=event.target.value
}
MedField=[]
pharmaOutHandlered(){ 
        this.MedField.push({"MedName":this.MedName,"ExpiryDate":this.MedExpiry,"No":this.MedNo,"Amount":this.MedCost*this.MedNo})
        console.log('medfield',JSON.stringify(this.MedField))




window.localStorage.setItem('storeOne', JSON.stringify(this.MedField)) 
this.MedField=JSON.parse(window.localStorage.getItem('storeOne'))
    console.log('form',JSON.stringify(this.MedField))
}
DeleteOutHandler(event){
/*this.MedField.forEach(m=>{
if(m.MedName===event.target.name.MedName){
const index=this.MedField.indexOf(m.MedName)
this.MedField.splice(index,1)
}
})*/

    var ind = this.MedField.findIndex(element=>{
        return element.MedName===event.target.name.MedName;
     })
     if(ind!==-1){
        this.MedField.splice(ind, 1)
     }


window.localStorage.setItem('storeOne', JSON.stringify(this.MedField)) 
this.MedField=JSON.parse(window.localStorage.getItem('storeOne'))
    console.log('form',JSON.stringify(this.MedField))

}
pharmaEditSaveHandlered(){
    this.editShow=false
    if(this.editName){
        var ind = this.MedField.findIndex(element=>{
            return element.MedName===this.editName;
         })
         if(ind!==-1 ){
            console.log('edit',this.editName)
        this.MedField[ind].MedName= this.MedName   
        this.MedField[ind].ExpiryDate=this.MedExpiry
        this.MedField[ind].No=this.MedNo
        this.MedField[ind].Amount=this.MedCost*this.MedNo
        }
    }
    window.localStorage.setItem('storeOne', JSON.stringify(this.MedField)) 
this.MedField=JSON.parse(window.localStorage.getItem('storeOne'))
}
editName
editShow=false
EditOutHandler(event){
    this.editShow=true
this.editName=event.target.name.MedName
if(event.target.name.MedName){
    
this.MedField.filter(e=>{
    if(e.MedName===event.target.name.MedName){
        this.valueName=e.MedName
        this.valueExpiry=e.ExpiryDate
        this.valueCost=(e.Amount*10)/e.No
        this.valueNo=e.No
        var ind = this.MedField.findIndex(element=>{
            return element.MedName===e.MedName;
         })
         if(ind!==-1 && e.MedName===this.MedName){
            console.log('edit',event.target.name.MedName)
        this.MedField[ind].MedName= this.valueName   
       this.MedField[ind].ExpiryDate=this.valueExpiry
       this.MedField[ind].No=this.valueNo
       this.MedField[ind].Amount=this.valueCost
        }
       
    }
        
})
}
window.localStorage.setItem('storeOne', JSON.stringify(this.MedField)) 
this.MedField=JSON.parse(window.localStorage.getItem('storeOne'))
    console.log('form',JSON.stringify(this.MedField))
}

get  totalAmount(){
    if(this.MedField.length>=1){
    return  this.MedField.map(o=>o.Amount).reduce((a,b)=>
            (a+b) )
    }
   
}

get totalGst(){
    if(this.MedField.length>=1){
        return  this.MedField.map(o=>o.Amount).reduce((a,b)=>
                (a+b) )+ this.MedField.map(o=>o.Amount).reduce((a,b)=>
                (a+b) )*12.5/100
        }
}
resOne=[]


@api recordid;
@api columns = columns;

@track data;

@track fileName = '';

@track UploadFile = 'Upload ';

@track showLoadingSpinner = false;

@track isTrue = false;

selectedRecords;

filesUploaded = [];

file;

fileContents;

fileReader;

content;

MAX_FILE_SIZE = 1500000;




accountHeaders={
    
    Ex_Date__c:"Expiry Date",
    No_Of_Medicine__c:"No Of",
    Cost__c:"Cost",
    Medicine_Name__c:"Name"

}

handleRecord(){
    console.log('a')
   
       var  resOne=[]
       if(this.MedField.length){
       this.MedField.forEach(elm=>{
           const ind=resOne.findIndex(obj=>{
               return (obj['Ex_Date__c']===elm.ExpiryDate,obj['No_Of_Medicine__c']===elm.No,
               obj['Cost__c']===elm.Amount,obj['Medicine_Name__c']===elm.MedName)
            } );
            console.log('b')
           if(ind>=-1){
               resOne.push({
                   
                  
                   "Ex_Date__c":elm.ExpiryDate,
                   "No_Of_Medicine__c":elm.No,
                   "Cost__c":elm.Amount/elm.No,
                   "Medicine_Name__c":elm.MedName
               })
           }
   })
   console.log('c')
       }
     /*  console.log('Record',JSON.stringify(resOne))
       window.localStorage.setItem('storeOneQ', JSON.stringify(resOne)) 
   resOne=JSON.parse(window.localStorage.getItem('storeOneQ'))
       console.log('form',JSON.stringify(resOne))*/
       
 const columnDelimiter = ','
 const lineDelimiter = '\r\n'
 const actualHeaderKey = Object.keys(this.accountHeaders)
 const headerToShow = Object.values(this.accountHeaders)

console.log(JSON.stringify(Object.values(this.accountHeaders)));
 
console.log('KLK',JSON.stringify(Object.keys(this.accountHeaders)));

let str = ''
 str+=headerToShow.join(columnDelimiter)
 str+=lineDelimiter
 const data = typeof resOne !=='object' ? JSON.parse(resOne):resOne
console.log('MNM',JSON.stringify(data))
 data.forEach(obj=>{
     let line =''
     actualHeaderKey.forEach(key=>{
         if(line !=''){
             line+=columnDelimiter
         }
         
         let strItem = obj[key] ? obj[key]+'': ''
         line+=strItem? strItem.replace(/,/g, ''):strItem
     })
     str+=line+lineDelimiter
 })
 //this.accountData=str
console.log('jj',str)


 console.log('csvUplod',JSON.stringify(str))
 saveFileChildPharma({ base64Data: JSON.stringify(str), cdbId: this.recordid})

    .then(result => {

        window.console.log('result ====> ');

        window.console.log(result);



        this.data = result;



       // this.fileName =  + ' - Uploaded Successfully';

        this.isTrue = false;

        this.showLoadingSpinner = false;



        this.dispatchEvent(

            new ShowToastEvent({

                title: 'Success!!',

                message: ' - Uploaded Successfully!!!',

                variant: 'success',

            }),

        );

    })

    .catch(error => {



        window.console.log(error);

        this.dispatchEvent(

            new ShowToastEvent({

                title: 'Error while uploading File',

                message: error.message,

                variant: 'error',

            }),

        );

    });

}

tableHandler(event){
console.log('tabel',event.target.value)
console.log('tabel',event.target.id)
console.log('nn',event.detail.id)
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