import { LightningElement,wire,api,track} from 'lwc';
import accountHospital from '@salesforce/apex/HospitalApex.accountHospital';
import medical from '@salesforce/apex/HospitalApexTwo.medical';
import medicalMedLimit from '@salesforce/apex/HospitalApexTwo.medicalMedLimit';
import deleteMedical from '@salesforce/apex/HospitalApexTwo.deleteMedical';
import medicalMedPharma from '@salesforce/apex/HospitalApexTwo.medicalMedPharma';
import { createRecord } from 'lightning/uiRecordApi';
import hospitalMasterPharma from '@salesforce/apex/HospitalApexTwo.hospitalMasterPharma';
import {getListUi} from 'lightning/uiListApi';
import MEDICAL_MASTER from '@salesforce/schema/Hospital_Master_Med__c';
import TITLE_FIELD from '@salesforce/schema/Hospital_Master_Med__c.Name';
import { deleteRecord } from 'lightning/uiRecordApi';
import MEDICAL_OBJECT from '@salesforce/schema/Hospital_Medical__c';
import COST from '@salesforce/schema/Hospital_Medical__c.Cost__c';
import NOMEDICINE from '@salesforce/schema/Hospital_Medical__c.No_Of_Medicine__c';
import HOSPITAL_ACCOUNT from '@salesforce/schema/Hospital_Account__c';
import LIPIDTEST from '@salesforce/schema/Hospital_Account__c.Lipid_Cost__c';
import BLOODTEST from '@salesforce/schema/Hospital_Account__c.Blood_Cost__c';
import FLUTEST from '@salesforce/schema/Hospital_Account__c.Flu_Test__c';
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
export default class HospitalPharma extends LightningElement {
    boxOne=0;
    boxTwo=0;
    boxThree=0;
    checkedThree=0
    checkedTwo=0
    checkedOne=0
    checkedThreeThree
    checkedTwoTwo
    checkedOneOne
    onedata
    twodata 
    threedata
    accountdata
@api staffUserName
@api staffImage
@api staffJobRole
toggleIconName = '';
toggleButtonLabel 
utilityVar
billa
billaOne
status=''; 
statusOne='';
utilityVarOne
utilityVarTwo
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


utilityHandler(){
    
   
  this.status = !this.status;
      this.billa = this.template.querySelector(".btnU")
           this.status ? this.billa.addEventListener("mouseover",this.status='success',true)
            
           :  this.billa.addEventListener("mouseout",this.status='',true)
      
    }
    renderedCallback(){
       this.utilityVar= this.status==''? false: true
       this.utilityVarTwo=this.statusOne==''? false: true
      // this.utilityVarOne= this.utilityMasterData.isArray ?  false : true
      this.utilityVarOne= this.status==''? "slds-utility-bar__item" :"slds-utility-bar__item slds-utility-bar__item_pop-out"
    }
    utilityHandlerOne(){ 
        this.statusOne = !this.statusOne;
        this.billaOne = this.template.querySelector(".btnUTwo")
        this.statusOne ? this.billaOne.addEventListener("mouseover",this.statusOne='success',true) :
        this.billaOne.addEventListener("mouseout",this.statusOne='',true)
          
          
          
          
    }

    get DateAN(){
        return new Date();
    }
    utilityMasterData
callApexMed(medicineName){
    medicalMedPharma({medBulkName:medicineName}).then(result=>{
        console.log('medPharma',result)
        this.utilityMasterData=result
        if(this.utilityMasterData.length===1){
        this.utilityHandler()
        }
    })
}

medicalMaster=[]
@wire(hospitalMasterPharma)
    medMaterHandler({data,error}){
        if(data){
            console.log('mastermedList',data)
            this.medicalMaster=data
           
        }
        if(error){
            console.error(error)
        }
    }
   
@wire(accountHospital)
hospitalAccount({data,error}){
    if(data){
        console.log('Test',data)
        data.forEach(ele=>{
           this.onedata= ele.Lipid_Cost__c
           this.twodata=ele.Blood_Cost__c
this.threedata=ele.Flu_Test__c
        })
this.accountdata=data
    }
    if(error){
        console.error(error)
    }
}
handleCheckboxThree(event){
    this.checkedThreeThree=event.target.checked
    this.checkedThree=event.target.name
}
handleCheckboxTwo(event){
    this.checkedTwo=event.target.name
    this.checkedTwoTwo=event.target.checked
}
handleCheckboxOne(event){
    this.checkedOne=event.target.name
    this.checkedOneOne=event.target.checked
}

filterHandler(){
    this.accountdata.filter(item=>{
        if(this.checkedOneOne===true){
            console.log('oneone',item.Lipid_Cost__c)
            this.boxOne = item.Lipid_Cost__c
        }
        if(this.checkedTwoTwo===true){
            this.boxTwo=item.Blood_Cost__c
            console.log('two',this.boxTwo)
        }
      if(this.checkedThreeThree===true){
        this.boxThree=item.Flu_Test__c
      }
    })
}
get amountTotal(){
return this.boxOne+this.boxTwo+this.boxThree
}

searchHandler(event){   
    this.medicinename=event.target.value
this.findFilterHandler(this.medicinename)  
}

editAccountShow=false
handleEditAccount(){
this.editAccountShow=true
}
objectName=HOSPITAL_ACCOUNT
recordId='a065j00000MbGzXAAV'
fieldsO={
    lipidField:LIPIDTEST,
    bloodField:BLOODTEST,
    fluField:FLUTEST
}
editAccountSubmit(){
    this.editAccountShow=false
}
handleResetAccount(){
    const inputFields=this.template.querySelectorAll('lightning-input-field')
    if(inputFields){
        Array.from(inputFields).forEach(field=>{
            field.reset()
        })
    
    }
    this.editAccountShow=false
}



keysmall=-1
 itemList = [
    {
        id:'' , Medicine_Name__c:'Medicine ',Expiry_Date__c:'Expiry Date',No_Of_Medicine__c:'No OF',
        Each_Medicine__c:'Each',Amount__c:'Amount'
    }
];




addRow() {
   ++this.keysmall
    

    var newItem = [{ id: this.medData[this.keysmall].Id,Medicine_Name__c:this.medData[this.keysmall].Medicine_Name__c ,
        Expiry_Date__c: this.medData[this.keysmall].Expiry_Date__c,No_Of_Medicine__c:this.medData[this.keysmall].No_Of_Medicine__c,
        Each_Medicine__c:this.medData[this.keysmall].Each_Medicine__c, Amount__c:this.medData[this.keysmall].Amount__c }];
    this.itemList = this.itemList.concat(newItem);
   
    console.log('len',this.itemList.length)
    

    this.itemList.forEach(item=>{
        console.log('key Id',item.id )
    })
    
}

resetHandler(){
    this.keyIndex=-1
    this.limitLength=1
    this.limitData=[]
    this.itemList=[ {
        id:'' , Medicine_Name__c:'Medicine ',Expiry_Date__c:'Expiry Date',No_Of_Medicine__c:'No OF',
        Each_Medicine__c:'Each',Amount__c:'Amount'
    }]
     var newItem = [{ id: this.medData[-1].Id,Medicine_Name__c:this.medData[-1].Medicine_Name__c ,
        Expiry_Date__c: this.medData[-1].Expiry_Date__c,No_Of_Medicine__c:this.medData[-1].No_Of_Medicine__c,
        Each_Medicine__c:this.medData[-1].Each_Medicine__c, Amount__c:this.medData[-1].Amount__c }];
    this.itemList = this.itemList.concat(newItem);
    this.callApex()
    console.log('len',this.itemList.length)
 this.itemList.forEach(item=>{
        console.log('key Id',item.id )
    })
}

removeRow(event) {
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
            return element.id !== event.target.accessKey;
        });
        console.log('name' ,event.target.name)
        console.log('index' ,event.target.id)
        this.deleteHandler(event.target.accessKey) 
    }
    if(this.objOne.length>=0){
        this.objOne=this.objOne.filter(ele=>{
            return ele.id !==event.target.accessKeyone
        })
       
        this.deleteHandler(event.target.accessKeyone , event.target.id)
        console.log('name' ,event.target.name)
        console.log('index' ,event.target.id)
    }
    
 
}
removeR(event){
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
            return element.id !== event.target.accessKey;
        });
       
    }  
    this.limitedLength=0
}

Columns=[
    { label: 'Medicine Name', fieldName: 'Medicine_Name__c' },
    { label: 'First Name', fieldName: 'First_Name__c' }
]



medData
@wire(medical)
wiredmed({data,error}){
    if(data){
       this.medData=data
        console.log(data)
    }
    if(error){
        console.error(error)
    }
}

/*callApex(limit){
medicalMed({lengthNum:limit}).then(result=>{

        this.medDat=result   
    
    
this.sumTen+=result[0].Amount__c

})
}*/

limitedData
sumTen=0
objOne=[]
connectedCallback(){
    this.limitedLength=this.lengthVariant
    this.callApexLimit(this.limitedLength) 
}
callApexLimit(limited){
    medicalMedLimit({lengthLimit:limited}).then(result=>{
        window.localStorage.setItem('setcart',JSON.stringify(result))
        this.objOne=JSON.parse(window.localStorage.getItem('setcart') )
//this.limitedData=result  

    }).catch(error=>{
        console.error(error)
    })
}

get  totalAmount(){
    if(this.objOne.length>=1){
    return  this.objOne.map(o=>o.Amount__c).reduce((a,b)=>
            (a+b) )
    }
   
}


/*medicalList=[]
pageToken=null
nextpageToken=null
previouspageToken=null
@wire(getListUi,{objectApiName:MEDICAL_OBJECT , lisViewApiName:'All',pageSize:5})
listViewHandler({data,error}){
    if(data){
        console.log('list',data)
this.medicalList=data

    }
    if(error){
        console.error(error)
    }
}*/

editShow=false
editrecordId
editHandler(event){
    this.editShow=true
   this.editrecordId=event.target.accessKey
    console.log('edit',event.target.accessKey)
}
objectApiName=MEDICAL_OBJECT
fields={
    nomedicineField:NOMEDICINE,
    costField:COST
}
editSubmit(){
    this.editShow=false
}
handleReset(){
    const inputFields=this.template.querySelectorAll('lightning-input-field')
    if(inputFields){
        Array.from(inputFields).forEach(field=>{
            field.reset()
        })
    
   }
    this.editShow=false
}
timer
formFields={}
changeHandler(event){
window.clearTimeout(this.timer)
    const {name,value}=event.target
    this.formFields[name]=value
   this.timer =setTimeout(() => {
        console.log('apexcalled',JSON.stringify( this.formFields.Medicine_Name__c))
        this.callApexMed(this.formFields.Medicine_Name__c)
    }, 1000);
   
}
limitedLength=0
lengthVariant=0
createMedical(){
    const recordInput={apiName:MEDICAL_OBJECT.objectApiName,fields:this.formFields}
    createRecord(recordInput).then(resultO=>{
        this.showToast('success!!',`Create Record ${resultO.Id} `)
        this.limitedLength++
this.lengthVariant++
        this.callApexLimit(this.limitedLength) 
            
        this.formFields={}    
         
    }).catch(error=>{
        this.showToast('Error Creating record',error.body.message,'error')
    })
}

showToast(title,message,variant){
    this.dispatchEvent(new ShowToastEvent({
        title,
        message,
        variant:variant || 'success'
    }))
}

ind
timer=1000
deleteHandler(data,dataone){
    this.objOne.filter(r=>{
        if(data===r.Id){
            const index=this.objOne.indexOf(r.Id)
            this.objOne.splice(index,1)
            console.log('objone')
        }})
    deleteRecord(data).then(()=>{
        this.showToast('Sucess!!','Deleted Successfully!!','success')
        
       // this.ind=[...dataone].slice(0,-3).toString()
       // this.limitedLength-- 
      //      this.callApexLimit(this.limitedLength)
/*console.log('liu',this.ind)

this.callApex(this.limitedLength)
this.limitApex(this.ind*this.timer)

            console.log('dataone',dataone)
        return refreshApex(this.limitedData)*/
    }).catch(error=>{
        console.error(error)
        this.showToast('Error!!','Error Occurred!1','error')
    })
    
   
}
/*deleteTableHandler(event){
    console.log('delete')
    console.log('del',event.target.accessKeyone)
   const keyId=event.target.accessKeyone
   

    deleteRecord(event.target.accessKeyone).then(()=>{
        this.showToast('Sucess!!','Deleted Successfully!!','success')
       
      //  this.ind=[...dataone].slice(0,-3).toString()
       
    }).catch(error=>{
        console.error(error)
        this.showToast('Error!!','Error Occurred!1','error')
    })
   /* this.objOne.filter(r=>{
        console.log('objone',r.Id,keyId)
        if(keyId===r.Id){
           
            var ind=this.objOne.indexOf(r.Id)
            
            
            this.objOne.splice(ind,1)
            console.log('objonein2')
        }})*/
       /* var index = this.objOne.findIndex(element=>{
            return element.Id===keyId;
         })
         if(index!==-1){
            this.objOne.splice(index, 1)
           
         }
    window.localStorage.setItem('setcart',JSON.stringify(this.objOne))
        this.objOne=JSON.parse(window.localStorage.getItem('setcart') )
}*/
apexLength
limitApex(limit){
    this.apexLength=limit
    console.log('timer Apex ',this.apexLength)
}
formField=[]
formFields={}
inputPharmaHandler(event){
    const {name,value}=event.target
    this.formFields[name]=value
   
   
    
}

pharmaOutHandler(){
    console.log('out',JSON.stringify(this.formFields))
    this.formField.push(this.formFields)
    
    
    console.log('form',JSON.stringify(this.formField))
}
pdfHandler(){
        
    let content=this.template.querySelector('.container')
    console.log(content.outerHTML)
    generatePDF({recordId:'a045j00000NJKIoAAP', htmlData:content.outerHTML }).then(result=>{
        console.log('attachment id',result)
        console.log('record',this.recordId)
        window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='a045j00000Mz7H4AAJ'`)
    }).catch(error=>{
        console.error(error)
    })
        }

      
        @track data;
    @track showLoadingSpinner = false;
    recordId;    
    refreshTable;
    error;
    subscription = {};
    CHANNEL_NAME = '/event/RefreshDataTable__e';

    connectedCallback() {
        subscribe(this.CHANNEL_NAME, -1, this.handleEvent).then(response => {
            console.log('Successfully subscribed to channel');
            this.subscription = response;
        });

        onError(error => {
            console.error('Received error from server: ', error);
        });
    }

    handleEvent = event => {
        const refreshRecordEvent = event.data.payload;
        if (refreshRecordEvent.RecordId__c === this.recordId) {
            this.recordId='';
            return refreshApex(this.refreshTable);
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription, () => {
            console.log('Successfully unsubscribed');
        });
    }
  /*  deleteTableHandler(event){
        this.lengthVariant--
        console.log('delete')
        console.log('del',event.target.accessKeyone)
       const keyId=event.target.accessKeyone
       var index = this.objOne.findIndex(element=>{
        return element.Id===keyId.Id;
     })
     if(index!==-1){
        this.objOne.splice(index, 1)
       
     }
window.localStorage.setItem('setcart',JSON.stringify(this.objOne))
    this.objOne=JSON.parse(window.localStorage.getItem('setcart') )
     
}*/
intialHandler(){
    this.limitedLength=this.lengthVariant

    this.callApexLimit(this.limitedLength) 
}

    deleteTableHandler(event){
        console.log('delete')
        console.log('del',event.target.accessKeyone)
       const keyId=event.target.accessKeyone
       
       // this.showLoadingSpinner = true;
        deleteMedical({ objMedical: keyId}).then(result => {
            window.console.log('result^^' + result);
           // this.showLoadingSpinner = false;
           
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: currentRow.Id + ' account deleted.',
                variant: 'success'
            }));
            return refreshApex(this.refreshTable);
        }).catch(error => {
            window.console.log('Error ====> ' + error);
           // this.showLoadingSpinner = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!',
                message: JSON.stringify(error),
                variant: 'error'
            }));
        });
        
        var index = this.objOne.findIndex(element=>{
            return element.Id===keyId.Id;
         })
         if(index!==-1){
            this.objOne.splice(index, 1)
           
         }
    window.localStorage.setItem('setcart',JSON.stringify(this.objOne))
        this.objOne=JSON.parse(window.localStorage.getItem('setcart') )
this.lengthVariant--
    }

}