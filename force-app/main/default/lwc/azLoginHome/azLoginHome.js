import { LightningElement ,wire} from 'lwc';
import createAzCustomer from '@salesforce/apex/AzCustomerController.createAzCustomer';
import getAzCustomer from '@salesforce/apex/AzCustomerController.getAzCustomer';
import getAdmin from '@salesforce/apex/AzCompanyController.getAdmin';
import getAzWorker from '@salesforce/apex/AzWorkerController.getAzWorker';
import updateAzCustomer from '@salesforce/apex/AzCustomerController.updateAzCustomer';
import getAdminTodayShiftwise from '@salesforce/apex/AzCustomerController.getAdminTodayShiftwise';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { NavigationMixin } from 'lightning/navigation'
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import ThreeDPainterRemovebg from '@salesforce/resourceUrl/ThreeDPainterRemovebg'
import BittuOne from '@salesforce/resourceUrl/BittuOne'
import Username from '@salesforce/resourceUrl/Username'
import ElecLogin from '@salesforce/resourceUrl/ElecLogin'
import electricianMainLoginOne from '@salesforce/resourceUrl/electricianMainLoginOne'
import NumbersIcons from '@salesforce/resourceUrl/NumbersIcons'
import loginicons from '@salesforce/resourceUrl/loginicons'
import WorkerLogin from '@salesforce/resourceUrl/WorkerLogin'
import managementIcons from '@salesforce/resourceUrl/managementIcons'
import AZLogo from '@salesforce/resourceUrl/AZLogo'
import AZLogoOne from '@salesforce/resourceUrl/AZLogoOne'
import twofour from '@salesforce/resourceUrl/twofour'
import MutliWorkRemovebg from '@salesforce/resourceUrl/MutliWorkRemovebg'
export default class AzLoginHome extends NavigationMixin(LightningElement) {
    AZLogo=AZLogo
    AZLogoOne=AZLogoOne
    NumbersIcons=NumbersIcons
    MutliWorkRemovebg=MutliWorkRemovebg
    workers=loginicons+'/workers.png'
    projectmanager=loginicons+'/projectmanager.png'
    service=loginicons+'/service.png'
    WorkerLoginPage=WorkerLogin+'/workerlogin.jpg'
    pig=WorkerLogin+'/pig.png'
    pighide=WorkerLogin+'/pighide.png'
    running=WorkerLogin+'/running.gif'
    managementone=managementIcons+'/managementone.jpg'
    managementtwo=managementIcons+'/managementtwo.jpg'
    managementthree=managementIcons+'/managementthree.jpg'
    twofour=twofour
    //'/resource/1704453692000/NumbersIcons'
    //herocompressed+'/nagarjuna.jpg';
    ThreeDPainterRemovebg=ThreeDPainterRemovebg
    electricianMainLoginOne=electricianMainLoginOne
    ElecLogin=ElecLogin
    threeShow=false
    mainShow=false
    isAlarmTriggered=false
    isAlarmTrigger=false
    isAlreadyRecord=false
    isModelOpen=false
    isWorkerModelOpen=false
    isForgotPassShow=false
    isManagementModelOpen=false
    placeholderEnterPassword="Enter Password"
    placeholderReEnterPassword="Re Enter Password"
    customerRefreshData=[]
customerData=[]
one=NumbersIcons+'/numberone.png';two=NumbersIcons+'/numbertwo.png';three=NumbersIcons+'/numberthree.png'
 four=NumbersIcons+'/numberfour.png';five=NumbersIcons+'/numberfive.png';six=NumbersIcons+'/numbersix.png';
 seven=NumbersIcons+'/numberseven.png';eight=NumbersIcons+'/numbereight.png'; 
 nine=NumbersIcons+'/numbernine.png';zero=NumbersIcons+'/zero.png' ;
 get pigIcon(){
    return this.altToogle==="hide"?this.pig:this.pighide
 }
get zeroval(){
    return true?NumbersIcons+'/zeroR.png':NumbersIcons+'/zero.png'
}
selection
arrnum=[]
numselect=''
colNum
adminData=[]
workerData=[]
customerCreateModelHandler(){
    this.isModelOpen=true
}
workerModelOpenHandler(){
    this.isWorkerModelOpen=true
}
hideWorkerModelHandler(){
    this.isWorkerModelOpen=false
}
@wire(getAzWorker)
wiredWorker({data,error}){
    if(data){
        console.log('azworker',data)
        this.workerData=data
    }if(error){
        console.error(error)
    }
}
workerTextPass="password"
inputWorkerEmail
inputWorkerPassword
altToogle="hide"
workerPassword
workerImage
workerName
workerLoginPass
workerId
workerEmailHandler(event){
this.inputWorkerEmail=event.target.value
this.workerData.filter(wo=>{
    if(wo.Email__c=== this.inputWorkerEmail){
       this.workerPassword=wo.Password__c
       this.workerImage=wo.Image__c
       this.workerName=wo.Name
       this.workerId=wo.Id
    }
})
}
workerPasswordHandler(event){
 this.inputWorkerPassword=event.target.value
 if(this.workerPassword===this.inputWorkerPassword){
    this.workerLoginPass=event.target.value
    console.log('workerpass')
 }
}
workerLoginHandler(){
if(this.workerPassword=== this.workerLoginPass){
    this.navigateToWorkerNavigation()
    this.template.querySelectorAll('lightning-input[data-reset="worker"]').forEach(element => {
        element.value = null;
      });
      this.inputWorkerEmail=''
      this.inputWorkerPassword=''
}
}
hideSeekPigHandler(){
if(this.altToogle==="hide"){
    this.altToogle="seek"
    this.workerTextPass="text"
}else{
    this.altToogle="hide"
    this.workerTextPass="password"
}
}
managementModelOpenHandler(){
    this.isManagementModelOpen=true
}
managementPassword
managementTextPass="password"
hideManagementModelHandler(){
    this.isManagementModelOpen=false
}
managementEmailHandler(event){
    if(event.target.value==="suresh@gmail.com"){
this.managementPassword="suresh@123"
    }

}
toggleIconNameMag = 'utility:preview';
 handleToggleClickMag() {
 if (this.toggleIconNameMag === 'utility:preview') {
     this.toggleIconNameMag =  'utility:hide'
     this.managementTextPass ="text"
 } else {
     this.toggleIconNameMag = 'utility:preview';
      this.managementTextPass="password"
 }}
managementPasswordHandler(event){
    if(event.target.value==="suresh@123"){
      //  this.managementPassword="suresh@123"
      var defination={
        componentDef:'c:azAdminHome',
       /* attributes: {
            customerName : this.customerFullName,
            customerID:this.customerId
        }*/
    }
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:'/one/one.app#'+btoa(JSON.stringify(defination))
        }
    })    
            }

}
managementLoginHandler(){

}
numberPasswordHandler(event){
    this.arrnum.push(event.target.name)
this.colNum=event.target.name
    console.log('NUM',event.target.name,JSON.stringify(this.arrnum))
    this.arrnum.filter(b=>b).map(a=>{
        this.numselect+=a
    })
    this.colNum=this.numselect.slice(-this.arrnum.length)
    this.adminData.filter(co=>{
        if(co.Password__c===this.colNum){
            console.log('anu',co)
            this.navigateToAdminNavigation()
            this.selection=co.Email__c
        }
    })
}
adminRefreshData=[]
@wire(getAdmin)
wiredAdmin(result){
    this.adminRefreshData=[]
 if(result.data){
 this.adminData=result.data
 }
    if(result.error){
        console.log(result.error)
    }
}
hideCreateModel(){
this.isModelOpen=false
    }
    alreadyCustomerHandler(){
        this.isAlreadyRecord=true
    }
    firstName
    firstNameHandler(event){
this.firstName=event.target.value
    }
    lastName
    lastNameHandler(event){
     this.lastName=event.target.value
    }
    phoneValue
    phoneHandler(event){
     this.phoneValue=event.target.value
    }
    emailValue
    emailHandler(event){
     this.emailValue=event.target.value
    }
    
    enterPasswordValue
    enterPasswordHandler(event){
        
     this.enterPasswordValue=event.target.value
     console.log('pass',this.enterPasswordValue)
    }
    errorMesg
    reEnterPasswordValue
    reEnterPasswordHandler(event){
        if(this.enterPasswordValue===event.target.value){
            this.reEnterPasswordValue=event.target.value
            this.errorMesg='Match'
        }else{
            if(event.target.value){
this.errorMesg='Not Matched'
            }
        }
    }
    noAccountCustomerHandler(){
this.isAlreadyRecord=true
    }
    forgotPasswordCustomerHandler(){
        this.isForgotPassShow=true
        this.isAlreadyRecord=false
        this.placeholderEnterPassword="Enter New Password"
        this.placeholderReEnterPassword="Re Enter New Password"
    }
    forgotAccountId
    forgotEmailValue
    forgotPassEmailHandler(event){
this.forgotEmailValue=event.target.value
        this.customerData.filter(as=>{
           if(as.Email__c===event.target.value){
this.forgotAccountId=as.Id
console.log('forgotPass',as.Id)
           }
        })
    }
    updateForgotPasswordHandler(){
        const forUpdate={Id:this.forgotAccountId,Email__c:this.forgotEmailValue,
            Enter_Password__c:this.enterPasswordValue,
            Re_Enter_Password__c:this.reEnterPasswordValue
        }
        updateAzCustomer({customerPassUpdate:forUpdate}).then(result => {
            window.console.log('result^^' + result);
          //  this.showLoadingSpinner = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message:  'Password Updated.',
                variant: 'success'
            })); 
            this.template.querySelectorAll('lightning-input[data-reset="Input"]').forEach(element => {
                element.value = null;
              });
              this.forgotEmailValue=''
              this.enterPasswordValue=''
              this.enterPasswordValue=''
            refreshApex(this.customerRefreshData)          
        }).catch(error => {
            window.console.log('Error ====> ' + error);
           // this.showLoadingSpinner = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!',
                message: JSON.stringify(error),
                variant: 'error'
            }));            
        });  
        this.isAlreadyRecord=true  
    }
    
    testPass="password"
    tooglePass="Show Password"
    tooglePasswordShow(event){   
        if(event.target.checked===true){
this.testPass="text" 
this.tooglePass="Hide Password" 
        }else{
            this.testPass="password"
            this.tooglePass="Show Password"
        }
    }
    enterCustomerLoginUserName
    enterCustomerLoginPassword
    customerFullName
    customerId
    customerPassword
    customerImage
    customerPasswordHandler(event){
this.enterCustomerLoginPassword=event.target.value

    }
    customerUserNameHandler(event){
        this.enterCustomerLoginUserName=event.target.value
        this.customerData.filter(ad=>{
            if(ad.Email__c===this.enterCustomerLoginUserName){
            //  this.customerImage=ad.Image__c,
             this.customerFullName=ad.Full_Name__c,
             this.customerPassword=ad.Password__c,
             this.customerId=ad.Id
            }
        })

    }
    loginCustomerHandler(){
        if(this.customerPassword===this.enterCustomerLoginPassword){
            this.navigateToCustomerHome()
            this.template.querySelectorAll('lightning-input[data-reset="Login"]').forEach(element => {
                element.value = null;
              });
              this.enterCustomerLoginPassword='';this.enterCustomerLoginUserName=''
        }
    }
    toggleIconName = 'utility:preview';
   textPassword="password"
    handleToggleClick() {
    if (this.toggleIconName === 'utility:preview') {
        this.toggleIconName =  'utility:hide'
        this.textPassword="text"
    } else {
        this.toggleIconName = 'utility:preview';
        this.textPassword="password"
    }}
    customerSignUpHandler(){
    const customer={Name:this.firstName,Last_Name__c:this.lastName,
        Phone__c:this.phoneValue, Email__c:this.emailValue,
        Enter_Password__c:this.enterPasswordValue,Re_Enter_Password__c:this.reEnterPasswordValue
    }
    createAzCustomer({customerSignUp:customer}).then(result=>{
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account created',
                variant: 'success',
            }),      
        );
      //  data-reset="Input"
      this.template.querySelectorAll('lightning-input[data-reset="Input"]').forEach(element => {
        element.value = null;
      });
        this.firstName='';this.lastName='';this.phoneValue='';this.emailValue=''
        this.enterPasswordValue='';this.reEnterPasswordValue=''
        refreshApex(this.customerRefreshData)
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating record',
                message: error.body.message,
                variant: 'error',
            }),
        );
    })
}
@wire(getAzCustomer)
wiredCustomer(result){
this.customerRefreshData=result
if(result.data){
    this.customerData=result.data
    console.log('cust dataaa',result.data)
}if(result.error){
    console.log(result.error)
}
}

navigateToCustomerHome(){
    var defination={
        componentDef:'c:azCustomerHome',
        attributes: {
            customerName : this.customerFullName,
            customerID:this.customerId
        }
    }
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:'/one/one.app#'+btoa(JSON.stringify(defination))
        }
    })    
}
navigateToAdminNavigation(){
    var defination={
        componentDef:'c:azAdminNavigation',
       /* attributes: {
            customerName : this.customerFullName,
            customerID:this.customerId
        }*/
    }
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:'/one/one.app#'+btoa(JSON.stringify(defination))
        }
    })    
}

navigateToWorkerNavigation(){
    var defination={
        componentDef:'c:azWorkerNavigation',
        attributes: {
            workerName : this.workerName,
        workerImage: this.workerImage,
        workerIdnav:this.workerId
        }
    }
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:'/one/one.app#'+btoa(JSON.stringify(defination))
        }
    })    
}
connectedCallback() {
    console.log("NumbersIcons",NumbersIcons)
    this.currentTimeHandler()
    refreshApex(this.adminRefreshData)
}
currentTime=''
hoursHand=''
minutesHand=''
secondsHand=''
shiftNumber
adminOtpPass=true
get adminOtpShow(){
    return  this.adminOtpPass===true?true:false
}
currentTimeHandler(){
    setInterval(()=>{
    let dateTime=new Date()
    let hours=dateTime.getHours()
    this.hoursHand=dateTime.getHours()
    let minutes=dateTime.getMinutes()
    this.minutesHand=dateTime.getMinutes()
    let seconds=dateTime.getSeconds()
    this.secondsHand=dateTime.getSeconds()
    this.currentTime=`${hours}:${minutes}:${seconds}`           
            if('6'<=this.hoursHand && '13'>=this.hoursHand){
                this.shiftNumber="Shift1"
                if('8'==this.hoursHand){
                  if('30'<=this.minutesHand && '59'>=this.minutesHand){
                    this.adminOtpPass=true
                    console.log('SHIFTONEmin')
                  } else{
                    this.adminOtpPass=false
                  } 
                }
                

            }
            if('14'<=this.hoursHand && '22'>=this.hoursHand){
              //  this.shiftNumber="Shift3"
                this.shiftNumber="Shift2"  
            }
            if('22'<=this.hoursHand ){
                this.shiftNumber="Shift3"
            }  
            if('0'<=this.hoursHand && '5'>=this.hoursHand){
            this.shiftNumber="Shift3"
            }      
},1000) 
} 
adminTodayRefreshShiftwise=[]
adminTodayshiftwise=[]
@wire(getAdminTodayShiftwise,{adminTimeShift:'$shiftNumber'})
wiredAdminTodayShiftwise(result){
    this.adminTodayRefreshShiftwise=result
    if(result.data){
        this.adminTodayshiftwise=result.data
    }
    if(result.error){
        console.log(result.error)
    }
}

    get shakeImage(){
        if( this.width<=6){
            return this.isAlarmTriggered ? 'shake':''
        }
        if( this.width>=7){
            return this.isAlarmTrigger ? 'shake':''
        }
    }
    width=0
    id
    bittuHandler(){
        var   ringtone= new Audio(BittuOne)
      //  ringtone.play()
      if(ringtone.play()){
        this.isAlarmTriggered=true
    }
   this.width=0
    
      if (this.width>=0) {
    
        this.id=setInterval(() => {
            this.width++; 
        }, 1000);
      }
      
    }

    doc
    doctorUserNameHandler(event){
       this.doc=event.target.value
       var   ringtone= new Audio(Username)
       //  ringtone.play()
       ringtone.play()
        
    }
    handleNavHome(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home"
            }
        }) 
    }
}