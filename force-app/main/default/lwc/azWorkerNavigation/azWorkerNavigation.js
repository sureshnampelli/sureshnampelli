import { LightningElement,wire,api } from 'lwc';
import getAzWorkerShiftwiseRating from '@salesforce/apex/AzWorkerController.getAzWorkerShiftwiseRating';
import getSearchAzWorkerShiftwiseWithId from '@salesforce/apex/AzWorkerController.getSearchAzWorkerShiftwiseWithId';
import getAdminTodayShiftwise from '@salesforce/apex/AzCustomerController.getAdminTodayShiftwise';
import getCustomerAdminWorkerShiftwise from '@salesforce/apex/AzWorkerController.getCustomerAdminWorkerShiftwise';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import AZAS_ID from '@salesforce/schema/AZ_Admin_Shiftwise__c.Id'
import AZAS_TOOGLE from '@salesforce/schema/AZ_Admin_Shiftwise__c.Toogle__c'
import AZLogo from '@salesforce/resourceUrl/AZLogo'
import AZLogoOne from '@salesforce/resourceUrl/AZLogoOne'
import CustomerProfileIcons from '@salesforce/resourceUrl/CustomerProfileIcons'
import WorkerIcons from '@salesforce/resourceUrl/WorkerIcons'
import NumbersIcons from '@salesforce/resourceUrl/NumbersIcons'
import assign from '@salesforce/resourceUrl/assign'
import StarRating  from '@salesforce/resourceUrl/StarRating'
import loginicons from '@salesforce/resourceUrl/loginicons'
import star from '@salesforce/resourceUrl/star'
import emoji from '@salesforce/resourceUrl/emojiIcons'
 const columns=[ 
    {
       label:"Admin", fieldName:"toogleName",
     type:"customLink",typeAttributes:{
         toogleLink:{ fieldName:"toogleLink" },
         toogleEmail:{fieldName:"toogleEmail"},
         tooglePhone:{fieldName:"tooglePhone"},
         toogleImage:{fieldName:"toogleImage"}
      } }
    ]
export default class AzWorkerNavigation extends LightningElement {
   
    @api workerName 
    @api workerImage
    @api workerIdnav
    columns=columns
    AZLogo=AZLogo
    AZLogoOne=AZLogoOne
    calendarTotal=loginicons+'/calendar.png'
    planningDaily=loginicons+'/planning.png'
    innerCardHeader="Total"
    get monthDayImageToogle(){
        return this.isDateMonthToogle==="daily"? this.calendarTotal:this.planningDaily
    }
    isDailyWorker=false
   todayDate
    shiftNumber='';
    currentTime=''
    today
    Longitude
    //this.searchedEnqData[0].Longitude__c,
    Latitude
    customerNameLocation
    isDateMonthToogle="daily"
    //:this.searchedEnqData[0].Latitude__c
    azWorkerShiftwiseRatingData=[]
azWorkerShiftwiseRatingRefreshData=[]
@wire(getAzWorkerShiftwiseRating,{workerRatingId:'$workerIdnav'})
wiredAzWorkerShiftwiseRating(result){
this.azWorkerShiftwiseRatingRefreshData=result
if(result.data){
    this.azWorkerShiftwiseRatingData=result.data.map(record=>{
        let  workToogleTotal=record.Worker_Toogle__c==="Assign" ?assign:
        record.Worker_Toogle__c==="Work In Progress"? CustomerProfileIcons+'/workinprogresstwo.png':
        record.Worker_Toogle__c==="Completed"?CustomerProfileIcons+'/completedtask.png':
        CustomerProfileIcons+'/noworktwo.png';
        let workerRatingIconItem=record.Star_Rating__c===1?StarRating+'/ratingone.png':
          record.Star_Rating__c===2?StarRating+'/ratingtwo.png':record.Star_Rating__c===3?StarRating+'/ratingthree.png':
          record.Star_Rating__c===4?StarRating+'/ratingfour.png':record.Star_Rating__c===5?StarRating+'/ratingfive.png':star
          return{
            ...record,
            workToogleTotal:workToogleTotal,
            workerRatingIconItem:workerRatingIconItem,
          }
    
    })
    console.log('azWorkerShiftwiseRatingDataAAAAAAA',result.data)
}
if(result.error){
    console.log(result.error)
}
}
azWorkerShiftwiseWithIdData=[]
azWorkerShiftwiseWithIdRefreshData=[]
@wire(getSearchAzWorkerShiftwiseWithId,{workerId:'$workerIdnav',shiftDate:'$todayDate'})
wiredSearchAzWorkerShiftwiseWithId(result){
    this.azWorkerShiftwiseWithIdRefreshData=result
if(result.data){
    this.azWorkerShiftwiseWithIdData=result.data.map(record=>{
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
    console.log('azWorkerShiftwiseRatingData',result.data)
}
if(result.error){
    console.log(result.error)
}
}
workToogleDateMonthHandler(){
if( this.isDateMonthToogle==="daily"){
    this.isDateMonthToogle="month"
    this.isDailyWorker=true
    this.innerCardHeader="Daily"
}else{
    this.isDateMonthToogle="daily"
    this.isDailyWorker=false
    this.innerCardHeader="Total"
}
}
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthWise
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
dayWise
dayWiseToday
connectedCallback(){
    this.today=new Date().toISOString().slice(0,10);
    this.currentTimeHandler()
    const d = new Date();
 this.monthWise = this.months[d.getMonth()];
 this.dayWise = this.days[d.getDay()];
 this.dayWiseToday=d.getDate();
  /*  setInterval(() => {
        this.handleLocationClick()
    }, 5000);*/
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
adminshiftwiseId=[]
adminTodayRefreshShiftwise=[]
adminTodayShiftwise=[]
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
selectCheck=[]
arr
arrToogle
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
workerId
customerInformationHandler(event){
    this.workerId=event.currentTarget.dataset.id
console.log('id',event.currentTarget.dataset.id)
console.log('name',event.currentTarget.dataset.name)
console.log('long',event.currentTarget.dataset.long)
console.log('loti',event.currentTarget.dataset.loti)
this.customerNameLocation=event.currentTarget.dataset.name
this.Longitude=event.currentTarget.dataset.long
this.Latitude=event.currentTarget.dataset.loti
if(this.Latitude){
    this.handleLocationClick()
}
}
customerAdminWorkerDataRate=[]
customerAdminWorkerData=[]
customerAdminWorkerRefreshData=[]
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
get selectedToday(){
    return this.today
}
changeDateHandler(event){
   
    this.todayDate=event.target.value
   
    console.log('time',event.target.value)
}
////////////////////////////Location/////////////////////////////////
lstMarkers = [];
zoomlevel = "1";
handleLocationClick(){
    this.lstMarkers = [{
        location : {
            Latitude:this.Latitude,
            Longitude :this.Longitude
        },
        
        title :this.customerNameLocation
    }];
    this.zoomlevel = "4";
   /* if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
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
    }*/
//console.log(this.lstMarkers[0].location.Longitude)

}

}