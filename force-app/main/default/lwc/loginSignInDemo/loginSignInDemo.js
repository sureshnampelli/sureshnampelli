import { LightningElement,wire,track } from 'lwc';
import loginSignInFilter from '@salesforce/apex/LoginApex.loginSignInFilter';
import attendanceRegister from '@salesforce/apex/LoginApex.attendanceRegister';
import saveFileAttendance from '@salesforce/apex/HospitalAttendanceCsvController.saveFileAttendance';
import loginRecords from  '@salesforce/apex/LoginApex.loginRecords';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class LoginSignInDemo extends NavigationMixin(LightningElement){
nameUser
    signInResult
    passLogin
    jobRole
    loginImage
    FullName
    LoginTime
    LoginData=[]
    attendeanceData=[]
@wire(attendanceRegister)
wiredAttendeance({data,error}){
    if(data){
        console.log('att',data)
this.attendeanceData=data
    }
if(error){
    console.error(error)
}
}
loginRecordsData=[]
/*@wire(loginRecords)
wiredLoginRecords({data,error}){
    if(data){
        console.log('att',data)
    
var resOne=[]

data.forEach(elm=>{
   
            const ind=resOne.findIndex(obj=>{
                return (obj['Full_Name__c']===elm.Full_Name__c,obj['Login_Time__c']===elm.Login_Time__c,
                obj['Type__c']===elm.Type__c )
             } );
             console.log('b')
            if(ind>=-1){
                resOne.push({
                    
                   
                    "Full_Name__c":elm.Full_Name__c,
                    "Login_Time__c":elm.Login_Time__c,
                    "Type__c":elm.Type__c
                    
                })
            }
        })  
       window.localStorage.setItem('saveLogin',JSON.stringify(resOne))
       this.loginRecordsData =JSON.parse(window.localStorage.getItem('saveLogin'));
    }
if(error){
    console.error(error)
}
}*/
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
            }  
            console.log('a')
          
          /*  const columnDelimiter = ','
            const lineDelimiter = '\r\n'
            const actualHeaderKey = Object.keys(this.accountHeaders)
            const headerToShow = Object.values(this.accountHeaders)
           
           console.log(JSON.stringify(Object.values(this.accountHeaders)));
            
           console.log('KLK',JSON.stringify(Object.keys(this.accountHeaders)));
           
           let str = ''
            str+=headerToShow.join(columnDelimiter)
            str+=lineDelimiter
            const data = typeof this.LoginData !=='object' ? JSON.parse(this.LoginData):this.LoginData
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
           console.log('jjbn',str)



          
           var arr=[]
           this.attendeanceData.forEach(o=>{
            console.log('for',JSON.stringify(o.Full_Name__c))
            var ind = this.loginRecordsData .findIndex(element=>{
                return element.Full_Name__c==o.Full_Name__c;
             })
             if(ind!==-1){
                this.loginRecordsData .splice(ind, 1)
             }
             window.localStorage.setItem('record',JSON.stringify(this.loginRecordsData))
             this.loginRecordsData=JSON.parse(window.localStorage.getItem('record'));
             console.log('chiru',JSON.stringify(this.loginRecordsData))
            if(o.Full_Name__c==this.FullName){
                console.log('lkjhgf')
                arr.push(this.FullName)
            }
           })
           console.log('jjbn',arr.length)
           if(arr.length===0){
            console.log(arr.length)

            
             console.log('record',JSON.stringify(this.loginRecordsData ))
            saveFileAttendance({ base64Data: JSON.stringify(str), cdbId: this.recordid})
           
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
         
           }*/
          
        
           
            }
            
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
            closeHandler(event){
                const myEvent=new CustomEvent('close',{detail: event.target.name} )
                this.dispatchEvent(myEvent) 
            }
           
 
            
            accountHeaders={
    
                Full_Name__c:"Full Name",
                Login_Time__c:"Login Time",
                Post__c:"Post",
               
            
            }
            
        

}