import { LightningElement,wire } from 'lwc';
import getAdmin from '@salesforce/apex/AzCompanyController.getAdmin';
import getAdminTodayShiftwise from '@salesforce/apex/AzCustomerController.getAdminTodayShiftwise';
import getAzChat from '@salesforce/apex/AzChartController.getAzChat';
import createAzChat from '@salesforce/apex/AzChartController.createAzChat';
import updateAzChat from '@salesforce/apex/AzChartController.updateAzChat';
import getSearchAzChat from '@salesforce/apex/AzChartController.getSearchAzChat';
import getAzWorker from '@salesforce/apex/AzWorkerController.getAzWorker';
import createAzWorkerDaily from '@salesforce/apex/AzWorkerController.createAzWorkerDaily';
import searchAzWorkerDaily from '@salesforce/apex/AzWorkerController.searchAzWorkerDaily';
import searchAzWorkerShift from '@salesforce/apex/AzWorkerController.searchAzWorkerShift';
import createAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.createAzWorkerShiftwise';
import updateAzWorkerDaily from '@salesforce/apex/AzWorkerController.updateAzWorkerDaily';
import getEnquiry from '@salesforce/apex/AzCustomerController.getEnquiry';
import getSearchEnquiry from '@salesforce/apex/AzCustomerController.getSearchEnquiry';
import getAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.getAzWorkerShiftwise';
import searchAzEnquiry from '@salesforce/apex/AzCustomerController.searchAzEnquiry';
import getSearchedEnquiryId from '@salesforce/apex/AzCustomerController.getSearchedEnquiryId';
import updateAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.updateAzWorkerShiftwise';
import getSearchAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.getSearchAzWorkerShiftwise';
import adminEmailOTPShiftTime from '@salesforce/apex/AdminEmailController.adminEmailOTPShiftTime';
import updateAzEnquiry from '@salesforce/apex/AzCustomerController.updateAzEnquiry';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AZWD_OBJECT from '@salesforce/schema/AZ_Worker_Date__c'
import AZWD_NAME from '@salesforce/schema/AZ_Worker_Date__c.Name'
import AZWSHIFT_OBJECT from '@salesforce/schema/Az_Worker_Shift__c'
import AZWSHIFT_NAME from '@salesforce/schema/Az_Worker_Shift__c.Name'
import AZWSHIFT_SHIFTNAME from '@salesforce/schema/Az_Worker_Shift__c.Shift_Name__c'
import AZWSHIFT_TIME from '@salesforce/schema/Az_Worker_Shift__c.Shift_Timings__c'
import AZWSHIFT_COMID from '@salesforce/schema/Az_Worker_Shift__c.AZ_Worker_Date__c'
import AZADMINDAILY_ID from '@salesforce/schema/Az_Admin_Daily__c.Id'
import AZADMINDAILY_LOGIN from '@salesforce/schema/Az_Admin_Daily__c.Login_Time__c'
import AZADMINDAILY_STATUS from '@salesforce/schema/Az_Admin_Daily__c.Status_Pro__c'
import AZADMINDAILY_LOGOUT from '@salesforce/schema/Az_Admin_Daily__c.Logout_Time__c'
//Status__c,Login_Time__c,Logout_Time__c
import customerservice from '@salesforce/resourceUrl/customerservice'
import NumbersIcons from '@salesforce/resourceUrl/NumbersIcons'
import CustomerProfileIcons from '@salesforce/resourceUrl/CustomerProfileIcons'
import WorkerIcons from '@salesforce/resourceUrl/WorkerIcons'
import AZLogo from '@salesforce/resourceUrl/AZLogo'
import AZLogoOne from '@salesforce/resourceUrl/AZLogoOne'
import WallOTP from '@salesforce/resourceUrl/WallOTP'
import emoji from '@salesforce/resourceUrl/emojiIcons'
import MutliWorkRemovebg from '@salesforce/resourceUrl/MutliWorkRemovebg'
import updateAdminDaily from '@salesforce/apex/AzCompanyController.updateAdminDaily';
export default class AzAdminNavigation extends LightningElement {
    arrEmojiOne=
    [{img:emoji+'/angry.png',imga:emoji+'/bad.png',imgb:emoji+'/confused.png',imgc:emoji+'/cool.png',imgd:emoji+'/crazy.png',imge:emoji+'/crying.png',imgf:emoji+'/cryingone.png',imgg:emoji+'/cyclops.png'},
       {img:emoji+'/dead.png',imga:emoji+'/eyebrows.png',imgb:emoji+'/furious.png',imgc:emoji+'/girl.png',imgd:emoji+'/graduated.png',imge:emoji+'/happy.png',imgf:emoji+'/hypnotized.png',imgg:emoji+'/inlove.png'}
,{img:emoji+'/nerd.png',imga:emoji+'/nervous.png',imgb:emoji+'/party.png',imgc:emoji+'/pressure.png',imgd:emoji+'/sad.png',imge:emoji+'/shocked.png',imgf:emoji+'/sick.png',imgg:emoji+'/singing.png'}
   ,{img:emoji+'/sleeping.png',imga:emoji+'/smile.png',imgb:emoji+'/surprised.png',imgc:emoji+'/sweat.png',imgd:emoji+'/sweating.png',imge:emoji+'/tongue.png',imgf:emoji+'/ugly.png',imgg:emoji+'/wink.png'}
       ,]
       partyEmoji=emoji+'/party.png'
    customerservice=customerservice
    MutliWorkRemovebg=MutliWorkRemovebg
    AZLogo=AZLogo
    AZLogoOne=AZLogoOne
    WallOTP=WallOTP
    isOpen=false
    chatData
    emojiShow="hide"
    isEmojiHide=false
    chatRefreshData=[]
    adminTodayRefreshShiftwise=[]
    adminTodayShiftwise=[]
    adminCustomerSearchData=[]
    adminCustomerSearchRefrshData=[]
    shiftNumber='';
    hoursHand=''
    isShow=true
    isToggleVariant='warning'
isToggleWork=false
innerCardHeader="Worker Role"
    togglePickListAddressHandler(){
        if(this.isToggleVariant==='warning'){
          this.isToggleVariant='success'
          this.isToggleWork=true
          this.innerCardHeader="Work Location"
        }else{
      this.isToggleVariant='warning'
      this.isToggleWork=false
      this.innerCardHeader="Worker Role"
        }    
      }
      chatCustomerName
    @wire(getAzChat)
    wiredChat(result){
        this.chatRefreshData=result
        if(result.data){
this.chatData=result.data[0]
this.chatCustomerName=result.data[0].Customer_Name__c
console.log('chart',this.chatData,result.data)
        }
        if(result.error){

        }
    }
    inputEmojiChat
    emojiHandleClick(event){
    console.log('emoji',event.currentTarget.dataset.id)
    this.inputEmojiChat=event.currentTarget.dataset.id
    }
    inputNameChat
    chatInputHandler(event){
this.inputNameChat=event.target.value
    }
    chatOutHandler(){
        if(this.chatData.Id && this.chatData.Admin_Chat__c===null ){
            const chatUp={Id:this.chatData.Id,
                AZ_Admin_Shiftwise__c:this.adminTodayShiftwise.Id,Admin_Emoji__c:this.inputEmojiChat,
                AZ_Customer__c:this.chatData.AZ_Customer__c,Admin_Chat__c:this.inputNameChat
            }
            updateAzChat({updateChat:chatUp}).then(result=>{
                this.template.querySelector('lightning-input[data-name="chat"]').value = null;
                this.template.querySelectorAll('lightning-input[data-reset="reset"]').forEach(element => {
                    element.dataset.id = null;
                  });
                  this.inputNameChat=''
                  this.inputEmojiChat=''
                refreshApex(this.chatRefreshData)
                refreshApex(this.adminCustomerSearchRefrshData)
               
            })
        }else{
        const chat={
            AZ_Admin_Shiftwise__c:this.adminTodayShiftwise.Id,Admin_Emoji__c:this.inputEmojiChat,
            AZ_Customer__c:this.chatData.AZ_Customer__c,Admin_Chat__c:this.inputNameChat
        }
        createAzChat({createChat:chat}).then(result=>{
            this.template.querySelector('lightning-input[data-name="chat"]').value = null;      
            this.template.querySelectorAll('lightning-input[data-reset="reset"]').forEach(element => {
                element.dataset.id = null;                
              });
              this.inputNameChat=''
              this.inputEmojiChat=''
            refreshApex(this.chatRefreshData)
            refreshApex(this.adminCustomerSearchRefrshData)
        })}
    }
    connectedCallback(){
        this.today=new Date().toISOString().slice(0,10);
        this.currentTimeHandler()
        setInterval(() => {
            refreshApex(this.adminCustomerSearchRefrshData)
            refreshApex(this.chatRefreshData) 
            refreshApex(this.adminCustomerSearchRefrshData)
        }, 1000);
    }
   
    
  openEmojiHandler(){
        if(this.emojiShow==="hide"){
            this.emojiShow="show"
            this.isEmojiHide=true
        }else{
            this.emojiShow="hide"
            this.isEmojiHide=false
        }
    } 
   chatHandler(){
if( this.isOpen===false){
    this.isOpen=true
}else{
    this.isOpen=false
}
   }
   //slds-align_absolute-center
   @wire(getAdminTodayShiftwise,{adminTimeShift:'$shiftNumber'})
wiredAdminTodayShiftwise(result){
    this.adminTodayRefreshShiftwise=result
    if(result.data){
        this.adminTodayShiftwise=result.data[0]  
        console.log('jjj',this.adminTodayShiftwise)
        console.log('shiftwiseAdminNavigation',result.data)
    }
    if(result.error){
        console.log(result.error)
    }
}
shiftNumberOTP
isOtpShowHide=false
adminTodayRefreshShiftwiseData=[]
adminTodayShiftwiseData=[]
@wire(getAdminTodayShiftwise,{adminTimeShift:'$shiftNumberOTP'})
wiredAdminTodayShiftwiseData(result){
    this.adminTodayRefreshShiftwiseData=result
    if(result.data){
        this.adminTodayShiftwiseData=result.data[0]  
        console.log('jjj',this.adminTodayShiftwiseData)
        console.log('shiftwiseAdminNavigationData',result.data)
    }
    if(result.error){
        console.log(result.error)
    }
}
@wire(getSearchAzChat,{adminId:'$adminTodayShiftwise.Id',customerId:'$chatData.AZ_Customer__c'})
wiredSearchChat(result){
    this.adminCustomerSearchRefrshData=result
    if(result.data){
        this.adminCustomerSearchData=result.data
console.log('chat search',result.data)
    }
    if(result.error){
        console.log(result.error)
    }
}
minutesHand=''
secondsHand=''
//shiftNumber
adminOkOTP=true
adminOtpPass=false
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
        if('13'==this.hoursHand){
            if('54'<=this.minutesHand && '59'>=this.minutesHand && this.adminOkOTP===true){
              this.adminOtpPass=true
              console.log('SHIFTONEmin')
              this.shiftNumberOTP="Shift2"
            } else{
              this.adminOtpPass=false
            } 
          }
    }
            if('14'<=this.hoursHand && '21'>=this.hoursHand){
                this.shiftNumber="Shift2" 
                if('21'==this.hoursHand){
                    if('54'<=this.minutesHand && '59'>=this.minutesHand && this.adminOkOTP===true){
                      this.adminOtpPass=true
                      console.log('SHIFTONEmin')
                      this.shiftNumberOTP="Shift3"
                    } else{
                      this.adminOtpPass=false
                    } 
                  } 
            }
            if('22'<=this.hoursHand ){
                this.shiftNumber="Shift3"
               
            }  
            if('0'<=this.hoursHand && '5'>=this.hoursHand){
            this.shiftNumber="Shift3"
            if('5'==this.hoursHand){
                if('54'<=this.minutesHand && '59'>=this.minutesHand && this.adminOkOTP===true){
                  this.adminOtpPass=true
                  console.log('SHIFTONEmin')
                  this.shiftNumberOTP="Shift1"
                } else{
                  this.adminOtpPass=false
                } 
              }
            }         
},1000) 
}
////////////////////////WORKER//////////////////////// 
//Id,Name,Email__c,Full_Name__c,Last_Name__c,Phone__c,Image__c
columns=[{label:"Name",fieldName:"Name"},
{label:"Email",fieldName:"Email__c"},{label:"Role",fieldName:"Worker_Role__c"},{ type: "button", typeAttributes: {  
    label: {fieldName:"shiftToogleOne"},   name:'Shift1',   title: 'Shift1',  
    disabled:false,  value:'Shift1', 
     iconPosition: 'left' } },
    { type: "button", typeAttributes: {  
        label: {fieldName:"shiftToogleTwo"},   name: 'Shift2',   title: 'Shift2',  
        disabled:false,  value:'Shift2', 
        iconPosition: 'left' },},
        { type: "button", typeAttributes: {  
            label: {fieldName:"shiftToogleThree"},   name:'Shift3',   title:'Shift3',  
            disabled: false,  value:'Shift3', 
             iconPosition: 'left' }},]
todayDate
today
tommorowDate
get selectedToday(){
    return this.today
}
changeDateHandler(event){
    this.todayDate=event.target.value
    let today=new Date(event.target.value)
    today.setDate(today.getDate()+1);
    this.tommorowDate=today.toISOString().split('T')[0]
    console.log('Date',event.target.value,this.tommorowDate)
}
workerData=[]
@wire(getAzWorker)
wiredAzWorker({data,error}){
if(data){

console.log('worker',data)
this.workerData=data
}if(error){
    console.log(error)
}
}
workerVariableData=[]
@wire(getAzWorker)
wiredAzWorkerVariable({data,error}){
if(data){
    
console.log('worker',data)
this.workerVariableData=data.filter((record)=>{
    const VarA=record.Worker_Role__c==="Plumber"?record :
    
    record.Worker_Role__c==="TV Technician"?record:
   record.Worker_Role__c==="Painter"?record:
 record.Worker_Role__c==="Electrician"?record:
   record.Worker_Role__c==="AC Technician"?record:""
    return{
        ...VarA
    }
  
})
//console.log('record nnn varPlumber',JSON.stringify(this.workerVariableData))
}if(error){
    console.log(error)
}
}
dlen=0
shedArray=[]
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
    fields[AZWD_NAME.fieldApiName]= today.toISOString().split('T')[0]
    const recordInput = { apiName:AZWD_OBJECT.objectApiName, fields };
    createRecord(recordInput)
        .then(workerDate => {
            console.log('0')
            const acc=workerDate.id
            const accId=workerDate.id
            console.log('acc',acc)       
const fields={}
const arrShfit=[{"shift":"Shift1","time":"6:00:00-13:59:59"},
{"shift":"Shift2","time":"14:00:00-21:59:59"},
{"shift":"Shift3","time":"22:00:00-5:59:59"}]
arrShfit.forEach(ar=>{
    fields[AZWSHIFT_NAME.fieldApiName]=ar.shift
    fields[AZWSHIFT_SHIFTNAME.fieldApiName]=ar.shift
    fields[AZWSHIFT_TIME.fieldApiName]=ar.time
    fields[AZWSHIFT_COMID.fieldApiName]=acc
    console.log('ac11',acc)
console.log('1')
const recordInput = { apiName: AZWSHIFT_OBJECT.objectApiName, fields };
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
this.workerData.forEach(ad=>{
    const workerDataDaily={
        Name:ad.Name,Full_Name__c:ad.Full_Name__c,
        AZ_Worker__c:ad.Id,Shift_One__c:"No",Shift_Two__c:"No",Shift_Three__c:"No",
       // Toogle__c:ad.Toogle_Name__c,Variable__c:ad.Variable__c,
        Last_Name__c:ad.Last_Name__c,Worker_Role__c:ad.Worker_Role__c,
        Phone__c:ad.Phone__c,Email__c:ad.Email__c ,Image__c:ad.Image__c,
         AZ_Worker_Date__c:accId
                }
                createAzWorkerDaily({enterWorkerDailyData:workerDataDaily}).then(result=>{
                    console.log('workerDaily')
               refreshApex(this.searchWorkDailyRefreshData) 
}) 
}) 
}) 
})     
}
searchWorkDailyData=[]
searchWorkDailyRefreshData=[]
@wire(searchAzWorkerDaily,{workerDailyDateId:'$tommorowDate'})
wiredAzSearchDaily(result){
    this.searchWorkDailyRefreshData=result
    if(result.data){
        console.log('searchwork',result.data)
        this.searchWorkDailyData=result.data.map((record)=>{
            let shiftToogleOne=record.Shift_One__c==="No"?"Available":"SHIFT1"
            let shiftToogleTwo=record.Shift_Two__c==="No"?"Available":"SHIFT2"
            let shiftToogleThree=record.Shift_Three__c==="No"?"Available":"SHIFT3"
            return{
                ...record,
                shiftToogleOne:shiftToogleOne,
                shiftToogleTwo:shiftToogleTwo,
                shiftToogleThree:shiftToogleThree
            }
        })
    }
    if(result.error){
        console.log(result.error)
    }
}
shiftNumberOne=[]
shiftNumberTwo=[]
shiftNumberThree=[]
searchWorkerShiftData=[]
searchWorkerShiftRefreshData=[]
@wire(searchAzWorkerShift,{workerShiftDataName:'$tommorowDate'})
wiredSearchWorkerShift(result){
    this.searchWorkerShiftRefreshData=result
    if(result.data){
        console.log('searchworkShift',result.data)
        this.searchWorkerShiftData=result.data
        result.data.filter(as=>{
            if(as.Shift_Name__c==="Shift1"){
this.shiftNumberOne=as
            }
            if(as.Shift_Name__c==="Shift2"){
             this.shiftNumberTwo=as   
            }
            if(as.Shift_Name__c==="Shift3"){
                this.shiftNumberThree=as
            }
        })
    }
    if(result.error){
        console.log(result.error)
    }
}

toDayPlus
callRowAction( event ) { 
   let  toDate=new Date()
   toDate.setDate(toDate.getDate()+1);
    this.toDayPlus=toDate.toISOString().split('T')[0]      
    const recId =  event.detail.row.Id;
    console.log( 'call Row',recId,JSON.stringify(event.detail.row) ) 
  //  const actionName = event.detail.action.name; 
  const actionName = event.detail.action.name; 
  if( recId){ 
    console.log( actionName)
  if ( actionName === 'Shift1' ) { 
    if(event.detail.row.Shift_One__c==="No"){
        const shiftOne={ Shift_One__c:"Shift1",Id:event.detail.row.Id}
        updateAzWorkerDaily({updateWorkerDaily:shiftOne}).then(result=>{
      const shiftWiseOne={ Admin_Name__c:this.adminTodayShiftwise.Name,AZ_Admin_Shiftwise__c:this.adminTodayShiftwise.Id,
        AZ_Worker__c:event.detail.row.AZ_Worker__c,
        Worker_Phone__c:event.detail.row.Phone__c,
        Worker_Email__c:event.detail.row.Email__c,
        Worker_Image__c:event.detail.row.Image__c,Shift_Name__c:'Shift1',
        AZ_Worker_Daily__c:event.detail.row.Id,Worker_Toogle__c:"Assign",
        Name:event.detail.row.Full_Name__c,Worker_Role__c:event.detail.row.Worker_Role__c,
        AZ_Worker_Shift__c:this.shiftNumberOne.Id,Star_Rating__c:0,
        Admin_Phone__c:this.adminTodayShiftwise.Phone__c,Admin_Email__c:this.adminTodayShiftwise.Email__c,
        Admin_Image__c:this.adminTodayShiftwise.Image__c,Shift_Date__c:this.toDayPlus
       // Customer_Name__c,  AZ_Customer__c, AZ_Enquiry__c
     }
   createAzWorkerShiftwise({createWorkerShiftwse:shiftWiseOne}).then(result=>{
    refreshApex(this.searchWorkDailyRefreshData)
    refreshApex(this.searchWorkerShiftRefreshData)
    refreshApex(this.searchAzWorkerTvTechRefreshData)
    refreshApex(this.searchAzWorkerPainterRefreshData)
    refreshApex(this.searchAzWorkerElectricianRefreshData)
    refreshApex(this.searchAzWorkerAcTechRefreshData)
     refreshApex(this.searchAzWorkerPlumberRefreshData)
    console.log('SHIFT1')
   })
   })
}
   }
   if ( actionName === 'Shift2' ) { 
    if(event.detail.row.Shift_Two__c==="No"){
        const shiftTwo={Shift_Two__c:"Shift2",Id:event.detail.row.Id}
        updateAzWorkerDaily({updateWorkerDaily:shiftTwo}).then(result=>{
            const shiftWiseTwo={ Admin_Name__c:this.adminTodayShiftwise.Name,
                AZ_Admin_Shiftwise__c:this.adminTodayShiftwise.Id,
                AZ_Worker__c:event.detail.row.AZ_Worker__c,
                Worker_Phone__c:event.detail.row.Phone__c,
                Worker_Email__c:event.detail.row.Email__c,Star_Rating__c:0,
                Worker_Image__c:event.detail.row.Image__c,Shift_Name__c:'Shift2',
                AZ_Worker_Daily__c:event.detail.row.Id,Worker_Toogle__c:"Assign",
                Name:event.detail.row.Full_Name__c,Worker_Role__c:event.detail.row.Worker_Role__c,
                AZ_Worker_Shift__c:this.shiftNumberTwo.Id,
                Admin_Phone__c:this.adminTodayShiftwise.Phone__c,
                Admin_Email__c:this.adminTodayShiftwise.Email__c,
        Admin_Image__c:this.adminTodayShiftwise.Image__c,Shift_Date__c:this.toDayPlus
               // Customer_Name__c,  AZ_Customer__c, AZ_Enquiry__c
             }
    createAzWorkerShiftwise({createWorkerShiftwse:shiftWiseTwo}).then(result=>{
        refreshApex(this.searchWorkDailyRefreshData)
        refreshApex(this.searchWorkerShiftRefreshData)
        refreshApex(this.searchAzWorkerTvTechRefreshData)
        refreshApex(this.searchAzWorkerPainterRefreshData)
        refreshApex(this.searchAzWorkerElectricianRefreshData)
        refreshApex(this.searchAzWorkerAcTechRefreshData)
         refreshApex(this.searchAzWorkerPlumberRefreshData)
        console.log('SHIFT2')
      })})
   }}
   if ( actionName === 'Shift3' ) { 
    if(event.detail.row.Shift_Three__c==="No"){
        const shiftThree={Shift_Three__c:"Shift3",Id:event.detail.row.Id}
        updateAzWorkerDaily({updateWorkerDaily:shiftThree}).then(result=>{
            const shiftWiseThree={ Admin_Name__c:this.adminTodayShiftwise.Name,AZ_Admin_Shiftwise__c:this.adminTodayShiftwise.Id,
                AZ_Worker__c:event.detail.row.AZ_Worker__c,
                Worker_Phone__c:event.detail.row.Phone__c,
                Worker_Email__c:event.detail.row.Email__c,Star_Rating__c:0,
                Worker_Image__c:event.detail.row.Image__c,Shift_Name__c:'Shift3',
                AZ_Worker_Daily__c:event.detail.row.Id,Worker_Toogle__c:"Assign",
                Name:event.detail.row.Full_Name__c,Worker_Role__c:event.detail.row.Worker_Role__c,
                AZ_Worker_Shift__c:this.shiftNumberThree.Id,
                Admin_Phone__c:this.adminTodayShiftwise.Phone__c,Admin_Email__c:this.adminTodayShiftwise.Email__c,
        Admin_Image__c:this.adminTodayShiftwise.Image__c,Shift_Date__c:this.toDayPlus
               // Customer_Name__c,  AZ_Customer__c, AZ_Enquiry__c
             }
            createAzWorkerShiftwise({createWorkerShiftwse:shiftWiseThree}).then(result=>{
                refreshApex(this.searchWorkDailyRefreshData)
                refreshApex(this.searchWorkerShiftRefreshData)
                refreshApex(this.searchAzWorkerTvTechRefreshData)
                refreshApex(this.searchAzWorkerPainterRefreshData)
                refreshApex(this.searchAzWorkerElectricianRefreshData)
                refreshApex(this.searchAzWorkerAcTechRefreshData)
                 refreshApex(this.searchAzWorkerPlumberRefreshData)
            console.log('SHIFT3')
            })
        })
       
    } }}
}


/////////////////Customer-Enquiry//////////////////////
searchEnquiryData=[]
searchEnquiryRefreshData=[]
@wire(getEnquiry)
wiredEnquiry(result){
    if(result.data){
console.log('enquiry Data',result.data)
    }if(result.error){
        console.log(result.error)
    }
}
one= NumbersIcons+'/numberone.png'
two= NumbersIcons+'/numbertwo.png'
searchEnqData=[]
columnsOne=[{label:"Name",fieldName:"Name"},{label:"Enquiry Date",fieldName:"Enquiry_Date__c"},
{label:"Role",fieldName:"Worker_Role__c"}]
@wire(searchAzEnquiry,{ searchEnquiryId:'$todayDate'})
wiredSearchEnquiry(result){
    this.searchEnquiryRefreshData=result
    if(result.data){
this.searchEnqData=result.data

        this.searchEnquiryData=result.data.map((record)=>{
            
          let toogleShow=record.Pincode__c===50122?true:false
          //NumbersIcons+'/numberoneR.png':NumbersIcons+'/numbertwoR.png'
            let toogleImageOne=record.Pincode__c===505122?NumbersIcons+'/numberone.png':NumbersIcons+'/numbertwo.png'
        return{
            ...record,
            toogleShow:toogleShow,
            toogleImageOne:toogleImageOne  
        }
        })
        console.log('search Enquiry',result.data)
    }if(result.error){
        console.log(result.error)
    }
}

recordToogleId
selectedRecords=[]
handleRowAction(){
    this.selectedRecords =this.template.querySelector('[data-id="datarow"]').getSelectedRows();
    
    if(this.selectedRecords.length===1){
        console.log('selectedrows',JSON.stringify(this.selectedRecords))
        this.recordToogleId=this.selectedRecords[0].Id
        if(this.selectedRecords[0].Worker_Role__c){
            let sea=this.selectedRecords[0].Worker_Role__c
            if(sea.indexOf("Plumber")>=0){
              this.isPlumber=true
            }
            if(sea.indexOf("AC Technician")>=0){
                this.isAcTech=true
              }
              if(sea.indexOf("Electrician")>=0){
                this.isElectrician=true     
              }
              if(sea.indexOf("Painter")>=0){
               this.isPainter=true
              }
              if(sea.indexOf("TV Technician")>=0){
              this.isTvTech=true
              }
            }
       
        
    }else if(this.selectedRecords.length===0){
        refreshApex(this.searchedEnquiryRefreshData)
        this.recordToogleId
        this.selectedRecords=[]
        this.isAcTech=false
        this.isElectrician=false
        this.isPainter=false
        this.isPlumber=false
        this.isTvTech=false
    }
    
}

/*tableRowHandler(event){
    console.log('AZCUSTOMER',event.currentTarget.dataset.id)
    this.recordToogleId=event.currentTarget.dataset.id
}*/

AzWorkerShiftwise=[]
AzWorkerShiftwiseData=[]
getAzWorkerShiftwiseData=[]
getAzWorkerShiftwiseRefreshData=[]
@wire(getAzWorkerShiftwise)
wiredgetAzWorkerShiftwise(result){
    this.getAzWorkerShiftwiseRefreshData=result.data
    if(result.data){
       console.log('getAzWorkerShiftwise',result.data) 
       this.getAzWorkerShiftwiseData=result.data  
    }if(result.error){
        console.log(result.error)
    }
}
isPlumber=false
isAcTech=false
isElectrician=false
isPainter=false
isTvTech=false
searchedEnquiryRefreshData=[]
searchedEnqData=[]
searchedEnquiryData=[]
@wire(getSearchedEnquiryId,{getWithId:'$recordToogleId'})
wiredSearchedEnquiry(result){
    this.searchedEnquiryRefreshData=result
    if(result.data){ 
        this.searchedEnqData=result.data
        this.searchedEnquiryData=result.data[0]
        console.log(" this.searchEnqData", this.searchedEnqData)
      
          console.log('search Enquiry',result.data)
      }if(result.error){
          console.log(result.error)
      }
}
searchAzWorkerAcTechData=[]
searchAzWorkerAcTechRefreshData=[]
@wire(getSearchAzWorkerShiftwise,{workerRole:"AC Technician",shiftDate:'$tommorowDate'})
wiredSearchAzWorkerAcTech(result){
this.searchAzWorkerAcTechRefreshData=result
if(result.data){
    this.searchAzWorkerAcTechData=result.data.map((record)=>{
        let acShiftIcon=record.Toogle_Shift_c__c==="YES"?CustomerProfileIcons+'/work.png' :CustomerProfileIcons+'/noworkone.png'
         let acIcon=record.Worker_Role__c==="AC Technician"?WorkerIcons+'/airconditioner.png':""
     return{
         ...record,
         acShiftIcon:acShiftIcon,
         acIcon:acIcon
     }
     }) 
}if(result.error){
    console.log(result.error)
}
}
searchAzWorkerPlumberData=[]
searchAzWorkerPlumberRefreshData=[]
@wire(getSearchAzWorkerShiftwise,{workerRole:"Plumber",shiftDate:'$tommorowDate'})
wiredSearchAzWorkerPlumber(result){
this.searchAzWorkerPlumberRefreshData=result
if(result.data){
    this.searchAzWorkerPlumberData=result.data.map((record)=>{
        let plumberShiftIcon=record.Toogle_Shift_c__c==="YES"?CustomerProfileIcons+'/work.png' :CustomerProfileIcons+'/noworkone.png'
         let plumberIcon=record.Worker_Role__c==="Plumber"?WorkerIcons+'/plumber.png':""
     return{
         ...record,
         plumberShiftIcon:plumberShiftIcon,
         plumberIcon:plumberIcon
     }
     }) 
}if(result.error){
    console.log(result.error)
}
}
searchAzWorkerElectricianData=[]
searchAzWorkerElectricianRefreshData=[]
@wire(getSearchAzWorkerShiftwise,{workerRole:"Electrician",shiftDate:'$tommorowDate'})
wiredSearchAzWorkerElectrician(result){
this.searchAzWorkerElectricianRefreshData=result
if(result.data){
    this.searchAzWorkerElectricianData=result.data.map(record=>{
        let electricianShiftIcon=record.Toogle_Shift_c__c==="YES"?CustomerProfileIcons+'/work.png' :CustomerProfileIcons+'/noworkone.png'
         let electricianIcon=record.Worker_Role__c==="Electrician"?WorkerIcons+'/power.png':""
     return{
         ...record,
         electricianShiftIcon:electricianShiftIcon,
         electricianIcon:electricianIcon
     }
     }) 
}if(result.error){
    console.log(result.error)
}
}
searchAzWorkerPainterData=[]
searchAzWorkerPainterRefreshData=[]
@wire(getSearchAzWorkerShiftwise,{workerRole:"Painter",shiftDate:'$tommorowDate'})
wiredSearchAzWorkerPainter(result){
this.searchAzWorkerPainterRefreshData=result
if(result.data){
    this.searchAzWorkerPainterData=result.data.map(record=>{
        let PainterShiftIcon=record.Toogle_Shift_c__c==="YES"?CustomerProfileIcons+'/work.png' :CustomerProfileIcons+'/noworkone.png'
         let PainterIcon=record.Worker_Role__c==="Painter"?WorkerIcons+'/paintrollerone.png':""
     return{
         ...record,
         PainterShiftIcon:PainterShiftIcon,
         PainterIcon:PainterIcon
     }
     }) 
}if(result.error){
    console.log(result.error)
}
}

searchAzWorkerTvTechData=[]
searchAzWorkerTvTechRefreshData=[]
@wire(getSearchAzWorkerShiftwise,{workerRole:"TV Technician",shiftDate:'$tommorowDate'})
wiredSearchAzWorkerTvTech(result){
this.searchAzWorkerTvTechRefreshData=result
if(result.data){
    this.searchAzWorkerTvTechData=result.data.map(record=>{
        let TvTechShiftIcon=record.Toogle_Shift_c__c==="YES"?CustomerProfileIcons+'/work.png' :CustomerProfileIcons+'/noworkone.png'
         let TvTechIcon=record.Worker_Role__c==="TV Technician"?WorkerIcons+'/television.png':""
     return{
         ...record,
         TvTechShiftIcon:TvTechShiftIcon,
         TvTechIcon:TvTechIcon
     }
     }) 
}if(result.error){
    console.log(result.error)
}
}
plumberTableHandler(event){
    let taskId=event.currentTarget.dataset.id;
console.log('plumberTableHandler',taskId)
const plumberUp={
    Id:event.currentTarget.dataset.id,
    AZ_Customer__c:this.searchedEnqData[0].AZ_Customer__c,
     AZ_Enquiry__c:this.searchedEnqData[0].Id,
     Customer_Name__c: this.searchedEnqData[0].Name,
     Customer_Phone__c:this.searchedEnqData[0].Phone__c,
     Toogle_Shift_c__c:"YES",Longitude__c:this.searchedEnqData[0].Longitude__c,
     Latitude__c:this.searchedEnqData[0].Latitude__c
}
updateAzWorkerShiftwise({updateWorkerShiftwise:plumberUp}).then(result=>{
    refreshApex(this.searchAzWorkerPlumberRefreshData)
    console.log('sssssssssssssssssssss')
    refreshApex(this.getAzWorkerShiftwiseRefreshData)
    refreshApex(this.searchedEnquiryRefreshData)

})
}
acTechTableHandler(event){
    console.log('acTechTableHandler',event.currentTarget.dataset.id)
    const acTechUp={
        Id:event.currentTarget.dataset.id,
        AZ_Customer__c:this.searchedEnqData[0].AZ_Customer__c,
         AZ_Enquiry__c:this.searchedEnqData[0].Id,
         Customer_Name__c: this.searchedEnqData[0].Name,
         Customer_Phone__c:this.searchedEnqData[0].Phone__c,
         Toogle_Shift_c__c:"YES",Longitude__c:this.searchedEnqData[0].Longitude__c,
         Latitude__c:this.searchedEnqData[0].Latitude__c
    }
    updateAzWorkerShiftwise({updateWorkerShiftwise:acTechUp}).then(result=>{
        refreshApex(this.getAzWorkerShiftwiseRefreshData)
        refreshApex(this.searchedEnquiryRefreshData)
        refreshApex(this.searchAzWorkerAcTechRefreshData)
        
        console.log('ssMMMMMMMMMMMMMMMMMMMMMMsss')
    })
}
electricianTableHandler(event){
    console.log('electricianIconTableHandler',event.currentTarget.dataset.id)
    const electricianUp={
        Id:event.currentTarget.dataset.id,
        AZ_Customer__c:this.searchedEnqData[0].AZ_Customer__c,
         AZ_Enquiry__c:this.searchedEnqData[0].Id,
         Customer_Name__c: this.searchedEnqData[0].Name,
         Customer_Phone__c:this.searchedEnqData[0].Phone__c,
         Toogle_Shift_c__c:"YES",Longitude__c:this.searchedEnqData[0].Longitude__c,
     Latitude__c:this.searchedEnqData[0].Latitude__c
    }
    updateAzWorkerShiftwise({updateWorkerShiftwise:electricianUp}).then(result=>{
       refreshApex(this.searchAzWorkerElectricianRefreshData)
        refreshApex(this.getAzWorkerShiftwiseRefreshData)
        refreshApex(this.searchedEnquiryRefreshData)
        console.log('electrician')
    })
}
PainterTableHandler(event){
    console.log('PainterTableHandler',event.currentTarget.dataset.id)
    const painterUp={
        Id:event.currentTarget.dataset.id,
        AZ_Customer__c:this.searchedEnqData[0].AZ_Customer__c,
         AZ_Enquiry__c:this.searchedEnqData[0].Id,
         Customer_Name__c: this.searchedEnqData[0].Name,
         Customer_Phone__c:this.searchedEnqData[0].Phone__c,
         Toogle_Shift_c__c:"YES",Longitude__c:this.searchedEnqData[0].Longitude__c,
     Latitude__c:this.searchedEnqData[0].Latitude__c
    }
    updateAzWorkerShiftwise({updateWorkerShiftwise:painterUp}).then(result=>{
       refreshApex(this.searchAzWorkerPainterRefreshData)
        refreshApex(this.getAzWorkerShiftwiseRefreshData)
       refreshApex(this.searchedEnquiryRefreshData)
        console.log('PainterTableHandler')
    })
}
TvTechTableHandler(event){
    console.log('TvTechTableHandler',event.currentTarget.dataset.id)
    const tvTechUp={
        Id:event.currentTarget.dataset.id,
        AZ_Customer__c:this.searchedEnqData[0].AZ_Customer__c,
         AZ_Enquiry__c:this.searchedEnqData[0].Id,
         Customer_Name__c: this.searchedEnqData[0].Name,
         Customer_Phone__c:this.searchedEnqData[0].Phone__c,
         Toogle_Shift_c__c:"YES",Longitude__c:this.searchedEnqData[0].Longitude__c,
     Latitude__c:this.searchedEnqData[0].Latitude__c
    }
    updateAzWorkerShiftwise({updateWorkerShiftwise:tvTechUp}).then(result=>{
       refreshApex(this.searchAzWorkerTvTechRefreshData)
        refreshApex(this.getAzWorkerShiftwiseRefreshData)
       refreshApex(this.searchedEnquiryRefreshData)
        console.log('TvTechTableHandler')
    })
    
}


////////
@wire(getAdmin)
wiredAdmin(result){
 if(result.data){
 this.adminData=result.data
 }
    if(result.error){
        console.log(result.error)
    }
}
isModelOTPOpen=true
hideCreateModel(){
    this.isModelOTPOpen=false
}
one=NumbersIcons+'/numberone.png';two=NumbersIcons+'/numbertwo.png';three=NumbersIcons+'/numberthree.png'
 four=NumbersIcons+'/numberfour.png';five=NumbersIcons+'/numberfive.png';six=NumbersIcons+'/numbersix.png';
 seven=NumbersIcons+'/numberseven.png';eight=NumbersIcons+'/numbereight.png'; 
 nine=NumbersIcons+'/numbernine.png';zero=NumbersIcons+'/zero.png' ;
get zeroval(){
    return true?NumbersIcons+'/zeroR.png':NumbersIcons+'/zero.png'
}
arrnum=[]
numselect=''
colNum
adminData=[]
OTP='';
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
            this.isOtpShowHide=true
            let  digits = '0123456789';
            for (let i = 0; i < 4; i++) {
                this.OTP +=digits[Math.floor(Math.random() * 10)];
            }
            adminEmailOTPShiftTime({adminTimeEmail:this.adminTodayShiftwiseData.Email__c,
                 adminTimeShift:this.adminTodayShiftwiseData.Shift_Name__c
                 ,adminTimeName:this.adminTodayShiftwiseData.Name,adminTimeOtp:this.OTP}).then(result=>{

            })
           //  this.adminOtpPass=false
            // this.adminOkOTP=false
            console.log('anu',co)
          
        }
    })
}
fourDigitOtpHandler(event){
if(event.target.value===this.OTP){
    console.log('otppppppppp',this.adminTodayShiftwiseData.Id)
   const adminOTPShift={
    Id:this.adminTodayShiftwiseData.AZ_Admin_Daily__c,Status_Pro__c:"Present",Login_Time__c:this.currentTime
   }
   updateAdminDaily({updateAdminDailyData:adminOTPShift}).then(() => {
    const fields = {};
    fields[AZADMINDAILY_ID.fieldApiName] =this.adminTodayShiftwise.AZ_Admin_Daily__c;
   // fields[AZADMINDAILY_STATUS.fieldApiName] ="Present"
    fields[AZADMINDAILY_LOGOUT.fieldApiName] =this.currentTime
    const recordInput = { fields };
    console.log(recordInput);
    updateRecord(recordInput)
        .then(() => {
            this.adminOtpPass=false
            this.adminOkOTP=false
        })
})
   /* */
     
}
}
//Status__c,Login_Time__c,Logout_Time__c
}