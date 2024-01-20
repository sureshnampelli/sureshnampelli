import { LightningElement,wire } from 'lwc';
import getDoctorsLogin from '@salesforce/apex/HospitalApexFour.getDoctorsLogin';
import getPatientEnquiry from '@salesforce/apex/HospitalApexFour.getPatientEnquiry'
import loginSignInFilter from '@salesforce/apex/LoginApex.loginSignInFilter';
import ENQUIRY_OBJECT from '@salesforce/schema/Enquiry__c'
import FIRSTNAME from '@salesforce/schema/Enquiry__c.First_Name__c'
import LASTNAME from '@salesforce/schema/Enquiry__c.Last_Name__c'
import PHONE from '@salesforce/schema/Enquiry__c.Phone__c'
import EMAIL from '@salesforce/schema/Enquiry__c.Email__c'
import AGE from '@salesforce/schema/Enquiry__c.Age__c'
import GENDER from '@salesforce/schema/Enquiry__c.Gender__c'
import EN_HD from '@salesforce/schema/Enquiry__c.Hospital_Doctor__c'
import DOCTORNAME from '@salesforce/schema/Enquiry__c.Doctor_Name__c'
import PASSWORD from '@salesforce/schema/Enquiry__c.Password__c'
//import AGE from '@salesforce/schema/Enquiry__c.Age__c'
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { NavigationMixin } from 'lightning/navigation'
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import EnquiryBack from '@salesforce/resourceUrl/EnquiryBack'
import DoctorLogo from '@salesforce/resourceUrl/DoctorLogo'
export default class HospitalPatientEnquiry extends NavigationMixin(LightningElement) {
    enquiryback=EnquiryBack
    genImage
    doctorName
    doctorId
    doctorFee
    doctorType
    patientLoginShow=true
    doctorLoginShow=false
    adminLoginShow=false
    nameUser
    signInResult
    passLogin
    jobRole
    loginImage
    FullName
    LoginTime
    patientLoginDiv(){
       
        if( this.patientLoginShow===false) {
            if(this.doctorLoginShow===true && this.adminLoginShow===false ){
                this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
                this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin") 
              //  this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
                this.patientLoginShow=true
                this.doctorLoginShow=false
                //this.adminLoginShow=false
            } if(this.doctorLoginShow===false && this.adminLoginShow===true ){
                this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
                //this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin") 
                this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
                this.patientLoginShow=true
               // this.doctorLoginShow=false
                this.adminLoginShow=false
            }
          
        } /*else{
            this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
this.patientLoginShow=true
        }*/
    }
    doctorLoginDiv(){

if( this.doctorLoginShow===false){
    if( this.patientLoginShow===true && this.adminLoginShow===false){
        this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
        this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin")
       // this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
        this.doctorLoginShow=true
        this.patientLoginShow=false
       // this.adminLoginShow=false
    }
    if( this.patientLoginShow===false && this.adminLoginShow===true){
       // this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
        this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin")
        this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
        this.doctorLoginShow=true
       // this.patientLoginShow=false
        this.adminLoginShow=false
    }
}/*else{
    this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
    this.doctorLoginShow=false
    this.patientLoginShow=true
}*/
    }
adminLoginDiv(){
    if( this.adminLoginShow===false){
        if( this.patientLoginShow===true && this.doctorLoginShow===false){
        this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
       // this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin")
        this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
        this.adminLoginShow=true
        this.patientLoginShow=false
       // this.doctorLoginShow=false
    }
        if( this.patientLoginShow===false && this.doctorLoginShow===true){
           // this.template.querySelector(".divOne").classList.toggle("myPatientLogin") 
            this.template.querySelector(".divTwo").classList.toggle("myDoctorLogin")
            this.template.querySelector(".divThree").classList.toggle("myAdminLogin")
            this.adminLoginShow=true
           // this.patientLoginShow=false
            this.doctorLoginShow=false}
    }
}
doctorsLoginData=[]
@wire(getDoctorsLogin)
wiredDoctorsLog({data,error}){
    if(data){
        console.log('doc log',data)
        this.doctorsLoginData=data

    }
    if(error){
        console.error(error)
    }
}
doctorLoginDataToLwc=[]
doctorUserNameHandler(event){
    this.doctorsLoginData.filter(doc=>{
        if(doc.Name===event.target.value){
this.doctorLoginDataToLwc=doc;

        }
    })
}
doctorLoginPass=[]
doctorPasswordHandler(event){
    if( this.doctorLoginDataToLwc.Patient_Name__c===event.target.value){
this.doctorLoginPass=this.doctorLoginDataToLwc.Patient_Name__c
    }
}
doctorLoginShow=false
loginDoctorHandler(){
    if(this.doctorLoginPass){
        this.navigateToDoctor()
    }
}

navigateToDoctor(){
    var defination={
        componentDef:'c:hospitalDoctorNavigation',
        attributes: {
            doctorProfile :this.doctorLoginDataToLwc

        }
    
    }
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:'/one/one.app#'+btoa(JSON.stringify(defination))
        }
    })
}

    patientEnquiryData=[]
    @wire(getPatientEnquiry)
    wiredPatientEnq({data,error}){
        if(data){
            console.log('patient enq',data)
            this.patientEnquiryData=data
        }
        if(error){
            console.error(error)
        }
    }
    
    patientSighinData=[]
    
    userNameChangeHandler(event){
this.patientEnquiryData.filter(res=>{
    if(res.Email__c===event.target.value){
this.patientSighinData=res

console.log('res',res)
    }
})
    }
    passforEntry
    passwordChangeHandler(event){
if(this.patientSighinData.Password__c===event.target.value){
    console.log('pass',event.target.value)
    this.passforEntry=this.patientSighinData.Password__c
}


    }
    loginHandler(){
        if(this.passforEntry){
            console.log('pas')
            this.navigateToLwc()
        }  
    }
    navigateToLwc(){
        var defination={
            componentDef:'c:hospitalPatientNavigation',
            attributes: {
                patientProfile :this.patientSighinData,

            }
        
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })
    }
   
    get genderType(){
        return [{label:"Male",value:"Male"},{label:"Female",value:"Female"},
        {label:"Others",value:"others"},]
    }
    selectedGenderType="Male"
   /* typeGenderHandler(event){
        this.selectedGenderType=event.target.value
    }*/
    handleCheckboxMale(event){
        console.log('check',event.target.checked,event.target.value)
        this.selectedGenderType=event.target.value
    }
    handleCheckboxFemale(event){
        console.log('check',event.target.checked,event.target.value)
        this.selectedGenderType=event.target.value
    }

    signInShow=false
    alreadyPatientHandler(){
this.signInShow=true
    }
    firstName
    firstNameHandler(event){
this.firstName=event.target.value
    }
    lastName
    lastNameHandler(event){
     this.lastName=event.target.value
    }
    ageValue
    ageHandler(event){
     this.ageValue=event.target.value
    }
    phoneValue
    phoneHandler(event){
     this.phoneValue=event.target.value
    }
    emailValue
    emailHandler(event){
     this.emailValue=event.target.value
    }
    passwordValue
    passwordHandler(event){
     this.passwordValue=event.target.value
    }


    //Name,Fee__c,Doctor_Type__c,Image__c FROM Hospital_Doctor__c WHERE Name=:docName

patientSignUpHandler(){
        var fields={}
        fields[FIRSTNAME.fieldApiName]=this.firstName
        fields[LASTNAME.fieldApiName]=this.lastName
        fields[PHONE.fieldApiName]=this.phoneValue
        fields[EMAIL.fieldApiName]=this.emailValue
        fields[AGE.fieldApiName]= this.ageValue
        fields[PASSWORD.fieldApiName]= this.passwordValue
       // fields[DOCTORNAME.fieldApiName]=this.doctorName
        fields[GENDER.fieldApiName]=this.selectedGenderType
       // fields[EMAIL.fieldApiName]
       // fields[EN_HD.fieldApiName]=this.doctorId
        const recordInputOne = { apiName:ENQUIRY_OBJECT.objectApiName, fields };
        createRecord(recordInputOne)
    .then(acc => { console.log('secon',acc)
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Account created',
            variant: 'success',
        }),      
    );
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

    closeHandler(){
        const myEvent=new CustomEvent('patientclose' )
        this.dispatchEvent(myEvent) 
    }

    filterData
    @wire(loginSignInFilter)
    wiredFilter({data,error}){
        if(data){
            console.log("filter",data)
            this.filterData=data
        }if(error){
            console.error(error)
        }
    }
    handleUserChange(event){
        this.filterData.filter(item=>{
            if(item.User_Name__c===event.target.value){
                console.log('filter',item)
                this.nameUser=item.User_Name__c
                this.loginImage=item.Picture_Url_c__c
                this.jobRole=item.Type__c 
                this.FullName=item.Full_Name__c
                this.LoginTime=item.Login_Time__c
                            console.log('username',item.User_Name__c )
                         this.signInResult=item.Password__c 
            } 
        })
    }
    
       
    
        handlePasswordChange(event){
            this.passLogin=event.target.value              
                }

    submitHandler(event){                    
        //   console.log(`${event.target.name} successfully`)
   console.log(this.signInResult)
       if(this.signInResult === this.passLogin ){
           console.log('login', this.passLogin)               
       
       if(this.jobRole==='Receptionist') {
           console.log('loginsignR',    this.jobRole) 
          // this.LoginData.push({"Full_Name__c":this.FullName,"Login_Time__c":this.LoginTime,"Post__c":this.jobRole})
           this.closeHandler(event)
          this.navigateToLwcReceptionist()
       }
       if(this.jobRole==='LabAssistant') {
           console.log('loginsignR',    this.jobRole) 
           //this.LoginData.push({"Full_Name__c":this.FullName,"Login_Time__c":this.LoginTime,"Post__c":this.jobRole})
           this.closeHandler(event)
           this.navigateToLwcLabAssistant()
       }
       if(this.jobRole==='Pharmacist') {
           console.log('loginsignR',    this.jobRole) 
          // this.LoginData.push({"Full_Name__c":this.FullName,"Login_Time__c":this.LoginTime,"Post__c":this.jobRole})
           this.closeHandler(event)
           this.navigateToLwcPharamasy()
       }
       if(this.jobRole==='Management') {
           console.log('loginsignR',    this.jobRole) 
          
          // this.LoginData.push({"Full_Name__c":this.FullName,"Login_Time__c":this.LoginTime,"Post__c":this.jobRole})
           this.closeHandler(event)
           this.navigateToLwcPharmaManager()
       }
       if(this.jobRole==='Admin') {
        console.log('loginsignR',    this.jobRole) 
       
       // this.LoginData.push({"Full_Name__c":this.FullName,"Login_Time__c":this.LoginTime,"Post__c":this.jobRole})
        this.closeHandler(event)
        this.navigateToLwcAdmin()
    }
       }  
       console.log('a')}

       navigateToLwcReceptionist(){
        var defination={
            componentDef:'c:hTR',
            attributes: {
                staffUserName : this.nameUser,
                staffImage:this.loginImage,
                staffJobRole:this.jobRole

            }
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })             
    }

    navigateToLwcLabAssistant(){
        var defination={
            componentDef:'c:hospitalLab',
             attributes: {
                staffUserName : this.nameUser,
                staffImage:this.loginImage,
                staffJobRole:this.jobRole

            }
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })
       
    }

    navigateToLwcPharamasy(){
        var defination={
            componentDef:'c:hospitalAllotedMedicine',
            attributes: {
                staffUserName : this.nameUser,
                staffImage:this.loginImage,
                staffJobRole:this.jobRole

            }
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })             
    }

    navigateToLwcPharmaManager(){
        var defination={
            componentDef:'c:hospitalPharmaManager',
            attributes: {
                staffUserName : this.nameUser,
                staffImage:this.loginImage,
                staffJobRole:this.jobRole

            }
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })             
    }

    navigateToLwcAdmin(){
        var defination={
            componentDef:'c:hospitalAdminNavigation',
            attributes: {
                staffUserName : this.nameUser,
                staffImage:this.loginImage,
                staffJobRole:this.jobRole

            }
        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })   
    }
   /* closeHandler(event){
        const myEvent=new CustomEvent('close',{detail: event.target.name} )
        this.dispatchEvent(myEvent) 
    }*/
   

    
}




