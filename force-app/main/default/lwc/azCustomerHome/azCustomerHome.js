import { LightningElement,wire,api,track } from 'lwc';
import getAzCustomer from '@salesforce/apex/AzCustomerController.getAzCustomer';
import getAzSerachCustomer from '@salesforce/apex/AzCustomerController.getAzSerachCustomer';
import getTodayEnquiryDate from '@salesforce/apex/AzCustomerController.getTodayEnquiryDate';
import getSearchEnquiry from '@salesforce/apex/AzCustomerController.getSearchEnquiry';
import createAzEnquiry from '@salesforce/apex/AzCustomerController.createAzEnquiry';
import getAdminTodayShiftwise from '@salesforce/apex/AzCustomerController.getAdminTodayShiftwise';
import createAzCustomer from '@salesforce/apex/AzCustomerController.createAzCustomer';
import getCustomerAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.getCustomerAzWorkerShiftwise';
import getCustomerAdminWorkerShiftwise from '@salesforce/apex/AzWorkerController.getCustomerAdminWorkerShiftwise';
import getAzWorkerShiftwiseRating from '@salesforce/apex/AzWorkerController.getAzWorkerShiftwiseRating';
import getAzChat from '@salesforce/apex/AzChartController.getAzChat'; 
import createAzChat from '@salesforce/apex/AzChartController.createAzChat';
import updateAzChat from '@salesforce/apex/AzChartController.updateAzChat';
import getSearchAzChat from '@salesforce/apex/AzChartController.getSearchAzChat';
import updateAzEnquiry from '@salesforce/apex/AzCustomerController.updateAzEnquiry';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AZEND_OBJECT from '@salesforce/schema/AZ_Enquiry_Date__c'
import AZEND_NAME from '@salesforce/schema/AZ_Enquiry_Date__c.Name'
import AZAS_OBJECT from '@salesforce/schema/AZ_Admin_Shiftwise__c'
import AZAS_ID from '@salesforce/schema/AZ_Admin_Shiftwise__c.Id'
import AZAS_TOOGLE from '@salesforce/schema/AZ_Admin_Shiftwise__c.Toogle__c'
import ThreeDPainterRemovebg from '@salesforce/resourceUrl/ThreeDPainterRemovebg'
import DataLogoRemovebg from '@salesforce/resourceUrl/DataLogoRemovebg'
import EnquiryLogoMainRemovebg  from '@salesforce/resourceUrl/EnquiryLogoMainRemovebg'
import customerservice from '@salesforce/resourceUrl/customerservice'
import AZLogo from '@salesforce/resourceUrl/AZLogo'
import AZLogoOne from '@salesforce/resourceUrl/AZLogoOne'
import CustomerProfileIcons from '@salesforce/resourceUrl/CustomerProfileIcons'
import WorkerIcons from '@salesforce/resourceUrl/WorkerIcons'
import NumbersIcons from '@salesforce/resourceUrl/NumbersIcons'
import assign from '@salesforce/resourceUrl/assign'
import StarRating  from '@salesforce/resourceUrl/StarRating'
import star from '@salesforce/resourceUrl/star'
import updateAzWorkerShiftwise from '@salesforce/apex/AzWorkerController.updateAzWorkerShiftwise';
import emoji from '@salesforce/resourceUrl/emojiIcons'
export default class AzCustomerHome extends LightningElement {    
    columns=[ 
        {
           label:"Admin", fieldName:"toogleName",
         type:"customLink",typeAttributes:{
             toogleLink:{ fieldName:"toogleLink" },
             toogleEmail:{fieldName:"toogleEmail"},
             tooglePhone:{fieldName:"tooglePhone"},
             toogleImage:{fieldName:"toogleImage"}
          } }
        ]
         arrEmojiOne=
     [{img:emoji+'/angry.png',imga:emoji+'/bad.png',imgb:emoji+'/confused.png',imgc:emoji+'/cool.png',imgd:emoji+'/crazy.png',imge:emoji+'/crying.png',imgf:emoji+'/cryingone.png',imgg:emoji+'/cyclops.png'},
        {img:emoji+'/dead.png',imga:emoji+'/eyebrows.png',imgb:emoji+'/furious.png',imgc:emoji+'/girl.png',imgd:emoji+'/graduated.png',imge:emoji+'/happy.png',imgf:emoji+'/hypnotized.png',imgg:emoji+'/inlove.png'}
,{img:emoji+'/nerd.png',imga:emoji+'/nervous.png',imgb:emoji+'/party.png',imgc:emoji+'/pressure.png',imgd:emoji+'/sad.png',imge:emoji+'/shocked.png',imgf:emoji+'/sick.png',imgg:emoji+'/singing.png'}
    ,{img:emoji+'/sleeping.png',imga:emoji+'/smile.png',imgb:emoji+'/surprised.png',imgc:emoji+'/sweat.png',imgd:emoji+'/sweating.png',imge:emoji+'/tongue.png',imgf:emoji+'/ugly.png',imgg:emoji+'/wink.png'}
        ,]
        partyEmoji=emoji+'/party.png'
    @api customerName 
    @api customerID
    AZLogo=AZLogo
    AZLogoOne=AZLogoOne
    customerservice=customerservice
    ThreeDPainterRemovebg=ThreeDPainterRemovebg
    DataLogoRemovebg=DataLogoRemovebg
    EnquiryLogoMainRemovebg=EnquiryLogoMainRemovebg
    customerProfile=CustomerProfileIcons+'/personal.png'
    customerEnquiry=WorkerIcons+'/informationtwo.gif'
    customerWorkAllot=CustomerProfileIcons+'/timemanagament.png'
    currentTime=''
    today
    todayDate
    toogleAdminName
    isOpen=false
    customerRefreshData=[]
    customerData=[]
    serachCustomerData=[]
    serachCustomerRefreshData=[]
    enquiryRefrshDateData=[]
    enquiryDateData=[]
    adminTodayRefreshShiftwise=[]
    adminTodayShiftwise=[]
    searchedEnquiryData=[]
    searchedEnquiryRefreshData=[]
    shiftNumber='';
    selectCheck=[]
    chatData=[]
    chatRefreshData=[]
    adminCustomerSearchData=[]
    adminCustomerSearchRefrshData=[]
arr
arrToogle
isToggleVariant='warning'
isToggleAddressPick=false
innerCardHeader="Worker Role"
isTableHeaderChange="Customer Name"
@track street;
    @track city;
    @track country;
    @track province;
    @track postalcode;
    emojiShow="hide"
    isEmojiHide=false
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
@wire(getAzCustomer)
wiredCustomer(result){
    this.customerRefreshData=result
    if(result.data){
        console.log('cus',result.data)
        this.customerData=result.data
    }if(result.error){
        console.log(result.error)
    }
}
@wire(getAzSerachCustomer,{customerId:'$customerID'})
wiredSerachCustomer(result){
    this.serachCustomerRefreshData=result
    if(result.data){
        this.serachCustomerData=result.data
        console.log('cust serach',this.serachCustomerData)
        }if(result.error){
            console.log(result.error)
        }
}
enquiryDateCallbackData=[]
@wire(getTodayEnquiryDate)
wiredEnquiry(result){
this.enquiryRefrshDateData=result
if(result.data){
    this.enquiryDateCallbackData=result.data
this.enquiryDateData=result.data[0]
console.log('getTodayEnquiryDate',result.data,this.enquiryDateData)
}if(result.error){
    console.log(result.error)
}
}
adminshiftwiseId
@wire(getAdminTodayShiftwise,{adminTimeShift:'$shiftNumber'})
wiredAdminTodayShiftwise(result){
    this.adminTodayRefreshShiftwise=result
    if(result.data){
        this.adminshiftwiseId=result.data[0]
        this.adminTodayShiftwise=result.data.map((record)=>{
        let toogleLink =record.Toogle__c==="YES"?record.Full_Name__c:""
        let toogleImage=record.Toogle__c==="YES"?record.Image__c:""
        let tooglePhone=record.Toogle__c==="YES"?record.Phone__c:""
        let toogleEmail=record.Toogle__c==="YES"?record.Email__c:""
        let toogleName = record.Toogle__c==="YES"?"":record.Name
               return {
              ...record,  
               toogleLink:toogleLink,
              toogleName:toogleName,
              toogleImage:toogleImage,
              tooglePhone:tooglePhone,
              toogleEmail:toogleEmail,
             
           }
          })
        console.log('shiftwise3333',result.data)
     
    }
    if(result.error){
        console.log(result.error)
    }
}

@wire(getSearchAzChat,{adminId:'$adminshiftwiseId.Id',customerId:'$customerID'})
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
searchEnqData=[]
@wire(getSearchEnquiry,{enquiryId:'$customerID'})
wiredSearchEnquiry(result){
    this.searchedEnquiryRefreshData=result
    if(result.data){
        this.searchEnqData=result.data
        console.log(" this.searchEnqData", this.searchEnqData)
        this.searchedEnquiryData=result.data.map((record)=>{
            let toogleShow=record.Toogle__c==="Close PickList"?true:false
            //NumbersIcons+'/numberoneR.png':NumbersIcons+'/numbertwoR.png'
              let toogleImageOne=record.Toogle__c==="Close PickList"?NumbersIcons+'/numberone.png':NumbersIcons+'/numbertwo.png'
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
tableRowHandler(event){
    console.log('Nameon',event.target.id)
    const NameVal=event.target.id
   const NameIn= NameVal.indexOf('-')
    const NameValL=NameVal.length
    console.log('Name',NameValL-NameIn)
    console.log('NammnL', NameValL)
    this.recordToogleId=NameVal.slice(0,-(NameValL-NameIn))
    const NameValue=NameVal.slice(0,-(NameValL-NameIn))
console.log('nameeeee',NameValue)
this.searchEnqData.filter(ad=>{
    if(ad.Id===NameValue && ad.Toogle__c==="Open PickList"){
        this.isTableHeaderChange="Worker Role"
        const asss={
            Id:NameValue,
            Toogle__c:"Close PickList"
        }
        updateAzEnquiry({updateEnquiryData:asss}).then(result=>{
            refreshApex(this.searchedEnquiryRefreshData)
        })
    }
    if(ad.Id===NameValue && ad.Toogle__c==="Close PickList"){
        this.isTableHeaderChange="Customer Name"
        const asss={
            Id:NameValue,
            Toogle__c:"Open PickList"
        }
        updateAzEnquiry({updateEnquiryData:asss}).then(result=>{
            refreshApex(this.searchedEnquiryRefreshData)
        })
    }
})
}

iscustomerProfile=false
iscustomerEnquiry=false
iscustomerWorkAllot=false
isEditCustomer=false
isAddressEditCustomer=false
customerProfileHandler(){
    if(this.iscustomerProfile===false){
        this.iscustomerProfile=true
    }else{
        this.iscustomerProfile=false
    }
}
customerEnquiryHandler(){
    if(this.iscustomerEnquiry===false){
        this.iscustomerEnquiry=true
    }else{
        this.iscustomerEnquiry=false
    }
}
customerWorkAllotHandler(){
    if(this.iscustomerWorkAllot===false){
        this.iscustomerWorkAllot=true
    }else{
        this.iscustomerWorkAllot=false
    }
}
editCustomerHandler(){
if(this.isEditCustomer===false){
    this.isEditCustomer=true
}else{
    this.isEditCustomer=false
}
}
addressEditCustomerHandler(){
    if(this.isAddressEditCustomer===false){
this.isAddressEditCustomer=true}
else{this.isAddressEditCustomer=false}
}
saveAddressCustomerHandler(){   
   this.isAddressEditCustomer=false 
}
branchName
stateName
pincodeNumber
countryName
branchNameHandler(event){ 
    console.log('branch Name',event.target.value)
    this.branchName=event.target.value
    setTimeout(() => {
        fetch('https://api.postalpincode.in/postoffice/'+this.branchName, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
         // console.log(" ##!!! data name", data[0])
          console.log(" ##!!! data", data[0].PostOffice[0])
         // console.log(" ####### data", data[0].PostOffice[0].Name);  
          this.stateName=data[0].PostOffice[0].State
         this.countryName=data[0].PostOffice[0].Country
        this.pincodeNumber=data[0].PostOffice[0].Pincode  
        // this.postalcode=data[0].PostOffice  
        });
    }, 10000);
   
}
sameAddressHandler(event){
if(event.target.checked===true){
this.serachCustomerData.forEach(ad=>{
    this.street=ad.Street_Long__c
    this.city=ad.City__c
    this.province=ad.State__c
    this.country=ad.Country__c
    this.postalcode=ad.Pincode__c
})
}else{
    this.street=''
    this.city=''
    this.province=''
    this.country=''
    this.postalcode=''
}
}

togglePickListAddressHandler(){
  if(this.isToggleVariant==='warning'){
    this.isToggleVariant='success'
    this.isToggleAddressPick=true
    this.innerCardHeader="Work Location"
  }else{
this.isToggleVariant='warning'
this.isToggleAddressPick=false
this.innerCardHeader="Worker Role"
  }    
}

addressInputChange(event) {
    this.street = event.target.street;
    this.city = event.target.city;
    this.province = event.target.province;
   this.country = event.target.country;
    this.postalcode = event.target.postalcode;
}
creAzCustomerHandler(){
    const address={City__c:this.city,Country__c: this.country,Pincode__c:this.postalcode,
        State__c:this.province,Street_Long__c:this.street,Id:this.serachCustomerData[0].Id,} 
    createAzCustomer({customerSignUp:address}).then(result=>{
refreshApex(this.serachCustomerRefreshData)
    })
}

createAzEnquiryHandler() {
    if(this.city){
    const custmerProfle={
        Name:this.serachCustomerData[0].Full_Name__c,
        Email__c:this.serachCustomerData[0].Email__c,
        Phone__c:this.serachCustomerData[0].Phone__c,
        AZ_Customer__c:this.serachCustomerData[0].Id,
        Admin_Email__c:this.adminTodayShiftwise[0].Email__c,
        Admin_Image__c:this.adminTodayShiftwise[0].Image__c,
        Admin_Phone__c:this.adminTodayShiftwise[0].Phone__c,
        Admin_Name__c:this.adminTodayShiftwise[0].Name,
        AZ_Admin_Shiftwise__c:this.adminTodayShiftwise[0].Id,
AZ_Enquiry_Date__c:this.enquiryDateData.Id,Toogle__c:"Open PickList",
Longitude__c:this.Longitude,Latitude__c:this.Latitude,
City__c:this.city,Country__c: this.country,Pincode__c:this.postalcode,
State__c:this.province,Street_Long__c:this.street,Enquiry_Date__c:this.enquiryDateData.Name
    }
    createAzEnquiry({enterEnquiryData:custmerProfle}).then(result=>{
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Enquiry Form created',
                variant: 'success',
            }),      
        );
        refreshApex(this.searchedEnquiryRefreshData)
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
    this.inputEmojiChat=event.currentTarget.dataset.id
   /* if(event.currentTarget.dataset.id){
        console.log('dataset',event.currentTarget.dataset.id)
        this.inputEmojiChat=event.currentTarget.dataset.id
         
    }else{
        //console.log('emoji',event.currentTarget.dataset.id)
        this.inputEmojiChat=''
    }*/

}
inputNameChat=''
chatInputHandler(event){
this.inputNameChat=event.target.value
}
handleEmojiReset(){
  // this.template.querySelector(".emojiToogle").reset()
 /* if(inputEmoji){
    Array.from(inputEmoji).forEach(field=>{
        field.reset()
    })
  }*/
}
chatDataSet=true
chatOutHandler(){
    if(this.chatData.Id && this.chatData.Customer_Chat__c===null ){
        const chatUp={Id:this.chatData.Id,
            Customer_Chat__c:this.inputNameChat?this.inputNameChat:"",
            Customer_Emoji__c:this.inputEmojiChat?this.inputEmojiChat:"",
            AZ_Admin_Shiftwise__c:this.adminTodayShiftwise[0].Id,
            AZ_Customer__c:this.customerID,
            Customer_Name__c:this.customerName 
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
            Customer_Chat__c:this.inputNameChat?this.inputNameChat:"",
            Customer_Emoji__c:this.inputEmojiChat?this.inputEmojiChat:"",
            AZ_Admin_Shiftwise__c:this.adminTodayShiftwise[0].Id,
            AZ_Customer__c:this.customerID,
            Customer_Name__c:this.customerName 
        }
        createAzChat({createChat:chat}).then(result=>{
            console.log('chataaaaaaaaaaaaaaaaaaaa')
            this.template.querySelector('lightning-input[data-name="chat"]').value = null;          
            this.template.querySelectorAll('lightning-input[data-reset="reset"]').forEach(element => {
                element.dataset.id = null;  
              });
              this.inputNameChat=''
              this.inputEmojiChat=''
            refreshApex(this.chatRefreshData)
            refreshApex(this.adminCustomerSearchRefrshData)
          
        })
}  
}

connectedCallback(){
    this.today=new Date().toISOString().slice(0,10);
    this.currentTimeHandler()
setTimeout(() => {
   this.handleLocationClick()
   if(this.enquiryDateCallbackData.length===0){
    const fields = {};
    fields[AZEND_NAME.fieldApiName] =this.today;
   // fields[HR_DATE.fieldApiName] = this.name;
    const recordInput = { apiName: AZEND_OBJECT.objectApiName, fields };
    createRecord(recordInput)
        .then(account => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success',
                }),      
            );
            refreshApex(this.enquiryRefrshDateData)
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
}, 5000);
setInterval(() => {
    refreshApex(this.chatRefreshData) 
    
    refreshApex(this.serachCustomerRefreshData)
   // refreshApex(this.searchedEnquiryRefreshData)
    refreshApex(this.adminCustomerSearchRefrshData)  
}, 1000);
}
hoursHand=''
currentTimeHandler(){
    setInterval(()=>{
    let dateTime=new Date()
    let hours=dateTime.getHours()
    this.hoursHand=dateTime.getHours()
    let minutes=dateTime.getMinutes()
    let seconds=dateTime.getSeconds()
    this.currentTime=`${hours}:${minutes}:${seconds}`           
            if('6'<=this.hoursHand && '13'>=this.hoursHand){
                this.shiftNumber="Shift1"
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
getSelectedRow(){
    this.selectCheck=this.template.querySelector("c-az-custom-data-table").getSelectedRows()
    if(this.selectCheck.length===1){
        this.arr=this.selectCheck[0].Id
        this.arrToogle=this.selectCheck[0].Toogle__c
        if(this.selectCheck[0].Toogle__c==="No"){
            const fields = {};
            fields[AZAS_ID.fieldApiName] =this.selectCheck[0].Id;
            fields[AZAS_TOOGLE.fieldApiName] ="YES"
            const recordInput = { fields };
            updateRecord(recordInput)
                .then(() => {    refreshApex(this.adminTodayRefreshShiftwise)  })
                }
    }else{
        const fields = {};
        fields[AZAS_ID.fieldApiName] =this.arr
        fields[AZAS_TOOGLE.fieldApiName] ="No"
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {  refreshApex(this.adminTodayRefreshShiftwise)})
    
}
}
get selectedToday(){
    return this.today
}
changeDateHandler(event){
   
    this.todayDate=event.target.value
   
    console.log('time',event.target.value)
}
////////////////////////////AZWORKER SHIFT WISE////////////////////////////////////

customerwiseAzWorkerShiftwiseData=[]
customerwiseAzWorkerShiftwiseRefreshData=[]
customerAdminWorkerData=[]
customerAdminWorkerRefreshData=[]
todayNext=''
changeShiftDateHandler(event){
let nextDay=new Date(event.target.value)
nextDay.setDate(nextDay.getDate()+1);
this.todayNext=nextDay.toISOString().split('T')[0] 
console.log('todayNext',this.todayNext)
}
@wire(getCustomerAzWorkerShiftwise,{customerWiseId:'$customerID',customerWiseDateId:'$todayNext'})
wiredCustomerAzWorkerShiftwise(result){
    this.customerwiseAzWorkerShiftwiseRefreshData=result
    if(result.data){
        this.customerwiseAzWorkerShiftwiseData=result.data.map((record)=>{
          let  workToogle=record.Worker_Toogle__c==="Assign" ?assign:
          record.Worker_Toogle__c==="Work In Progress"? CustomerProfileIcons+'/workinprogresstwo.png':
          record.Worker_Toogle__c==="Completed"?CustomerProfileIcons+'/completedtask.png':
          CustomerProfileIcons+'/noworktwo.png';
          let workerRatingIcon=record.Star_Rating__c===1?StarRating+'/ratingone.png':
          record.Star_Rating__c===2?StarRating+'/ratingtwo.png':record.Star_Rating__c===3?StarRating+'/ratingthree.png':
          record.Star_Rating__c===4?StarRating+'/ratingfour.png':record.Star_Rating__c===5?StarRating+'/ratingfive.png':StarRating+'/rate.gif'
          return{
            ...record,
            workToogle:workToogle,
            workerRatingIcon:workerRatingIcon,
          }
        })
        //,Worker_Toogle__c,
        console.log("customerwiseAzWorkerShiftwiseData",result.data)
    }
    if(result.error){
        console.log(result.error)
    }

}
hideShow=false
workerId
workerShiftwiseHandler(event){
    if(this.hideShow===false){
        this.hideShow=true
        this.workerId=event.currentTarget.dataset.id;
    }else{
        this.hideShow=false
        this.workerId
    }
  
}
workProgressToogleHandler(event){
    this.workerId=event.currentTarget.dataset.id;
    if(event.currentTarget.dataset.id && this.customerAdminWorkerData[0].Worker_Toogle__c==="Assign" ){
      const  workProgress={
        Id:event.currentTarget.dataset.id,
        Worker_Toogle__c:"Work In Progress",
        Start_Time__c:this.hoursHand
      }
        this.customerAdminWorkerData
        updateAzWorkerShiftwise({updateWorkerShiftwise:workProgress}).then(result=>{
refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
refreshApex(this.customerAdminWorkerRefreshData)
refreshApex(this.azWorkerShiftwiseRatingRefreshData)
        })
    }
    if(event.currentTarget.dataset.id && this.customerAdminWorkerData[0].Worker_Toogle__c==="Work In Progress" ){
        const  workComplete={
          Id:event.currentTarget.dataset.id,
          Worker_Toogle__c:"Completed",
          End_Time__c:this.hoursHand
        }
          this.customerAdminWorkerData
          updateAzWorkerShiftwise({updateWorkerShiftwise:workComplete}).then(result=>{
  refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
  refreshApex(this.customerAdminWorkerRefreshData)
  refreshApex(this.azWorkerShiftwiseRatingRefreshData)
          })
      }
    
}
workerRatingToogleHandler(event){
    this.workerId=event.currentTarget.dataset.id;
    if(event.currentTarget.dataset.id && this.customerAdminWorkerDataRate.Star_Rating__c===0 ){
      const  ratingOne={
        Id:event.currentTarget.dataset.id,
        Star_Rating__c:1
      }
        this.customerAdminWorkerData
        updateAzWorkerShiftwise({updateWorkerShiftwise:ratingOne}).then(result=>{
refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
refreshApex(this.customerAdminWorkerRefreshData)
refreshApex(this.azWorkerShiftwiseRatingRefreshData)
        })
    }
    if(event.currentTarget.dataset.id && this.customerAdminWorkerDataRate.Star_Rating__c===1 ){
        const  ratingTwo={
          Id:event.currentTarget.dataset.id,
          Star_Rating__c:2
        }
          this.customerAdminWorkerData
          updateAzWorkerShiftwise({updateWorkerShiftwise:ratingTwo}).then(result=>{
  refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
  refreshApex(this.customerAdminWorkerRefreshData)
  refreshApex(this.azWorkerShiftwiseRatingRefreshData)
          })
      }
      if(event.currentTarget.dataset.id && this.customerAdminWorkerDataRate.Star_Rating__c===2 ){
        const  ratingThree={
          Id:event.currentTarget.dataset.id,
          Star_Rating__c:3
        }
          this.customerAdminWorkerData
          updateAzWorkerShiftwise({updateWorkerShiftwise:ratingThree}).then(result=>{
  refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
  refreshApex(this.customerAdminWorkerRefreshData)
  refreshApex(this.azWorkerShiftwiseRatingRefreshData)
          })
      }
      if(event.currentTarget.dataset.id && this.customerAdminWorkerDataRate.Star_Rating__c===3 ){
        const  ratingFour={
          Id:event.currentTarget.dataset.id,
          Star_Rating__c:4
        }
          this.customerAdminWorkerData
          updateAzWorkerShiftwise({updateWorkerShiftwise:ratingFour}).then(result=>{
  refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
  refreshApex(this.customerAdminWorkerRefreshData)
  refreshApex(this.azWorkerShiftwiseRatingRefreshData)
          })
      }
      if(event.currentTarget.dataset.id && this.customerAdminWorkerDataRate.Star_Rating__c===4 ){
        const  ratingFive={
          Id:event.currentTarget.dataset.id,
          Star_Rating__c:5
        }
          this.customerAdminWorkerData
          updateAzWorkerShiftwise({updateWorkerShiftwise:ratingFive}).then(result=>{
  refreshApex(this.customerwiseAzWorkerShiftwiseRefreshData)
  refreshApex(this.customerAdminWorkerRefreshData)
  refreshApex(this.azWorkerShiftwiseRatingRefreshData)
          })
      }
      
}
customerAdminWorkerDataRate=[]
@wire(getCustomerAdminWorkerShiftwise,{workerShiftWiseId:'$workerId'})
wiredCustomerAdminWorkerShiftwise(result){
this.customerAdminWorkerRefreshData=result
if(result.data){
    this.customerAdminWorkerDataRate=result.data[0]
    this.customerAdminWorkerData=result.data
    console.log("customerAdminWorkerData",result.data)
}if(result.error){
    console.log(result.error)
}
}
azWorkerShiftwiseRatingData=[]
azWorkerShiftwiseRatingRefreshData=[]
@wire(getAzWorkerShiftwiseRating,{workerRatingId:'$customerAdminWorkerDataRate.AZ_Worker__c'})
wiredAzWorkerShiftwiseRating(result){
this.azWorkerShiftwiseRatingRefreshData=result
if(result.data){
    this.azWorkerShiftwiseRatingData=result.data.map(record=>{
        let workerRatingIconItem=record.Star_Rating__c===1?StarRating+'/ratingone.png':
          record.Star_Rating__c===2?StarRating+'/ratingtwo.png':record.Star_Rating__c===3?StarRating+'/ratingthree.png':
          record.Star_Rating__c===4?StarRating+'/ratingfour.png':record.Star_Rating__c===5?StarRating+'/ratingfive.png':star
          return{
            ...record,
            workerRatingIconItem:workerRatingIconItem,
          }
    
    })
    console.log('azWorkerShiftwiseRatingData',result.data)
}
if(result.error){
    console.log(result.error)
}
}
//Start_Time__c,End_Time__c,Working_Time__c,


////////////////////////////Location/////////////////////////////////
Longitude
Latitude
lstMarkers = [];
zoomlevel = "1";
handleLocationClick(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            this.Longitude=position.coords.longitude;
            this.Latitude=position.coords.latitude;
            this.lstMarkers = [{
                location : {
                    Latitude: latitude,
                    Longitude : longitude
                },
                
                title : 'You are here'
            }];
            this.zoomlevel = "4";
            console.log('mapa', JSON.stringify(this.lstMarkers))
        });
console.log('maparr', JSON.stringify(this.lstMarkers))
    }
//console.log(this.lstMarkers[0].location.Longitude)

}

}