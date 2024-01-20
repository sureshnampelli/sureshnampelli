import { LightningElement ,wire,track } from 'lwc';
import Recepnist from '@salesforce/resourceUrl/Recepnist'
import LabAssistant from '@salesforce/resourceUrl/LabAssistant'
import PatientLogin from '@salesforce/resourceUrl/PatientLoginRemovebg';
import getImages from '@salesforce/apex/LoginApex.getImages';
import herocompressed from '@salesforce/resourceUrl/herocompressed';
import HospitalStaff  from '@salesforce/resourceUrl/Hospital_Staff';
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import apexLow from '@salesforce/resourceUrl/apexBottom';
import locationLogo from '@salesforce/resourceUrl/locationLogo';
import apexMain from '@salesforce/resourceUrl/apexMainOne';
import loginLogo from '@salesforce/resourceUrl/loginLogo';
import signupOne from '@salesforce/resourceUrl/signupOne';
import chiruMega from '@salesforce/resourceUrl/chiruMega';
import homeLogo from '@salesforce/resourceUrl/homeLogo';
import apexMainMiddle from '@salesforce/resourceUrl/apexMainMiddle';
import { NavigationMixin } from 'lightning/navigation';
export default class LoginFormDemo extends  NavigationMixin(LightningElement) {
    hospitalRemovebg=hospitalremovebg
    homelogo=homeLogo
    patientlogin=PatientLogin
    loginlogo=loginLogo
    signupone=signupOne
    locationlogo=locationLogo
    apexMainmiddle=apexMainMiddle
    apexmain=apexMain
    apexlow=apexLow
    chirumega=chiruMega
staffNag=herocompressed+'/nagarjuna.jpg';
staffSree=herocompressed+'/akhil.jpg';
staffBALA=herocompressed+'/balakrishna.jpg';
staffCHIRU=herocompressed+'/chiranjeevi.jpg';
staffSUNIL=herocompressed+'/maheshbabu.jpg';
   RECE=Recepnist
   LAB=LabAssistant
@track allRecordsFromDocumentObject=[]
    sfdcBaseURL
    @track imagesArray=[]
    showLoginSignUp=false
    showLogin=false
    showLab=false
    showRece=false
    showMap=false
    username
    @track imageSignIn
    loginForm=true
imageGroup=[{name:'Lab', Url:this.LAB ,id:1},{name:'Rece',Url:this.RECE,id:2}]
toggleIconName = '';toggleButtonLabel 
       
toggleIconSignUp='' 
toggleIconHome = ''
toggleIconLocation=''
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
         this.showLogin=true
         this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
     }else {
         this.toggleIconName = 'preview';
         this.showLogin=false
         this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
     }
 }

 handleSignUpClick(){
    const contentBlockClass = this.template.querySelector(
        '.Imagesing'
    ).classList;
    // toggle the hidden class
    contentBlockClass.toggle('slds-rise-from-ground');

    // if the current icon-name is `utility:preview` then change it to `utility:hide`
    if (this.toggleIconSignUp === 'preview') {
        this.toggleIconSignUp = '';
        this.showLoginSignUp=true 
       
    }else {
        this.toggleIconSignUp = 'preview';
        this.showLoginSignUp=false
       
    }
 }

 handleToggleHomeClick(){
    const contentBlock = this.template.querySelector(
        '.homeone'
    ).classList;
    // toggle the hidden class
    contentBlock.toggle('slds-rise-from-ground');

    // if the current icon-name is `utility:preview` then change it to `utility:hide`
    if (this.toggleIconHome === 'preview') {
        this.toggleIconHome = '';
      this.handleNavHome()
       
    }else {
        this.toggleIconHome = 'preview';
        
       
    }
    
 }

 showPatientLogin=false
 goPatientLogin(){
    this.showPatientLogin=true
 }
 closePatientHandler(){
    this.showPatientLogin=false
 }
handleNavHome(){
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home"
        }
    }) 
}
locationtoggleHandler(){
    const contentBlock = this.template.querySelector(
        '.locatonToggle'
    ).classList;
    // toggle the hidden class
    contentBlock.toggle('slds-rise-from-ground');

    // if the current icon-name is `utility:preview` then change it to `utility:hide`
    if (this.toggleIconLocation === 'preview') {
        this.toggleIconLocation = '';
      this.handleClickMaps()
      this.showMap=true
       
    }else {
        this.toggleIconLocation = 'preview';
        this.showMap=false
       
    } 
}
zoomlevel = "1";
lstMarkersOne=[]
DistanceBetween
handleClickMaps(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

        // Get the Latitude and Longitude from Geolocation API
           var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
           
            console.log('logoo',latitude,longitude)
            // Add Latitude and Longitude to the markers list.
            const lon1 = longitude*Math.PI / 180;
            const lon2 = 79.611360*Math.PI / 180;
            const lat1 =latitude*Math.PI / 180;
            const lat2 =17.974510*Math.PI / 180;
           console.log(lat1,lat2,lon1,lon2)
           // Haversine formula 
           var dlon = lon2-lon1; 
           var dlat = lat2-lat1;
           console.log(dlat,dlon)
           var a = Math.pow(Math.sin(dlat / 2), 2)
               + Math.cos(lat1) * Math.cos(lat2)
               * Math.pow(Math.sin(dlon / 2),2);
             console.log(a)
           var c = 2 * Math.asin(Math.sqrt(a));
           console.log('c',c)
           // Radius of earth in kilometers. Use 3956 
           // for miles
           var r = 6371;
           
           // calculate the result
           this.DistanceBetween=c*r;

                    this.lstMarkersOne.push({"location":{"Latitude":17.974510,"Longitude":79.611360},"title":"Apex Hospital"},{"location":{"Latitude":latitude,"Longitude":longitude},"title":"You are here"})
            console.log('arr',JSON.stringify(this.lstMarkersOne))
        window.localStorage.setItem('local',JSON.stringify(this.lstMarkersOne))
        this.lstMarkersOne=JSON.parse(window.localStorage.getItem('local'));
            this.zoomlevel = "4";
        });
    }
}


 /*   handleUserChange(event){
        this.filterHandler(event.detail)
        loginSignIn({userName:event.detail}).then(result=>{     
            console.log('loginform',   result)
           /* if(result[0].Type__c==='LabAssistant'){
                this.imageSignIn=result[0].Picture_Url_c__c
                console.log('ims', this.imageSignIn)
                this.showLab=true
                this.loginForm=false
               
            }
            if(result[0].Type__c==='Receptionist'){
                this.imageSignIn=result[0].Picture_Url_c__c
                console.log('ims', this.imageSignIn)
                this.showRece=true
                this.loginForm=false
               
            }
            this.nameUser=result[0].User_Name__c
            console.log('username',result[0].User_Name__c )
         this.signInResult=result[0].Password__c 
this.jobRole=result[0].Type__c                         
        })
    } */
    imagesstaffArray=[]
    connectedCallback(){
        this.sfdcBaseURL=window.location.origin;
    console.log('img',herocompressed)
   // this.allRecordsFromDocumentObject=HospitalStaff;
   // let documentRecords=this.allRecordsFromDocumentObject;

            this.imagesstaffArray.push({ url:HospitalStaff+'/NAG.jpg'})
        
    
    }
   

    @wire(getImages)
    wiredImages({data,error}){
        this.sfdcBaseURL=window.location.origin;
        if(data){
            console.log('images',data)
            this.allRecordsFromDocumentObject=data;
            let documentRecords=this.allRecordsFromDocumentObject;
            documentRecords.forEach(element=>{
                    this.imagesArray.push({ url:this.sfdcBaseURL+'/servlet/servlet.FileDownload?file='+element.Id, Name:element.Name})
                
            })
        }
if(error){
    console.error(error)
}
    }
   
filterHandler(data){
 window.localStorage.setItem('set',data)
 this.imageSignIn= this.imageGroup.filter(item=>{
    const val= window.localStorage.getItem('set')
    console.log('va',val)
    if(val===item.name){
      return  item.Url
    
    }
  })  
}


    handleClick(){
        this.showLogin=true
    }
    closeHandler(event){
        this.username=event.detail
        console.log('closename',this.username,event.detail)
      //  this.handleUserChange(event)
      //this.childD=  event.detail.childData[0].User_Name__c*
        this.showLogin=false  
    
    }
   handleClicked(){
        this.showLoginSignUp=true 
    }
    closeHandlered(){
this.showLoginSignUp=false
    }
    loginRecordsData
    @wire(loginRecords)
    wiredLoginRecords(result){
        this.loginRecordsData=result
        if(result.error){
            console.error(error)
        }
    }
    randomcards
    connectedCallback(){
    
            setInterval(()=> {
                this.renCallback()  
            }, 3000);}
            renCallback(){
                this.num = Math.floor(Math.random()*this.loginRecordsData.data.length); // get a random number between 0-9
           
            for(let i=0; i<=this.loginRecordsData.data.length;i++){
                if(this.loginRecordsData.data[i]==this.loginRecordsData.data[this.num]){
                  this.randomcards=this.loginRecordsData.data[i].Picture_Url_c__c
                }
            } 
            }
    
}