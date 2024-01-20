import { LightningElement,wire } from 'lwc';
import getAzComapany from '@salesforce/apex/AzCompanyController.getAzComapany';
import getAzCompanyDate from '@salesforce/apex/AzCompanyController.getAzCompanyDate';
import getAdmin from '@salesforce/apex/AzCompanyController.getAdmin';
import getAdminDaily from '@salesforce/apex/AzCompanyController.getAdminDaily';
import getAdminShiftwise from '@salesforce/apex/AzCompanyController.getAdminShiftwise';
import createAdminShiftwiseRecord from '@salesforce/apex/AzCompanyController.createAdminShiftwiseRecord';
import createAdminDaily from '@salesforce/apex/AzCompanyController.createAdminDaily';
import updateAdmin from '@salesforce/apex/AzCompanyController.updateAdmin';
import updateAdminDaily from '@salesforce/apex/AzCompanyController.updateAdminDaily';
import adminEmailOTP from '@salesforce/apex/AdminEmailController.adminEmailOTP';
import { createRecord } from 'lightning/uiRecordApi';
import heroinsCompressed from '@salesforce/resourceUrl/heroinsCompressed';
import { updateRecord } from 'lightning/uiRecordApi';    
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AZADMIN_OBJECT from '@salesforce/schema/Az_Admin__c'
import AZADMINDAILY_ID from '@salesforce/schema/Az_Admin_Daily__c.Id'
import AZADMINDAILY_VAR from '@salesforce/schema/Az_Admin_Daily__c.Variable__c'
import AZADMINDAILY_SHIFTNAME from '@salesforce/schema/Az_Admin_Daily__c.Shift_Name__c'
import AZADMINDAILY_STATUS from '@salesforce/schema/Az_Admin_Daily__c.Status_Pro__c'
//Status__c,Login_Time__c,Logout_Time__c
import AZCOM_OBJECT from '@salesforce/schema/Az_Company_Date__c'
import AZCOM_NAME from '@salesforce/schema/Az_Company_Date__c.Name'
import AZSHIFT_OBJECT from '@salesforce/schema/Az_Company_Shift__c'
import AZSHIFT_NAME from '@salesforce/schema/Az_Company_Shift__c.Name'
import AZSHIFT_SHIFTNAME from '@salesforce/schema/Az_Company_Shift__c.Shift_Name__c'
import AZSHIFT_TIME from '@salesforce/schema/Az_Company_Shift__c.Shift_Timings__c'
import AZSHIFT_COMID from '@salesforce/schema/Az_Company_Shift__c.AZ_Company_Date__c'
import AZAD_ID from '@salesforce/schema/Az_Admin__c.Id'
import AZAD_PASS from '@salesforce/schema/Az_Admin__c.Enter_Password__c'
import AZAD_REPASS from '@salesforce/schema/Az_Admin__c.Re_Enter_Password__c'
import AZAD_SHNAME from '@salesforce/schema/Az_Admin__c.Shift_Name__c'
import AZAD_SHDATE from '@salesforce/schema/Az_Admin__c.Shift_Date__c'
import AZLogo from '@salesforce/resourceUrl/AZLogo'
import AZLogoOne from '@salesforce/resourceUrl/AZLogoOne'
import MutliWorkRemovebg from '@salesforce/resourceUrl/MutliWorkRemovebg'
import ThreeDPainterRemovebg from '@salesforce/resourceUrl/ThreeDPainterRemovebg'
const columns=[{label:"Name",fieldName:"Name"},{label:"Login Time",fieldName:"Login_Time__c"},
{label:"Logout Time",fieldName:"Logout_Time__c"},{label:"Shift Name",fieldName:"Shift_Name__c"}
,{label:"Status",fieldName:"Status_Pro__c"},{label:"Work",fieldName:"Work__c"}, { type: "button", typeAttributes: {  
    label:{fieldName:"buttonAllot"},  
    name: 'Edit',  
    title: 'Edit',  
    disabled: {fieldName:"buttonDisable"},  
    value: 'Edit', 
    //iconName:'utility:file', 
    iconPosition: 'left'  
} }]
//    Name,Full_Name__c,Phone__c,Email__c,Image__c,Work__c,Variable__c]
//,{label:"Image",fieldName:"Image__c"}
export default class AzAdminHome extends LightningElement {
    staffAnu=heroinsCompressed+'/Anushka.jfif';
    AZLogo=AZLogo
    AZLogoOne=AZLogoOne
    MutliWorkRemovebg=MutliWorkRemovebg
    ThreeDPainterRemovebg=ThreeDPainterRemovebg
    ///resource/1704010588000/heroinsCompressed
    columns=columns
    todaya
    todayShiftDate
    getDate
    shiftVariableName
    shiftVariableId
    shiftVariableShiftName
    dlen=-1
    shiftDate=0
    shedArray=[]
    companyData=[]
    get selectedToday(){
        let today = new Date();
   today.setDate(today.getDate()+0); 
   console.log('pre',  today.toISOString().split('T')[0]);
        return this.getDate?this.getDate:today.toISOString()
}
    connectedCallback(){
        this.todaya= new Date().toISOString()
        this.todayShiftDate=new Date().toISOString().split('T')[0]
        console.log( 'imgStatic',heroinsCompressed)
    }  
    hangeDateHandler(event){
        this.getDat=event.target.value
        console.log('handle',event.target.value)
    }  
    
    navigateToPrevious() {
       let today = new Date();
       this.shiftDate--  
  today.setDate(today.getDate() + this.shiftDate); 
  console.log('pre',  today.toISOString().split('T')[0]);
  this.getDate= today.toISOString().split('T')[0]
      }
    comShift=-1
      navigateToNext() {   
        let today = new Date();
        this.shiftDate++
        // Change the date by adding 1 to it (today + 1 = tomorrow)
         today.setDate(today.getDate() + this.shiftDate);
        console.log('nex',  today.toISOString().split('T')[0]);
        this.getDate= today.toISOString().split('T')[0]
      }
    
      navigateToToday() {
this.shiftDate=0
        let today = new Date();
         today.setDate(today.getDate()+this.shiftDate);
        console.log('hjjjjjhhh',  today.toISOString().split('T')[0]);
        this.getDate= today.toISOString().split('T')[0]
      
      }
      navigateToPreviousShift(){
        this.comShift--
        this.shiftVariableId=this.companyData.AZ_Company_Shift__r[this.comShift].Id
        this.shiftVariableName=this.companyData.AZ_Company_Shift__r[this.comShift].Name
        this.shiftVariableShiftName=this.companyData.AZ_Company_Shift__r[this.comShift].Shift_Name__c
        console.log('preS',this.companyData.AZ_Company_Shift__r[this.comShift].Name, this.shiftVariableShiftName);

      }
      navigateToNextShft(){
        this.comShift++
        this.shiftVariableId=this.companyData.AZ_Company_Shift__r[this.comShift].Id
        this.shiftVariableName=this.companyData.AZ_Company_Shift__r[this.comShift].Name
        this.shiftVariableShiftName=this.companyData.AZ_Company_Shift__r[this.comShift].Shift_Name__c
      console.log('nexS',this.companyData.AZ_Company_Shift__r[this.comShift].Id, this.shiftVariableShiftName);
      }

@wire(getAzComapany,{companyDate:'$getDate'})
wiredComapany(result){
    if(result.data){
this.companyData=result.data[0]
        console.log('company',result.data[0])
    }
    if(result.error){
        console.log(result.error)
    }
}
@wire(getAzCompanyDate,{companyShift:'$shiftVariableId'})
wiredComapanyDate(result){
    if(result.data){
        console.log('company',result.data)
    }
    if(result.error){
        console.log(result.error)
    }
}

adminData=[]
adminDailyData=[]
adminRefreshDailyData
@wire(getAdminDaily,{adminDailyData:'$companyData.Id'})
wiredAdminDaily(result){
    this.adminRefreshDailyData=result
    if(result.data){
this.adminDailyData=result.data.map((record)=>{
    let buttonAllot=record.Work__c==="Assign"?"Assign":"Free"
    let buttonDisable=record.Work__c==="Assign"? true:false;
    return{
        ...record,
        buttonAllot:buttonAllot,
        buttonDisable:buttonDisable
    }
})
        console.log('Admin',result.data)
    }
    if(result.error){
        console.log(result.error)
    }}
    adminRefreshData =[]
@wire(getAdmin)
wiredAdmin(result){
    this.adminRefreshData=result
 if(result.data){
 this.adminData=result.data
 }
    if(result.error){
        console.log(result.error)
    }
}
shiftwiseDataAdmin=[]
shiftwiseRefreshDataAdmin=[]
@wire(getAdminShiftwise)
wiredAzGetAdminShiftwise(result){
    this.shiftwiseRefreshDataAdmin=result
    if(result.data){
        this.shiftwiseDataAdmin=result.data
        console.log('data',result.data)
    }if(result.error){
        console.log(result.error)
    }
}
shId
adminOTPbool=false
adminOTPDataName
adminOTPDataImage
adminToogleChangeHandler(event){
    console.log('qqqq')
this.adminData.filter(ad=>{
    if(event.target.value===ad.Password__c){
       // a0U5j000008gxDAEAY
        console.log('ad',ad)
        this.adminDailyData.filter(add=>{
            if(ad.Id===add.Admin_Id__c){
                console.log('add',JSON.stringify(add))
                this.adminOTPDataName=add.Name
                this.adminOTPDataImage=add.Image__c
        this.adminOTPbool=true
this.shId=add.Id
            
            }
        })
    }
})
}
inputOTPReset
closeShiftOTPHandler(){
    this.template.querySelector('lightning-input[data-name="otp"]').value = null;
   //this.inputOTPReset=''
    this.adminOTPbool=false
    this.adminOTPDataName=''
}
deleteShiftHandlerOTP(){
    const admDaily={
        Id:this.shId,
    Variable__c:"",Shift_Name__c:"",Status_Pro__c:""
       } 
       //a0f5j000003IiORAA0
       updateAdminDaily({updateAdminDailyData:admDaily}).then(result=>{
        this.shiftwiseDataAdmin.filter(asd=>{
            if(this.shId ===asd.AZ_Admin_Daily__c){
                console.log('asdfghgfds',asd.AZ_Admin_Daily__c)
                deleteRecord(asd.Id).then(result=>{
                    this.template.querySelector('lightning-input[data-name="otp"]').value = null;
                    refreshApex(this.adminRefreshDailyData )
                    refreshApex(this.shiftwiseRefreshDataAdmin)
                })
            }
          
        })


        })
}
onClickHandler(){
    console.log(JSON.stringify(Array(2).fill(1)))
    let arr=Array(1).fill(1)
    arr.forEach(a=>{
        let today = new Date();
         today.setDate(today.getDate()+(this.dlen+=a));
        console.log('multi',  today.toISOString().split('T')[0]);
        this.shedArray.push(today.toISOString())
        console.log('jj', JSON.stringify(this.shedArray))
    const fields={}
    fields[AZCOM_NAME.fieldApiName]= today.toISOString().split('T')[0]
    const recordInput = { apiName: AZCOM_OBJECT.objectApiName, fields };
    createRecord(recordInput)
        .then(comapanyDate => {
            console.log('0')
            const acc=comapanyDate.id
            const accId=comapanyDate.id
            console.log('acc',acc)

           
const fields={}
const arrShfit=[{"shift":"Shift1","time":"6:00:00-13:59:59"},
{"shift":"Shift2","time":"14:00:00-21:59:59"},
{"shift":"Shift3","time":"22:00:00-5:59:59"}]
arrShfit.forEach(ar=>{
    fields[AZSHIFT_NAME.fieldApiName]=ar.shift
    fields[AZSHIFT_SHIFTNAME.fieldApiName]=ar.shift
    fields[AZSHIFT_TIME.fieldApiName]=ar.time
    fields[AZSHIFT_COMID.fieldApiName]=acc
    console.log('ac11',acc)
console.log('1')
const recordInput = { apiName: AZSHIFT_OBJECT.objectApiName, fields };
createRecord(recordInput)
.then(comapanyShift => {
   

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
})
this.adminData.forEach(ad=>{
    const adminDataDaily={
        Name:ad.Name,Full_Name__c:ad.Full_Name__c,First_Name__c:ad.First_Name__c,
        Toogle__c:ad.Toogle_Name__c,Variable__c:ad.Variable__c,Last_Name__c:ad.Last_Name__c,
        Phone__c:ad.Phone__c,Email__c:ad.Email__c ,Image__c:ad.Image__c,
         AZ_Company_Date__c:accId,Admin_Id__c:ad.Id
                }
                createAdminDaily({adminDailyData:adminDataDaily}).then(result=>{
                    console.log('adminDaily')
                    refreshApex(this.adminRefreshDailyData ) 
}) 
}) 
}) 
})     
}

callRowAction( event ) {         
    const recId =  event.detail.row.Id;
    console.log( 'call Row',recId,event.detail.row.Name)  
  //  const actionName = event.detail.action.name; 

  const actionName = event.detail.action.name;  
  if ( actionName === 'Edit'&& this.shiftVariableId ) { 
    const fields = {};
    fields[AZADMINDAILY_ID.fieldApiName] = recId;
    fields[AZADMINDAILY_VAR.fieldApiName] ="Assign"
    fields[AZADMINDAILY_SHIFTNAME.fieldApiName]=this.shiftVariableShiftName
    fields[AZADMINDAILY_STATUS.fieldApiName]="Absent"
    const recordInput = { fields };
    console.log(recordInput);
    updateRecord(recordInput)
        .then(() => {
          let  digits = '0123456789';
let OTP = '';
for (let i = 0; i < 6; i++) {
    OTP +=digits[Math.floor(Math.random() * 10)];
}
            const fields = {};
            fields[AZAD_ID.fieldApiName] =event.detail.row.Admin_Id__c;
            fields[AZAD_PASS.fieldApiName]=OTP
            fields[AZAD_REPASS.fieldApiName]=OTP
            fields[AZAD_SHDATE.fieldApiName]=this.todayShiftDate
            fields[AZAD_SHNAME.fieldApiName]=this.shiftVariableShiftName
            const recordAdmin = { fields };
            updateRecord(recordAdmin)
                .then((recordPass) => {
                    console.log("OTPPPP",recordPass)
                    const passOTP=recordPass.fields.Password__c.value
            adminEmailOTP({adminEmail:event.detail.row.Email__c,adminShift:this.shiftVariableShiftName,
                adminName:event.detail.row.Full_Name__c,adminOtp:passOTP}).then(result=>{

              
            const admin={
                Name:event.detail.row.Name,
                Full_Name__c:event.detail.row.Full_Name__c,Phone__c:event.detail.row.Phone__c,
                Email__c:event.detail.row.Email__c,Image__c:event.detail.row.Image__c,
                Shift_Name__c:this.shiftVariableShiftName,Toogle__c:"No",
                AZ_Company_Shift__c:this.shiftVariableId,
                AZ_Admin_Daily__c:event.detail.row.Id
            }
            createAdminShiftwiseRecord({adminShiftwiseData:admin}).then(result=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Admin shifts created',
                        variant: 'success',
                    }), 
                    refreshApex(this.adminRefreshDailyData ) ,
                    refreshApex(this.adminRefreshData)
                       
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
             
           
           })
          
        })
        })
   }
 // Id,Name,Full_Name__c,Phone__c,Email__c,Image__c,AZ_Company_Shift__c,AZ_Admin__c FROM AZ_Admin_Shiftwise__c    
    
 
}
selectCheck=[]
getSelectedRow(){
    this.selectCheck=this.template.querySelector("lightning-datatable").getSelectedRows()
    if(this.selectCheck.length===1){

    }else{
        this.selectCheck=[]
    }
}
}