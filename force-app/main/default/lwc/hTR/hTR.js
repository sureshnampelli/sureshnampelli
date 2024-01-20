import { LightningElement,wire,api } from 'lwc';
import getAttendance from '@salesforce/apex/HARController.getAttendance';
import getRegister from '@salesforce/apex/HARController.getRegister';
import getLogins from '@salesforce/apex/HARController.getLogins';
import getAttendanceSearch from '@salesforce/apex/HARController.getAttendanceSearch';
import patientType from '@salesforce/apex/HospitalApex.typePatient';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import deleteEnquiry from '@salesforce/apex/HospitalApex.deleteEnquiry';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import HR_OBJECT from '@salesforce/schema/HRegister__c'
import HR_NAME from '@salesforce/schema/HRegister__c.Name'
import HA_ROLE from '@salesforce/schema/HAttendance__c.Role__c'
import HA_OBJECT from '@salesforce/schema/HAttendance__c'
import HA_NAME from '@salesforce/schema/HAttendance__c.Name'
import HA_STATUS from '@salesforce/schema/HAttendance__c.Status__c'
import HA_HR from '@salesforce/schema/HAttendance__c.HRegister__c'
import HA_IMG from '@salesforce/schema/HAttendance__c.Image__c'
import DoctorMain from '@salesforce/resourceUrl/DoctorMain'
import TodayAttendanceRegister from '@salesforce/resourceUrl/TodayAttendanceRegister'
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import LabLogo from '@salesforce/resourceUrl/LabLogo'
import Receptionist from '@salesforce/resourceUrl/Receptionist'
import DoctorLogo from '@salesforce/resourceUrl/DoctorLogo'
import PharmacistLogo from '@salesforce/resourceUrl/PharmacistLogo'
import NurseLogo from '@salesforce/resourceUrl/NurseLogo'
import PresentLogo from '@salesforce/resourceUrl/PresentLogo'
import AbsentLogo from '@salesforce/resourceUrl/AbsentLogo'
import ManagementLogo from '@salesforce/resourceUrl/ManagementLogo'
import LoginFingerRemovebg from '@salesforce/resourceUrl/LoginFingerBlack'
import ShowAttendanceList from '@salesforce/resourceUrl/ShowAttendanceList'
import PatientLogo from '@salesforce/resourceUrl/PatientLogo'
const columns=[
    {label:"Name",fieldName:"Name"},
    {label:"In Out",fieldName:"In_Out__c",
    type:"customHtrName",typeAttributes:{
     statusPro:{
         fieldName:"statusPro"
     } 
      }  },
    {label:"Role", fieldName:"Role__c",
       type:"customHtrRank",typeAttributes:{
        rankIcon:{
            fieldName:"rankIcon"
        } 
         }  }
   ,
   
 {label:"Picture",type:"customHtrPicture",typeAttributes:{
        pictureUrl:{
            fieldName:"Image__c"
        }
    },
cellAttributes:{
    alignment:"center"
}},{label:"User Name", fieldName:"toogleName",
type:"customHtrLink",typeAttributes:{
    toogleLink:{
     fieldName:"toogleLink"
 },toogleIcon:{fieldName:"toogleIcon"} 
  }  }]


  const columnsOne=[{label:"Name",fieldName:"Name" },
  {label:"Status",fieldName:"Status__c",editable:true,value:true, type:"boolean",},
  {label:"In Out",fieldName:"In_Out__c",editable:true },{label:"Role", fieldName:"Role__c",}]
  const columnsTwo=[{label:"Name",fieldName:"Name" },
  {label:"Status",fieldName:"Status__c", type:"boolean",},
  {label:"In Out",fieldName:"In_Out__c",editable:true },{label:"Role", fieldName:"Role__c",}]
  
export default class HTR extends LightningElement {
    hospitalRemovebg=hospitalremovebg
    Loginfingerremovebg=LoginFingerRemovebg
    Showattendancelist=ShowAttendanceList
    Patientlogo=PatientLogo
    columns=columns
    
    @api staffUserName
   @api staffImage
   @api staffJobRole
   varEdit=0
   varEdited=''
   vartrfa={}
   qwOne='Hello'
   
   registerDat=''
   
   arr=[{id:"Hello"},{id:"Hello"}]
  
   UPDATECOL=[]
  
   
   columnsPatient = [
    { label: 'First Name', fieldName: 'First_Name__c' },
    { label: 'Last Name', fieldName: 'Last_Name__c' },
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone ' ,editable: true },
    { label: 'Email', fieldName: 'Email__c', type: 'email',editable: true },
   ]

    today=''
    todayDate=''
    saveDraftValues = [];
     
registerData=[]
@wire(getRegister)
wiredRegister({data,error}){
    if(data){
        this.registerData=data

        console.log('loginData',data)
    }if(error){
        console.error(error)
    }
}
loginData
@wire(getLogins)
wiredLogins({data,error}){
if(data){
    this.loginData=data
    console.log('loginData',data)
}if(error){
    console.error(error)
}
}

selectedType=''
patientData
@wire(patientType, {type:'$selectedType'})
filteredEnquiry(result){
    this.patientData=result;
    if(result.error){
        this.patientData=undefined;
    }
}
get typePatient(){
    return [
        
        {label:"InPatient" ,value:"InPatient"},
        {label:"OutPatient" ,value:"OutPatient"}
    ]
}
typeHandler(event){
    this.selectedType=event.target.value
}

dateToday=''
dateto=this.today
getdate= ''
updateData
attendanceData=[]
objTwo=[]
changeDateHandler(event){
    this.getDate=event.target.value
    this.todayDate=event.target.value
    this.name=event.target.value
    console.log('time',event.target.value)
}

@wire(getAttendance,{toDate: '$todayDate'})
wiredAttendance(result){
    this.updateData=result;
   // var arrAdd=[]
    if(result.data){
        const resulto =result.data.reduce((json, val)=>
        ({...json,"Role":[val.Role__c], [val.In_Out__c]:(json[val.In_Out__c]|0)+1}),{})
        console.log('red',JSON.stringify(resulto))
      /*  result.data.forEach(a=>{
      result.data.filter(g=>{
       if(a.Role__c===g.Role__c){
        if(a.In_Out__c===g.In_Out__c){
          
arrAdd.push({"Role":g.Role__c,"In":g.In_Out__c})
console.log('arrAdd',JSON.stringify(arrAdd))
const fillResult=arrAdd.reduce((json, val)=>
 [val.In]==[val.In]? ({...json,"Role":[val.In], [val.In_Out__c]:(json[val.In_Out__c]|0)+1}):0)
console.log('arrFill',JSON.stringify(fillResult))

        }
       }})
      })
      const fillResult=arrAdd.reduce((json, val)=>
({...json, [val.In]:(json[val.In]|0)+1}),{})
console.log('arrFill',JSON.stringify(fillResult))*/
        /* if(Object.keys(resulto).length){
            var pieChartLabels = Object.keys(resulto)
            console.log('key',JSON.stringify(pieChartLabels ))
        var pieChartData = Object.values(resulto)
            console.log('value',JSON.stringify(pieChartData))
        }*/


    
       var res=[]
         //var  objTwo=['A','B','C','A','B','C','C']
          
        result.data.filter(l=>{l.Role__c==='Doctor';
        
              const index=res.findIndex(obj=>{
                  return (obj['St']===l.In_Out__c,obj['Role']===l.Role__c)
              }); 
              if(index===-1){
                  res.push({
                    "Role":l.Role__c,
                      "St":l.In_Out__c,
                      "count":1
                  })
              }
              else{
                
                 res[index]["count"]++        
                  
              }
})
      
        
      
       window.localStorage.setItem('setcart',JSON.stringify( res))
         this.objTwo=JSON.parse(window.localStorage.getItem('setcart') )
        
      
         console.log('indw',JSON.stringify(this.objTwo))
  


        this.attendanceData=result.data.map((record)=>{
            let statusPro=record.In_Out__c === 'IN'?PresentLogo:AbsentLogo
            let toogleIcon=record.In_Out__c==='IN'?PresentLogo:AbsentLogo
          let toogleLink =record.Id;
          let toogleName = record.Name;
            if(record.Role__c ==="Doctor"){
                console.log('do')
            }
            let rankIcon=record.Role__c ==="Doctor" ? DoctorLogo :record.Role__c ==="Receptionist" ?  Receptionist
             :record.Role__c ==='LabAssistant'? LabLogo:record.Role__c==='Pharmacist' ?
              PharmacistLogo:record.Role__c ==='Nurse'?NurseLogo:ManagementLogo
            return {
                ...record,
                rankIcon:rankIcon,
                statusPro:statusPro,
                toogleLink:toogleLink,
                toogleName:toogleName,
                toogleIcon:toogleIcon
            }
           })
    
    }
    if(result.error){
        this.updateData=undefined;
    }
}
get selectedToday(){
        return this.today
}

@wire(getAttendanceSearch)
wiredAttendanceSearch({data,error}){
    if(data){
        console.log('wiredAttendanceSearch',data)
    }if(error){
        console.error(error)
    }
}
accountId;
name
handleNameChange(event) {
    this.accountId = undefined;
    this.name = event.target.value;
}

handleSave(event) {
    this.saveDraftValues = event.detail.draftValues;
    const recordInputs = this.saveDraftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(res => {
        this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
        this.saveDraftValues = [];
        return this.refresh();
    }).catch(error => {
        this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
    }).finally(() => {
        this.saveDraftValues = [];
    });
}
ShowToast(title, message, variant, mode){
    const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
}
async refresh() {
    await refreshApex(this.updateData);
}

connectedCallback(){
    this.currentTimeHandler()
    this.setTimer()  
    this.today= new Date().toISOString().slice(0,10);
    this.todayDate=new Date().toISOString().slice(0,10);
    console.log( 'today',this.today)

   
setTimeout(() => {
   if(this.registerData.length===0){
    const  ringtoneo= new Audio(TodayAttendanceRegister)
    ringtoneo.play()
        const fields = {};
            fields[HR_NAME.fieldApiName] =this.today;
           // fields[HR_DATE.fieldApiName] = this.name;
            const recordInput = { apiName: HR_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(account => {
                    this.accountId = account.id;
                    this.loginData.forEach(each=>{
                        var fields={}
                        fields[HA_NAME.fieldApiName]=each.Full_Name__c
                        fields[HA_STATUS.fieldApiName]=each.In_Out__c
                        fields[HA_ROLE.fieldApiName]=each.Type__c
                        fields[HA_IMG.fieldApiName]=each.Picture_Url_c__c
                        fields[HA_HR.fieldApiName]=account.id
                        const recordInputOne = { apiName: HA_OBJECT.objectApiName, fields };
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
                    })           
                });
               
                return this.refresh(); 
        }
        }, 5000);
        }


get  UPDATECOLUMNS(){

return this.arr[0].id===this.varEdited ? columnsOne:columnsTwo
}
showTime=false
        currentTime=''
        attendanceLimitTime=''
       
        currentTimeHandler(){
            setInterval(()=>{
            let dateTime=new Date()
            let hours=dateTime.getHours()
            let minutes=dateTime.getMinutes()
            let seconds=dateTime.getSeconds()
            if(Math.sign(18-hours)===-1){
                let hoursLimit=33-hours
                let minutesLimit=59-minutes
                let secondsLimit=59-seconds
                this.attendanceLimitTime=`${hoursLimit}:${minutesLimit}:${secondsLimit}`
               this.varEdited='Hell'
            }
            else {
                let hoursLimit=18-hours
                let minutesLimit=59-minutes
                let secondsLimit=59-seconds
               
                this.attendanceLimitTime=`${hoursLimit}:${minutesLimit}:${secondsLimit}`
              
                if(18-hours===0){
                    this.varEdited='Hello'
                  this.showTime=true
                }  
            }
           
       // console.log('minnn',59-minutes)
       // console.log('sec',59-seconds)
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
       
           if(this.currentTime>='05:37:00 pm' ){
            //this.showTime=true
           
           
            
            }

        
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
      
        timer 
    timerRef
      /*  StartTimerHandler(){
            const startTime = new Date().setHours(20)
            window.localStorage.setItem('startTimer', startTime)
            return startTime
        }*/
        setTimer(){
            const startTime =new Date().setHours(20)
                window.localStorage.setItem('startTimer', startTime)
               const timelee= window.localStorage.getItem('startTimer')
            
            setInterval(()=>{
               
                const con=new Date().getTime()  
                const secsDiff =timelee-con
                this.timer = this.secondToHms(secsDiff)
            }, 1000)
        }
        expiredDate
        secondToHms(d){
           d = Number(d)
               var days = Math.floor(d/ (1000 * 60 * 60 * 24));
               var hrs = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
               var seconds = Math.floor((d % (1000 * 60)) / 1000);
               
    this.timerOne= `${days}d:${hrs}h:${minutes}m:${seconds}s` 
            
            
        }
    
       
        

avatorShowData=[]
        tableClick(event){
            const dt = this.template.querySelector('lightning-datatable');
          //  dt.openInlineEdit();
          const row = event.detail.row;
         console.log('ev',row)
         
         var arr=[{id:0,audi:'/aadhi.mp3'},{id:1,audi:'/aadi.mp3'},{id:2,audi:'/venkatesh.mp3'},
         {id:3,audi:'/adivisesh.mp3'},{id:4,audi:'/akhil.mp3'},{id:5,audi:'/alluarjun.mp3'},
         {id:6,audi:'/balakrishna.mp3'},{id:7,audi:'/chiranjeevi.mp3'},{id:8,audi:'/gopichand.mp3'},
         {id:9,audi:'/jagpathibabu.mp3'},{id:10,audi:'/maheshbabu.mp3'},{id:11,audi:'/raviteja.mp3'},
         {id:12,audi:'/mohanbabu.mp3'},
         {id:13,audi:'/nagachaitanya.mp3'},{id:14,audi:'/nagarjuna.mp3'},{id:15,audi:'/nagashaurya.mp3'},
         {id:16,audi:'/nani.mp3'},{id:17,audi:'/ntr.mp3'},{id:18,audi:'/pawankalyan.mp3'},
         {id:19,audi:'/prabhas.mp3'},{id:20,audi:'/ramcharan.mp3'},{id:21,audi:'/rana.mp3'},
         {id:22,audi:'/saikumar.mp3'},{id:23,audi:'/siddharth.mp3'},{id:24,audi:'/sreevishnu.mp3'},
         {id:25,audi:'/srikanth.mp3'},{id:26,audi:'/tarun.mp3'},{id:27,audi:'/varuntej.mp3'},
         {id:28,audi:'/vijay.mp3'},{id:29 ,audi:'/vishwaksen.mp3'}]
        
         var arrOne=[]
        var selectedRecords =  
        this.template.querySelector("lightning-datatable").getSelectedRows(); 
        this.avatorShowData= selectedRecords   
        console.log('rows',JSON.stringify(selectedRecords))
        arr.forEach(row=>{
            var arrlen=row.audi.length
            var arrdot=row.audi.indexOf('.')
          arrOne.push({id:row.id,aud:row.audi.slice(1,-(arrlen-arrdot)).toLowerCase()})  
           // console.log('MMK',row.audi.indexOf('/'),arrlen-arrdot,
        //row.audi.slice(1,-(arrlen-arrdot)).toLowerCase(),JSON.stringify(arrOne))
        arrOne.filter(fill=>{
            selectedRecords.forEach(item=>{
                if(item.Name===fill.aud){
                  //  console.log('addfilter',JSON.stringify(fill))
                    var   ringtone= new Audio(DoctorMain+arr[fill.id].audi)
                    ringtone.play()
                        } 
              
            }) 
        })
        
        })
        
        }
        rowOneClass="slds-vertical-tabs__content slds-hide "
        rowTwoClass="slds-vertical-tabs__content slds-hide "
        rowThreeClass="slds-vertical-tabs__content slds-hide "
 rowOneHandler(){
    const contentBlockClasslist = this.template.querySelector('.RowOne').classList;
    contentBlockClasslist.toggle('slds-is-active');
if(this.rowOneClass==="slds-vertical-tabs__content slds-hide "){
    this.rowOneClass="slds-vertical-tabs__content slds-show"
   this.rowTwoClass="slds-vertical-tabs__content slds-hide "
    this.rowThreeClass="slds-vertical-tabs__content slds-hide "
}else{
    this.rowOneClass="slds-vertical-tabs__content slds-hide "
}
        }
 rowTwoHandler(){
       const contentBlockClasslist = this.template.querySelector('.RowTwo').classList;
     contentBlockClasslist.toggle('slds-is-active');
            if(this.rowTwoClass==="slds-vertical-tabs__content slds-hide "){
                this.rowTwoClass="slds-vertical-tabs__content slds-show"
                this.rowOneClass="slds-vertical-tabs__content slds-hide "
                this.rowThreeClass="slds-vertical-tabs__content slds-hide "
            }else{
                this.rowTwoClass="slds-vertical-tabs__content slds-hide "
            }
        }
 rowThreeHandler(){
 const contentBlockClasslist = this.template.querySelector('.RowThree').classList;
             contentBlockClasslist.toggle('slds-is-active');
        if(this.rowThreeClass==="slds-vertical-tabs__content slds-hide "){
                this.rowThreeClass="slds-vertical-tabs__content slds-show"
                this.rowTwoClass="slds-vertical-tabs__content slds-hide "
                this.rowOneClass="slds-vertical-tabs__content slds-hide "
            }else{
                this.rowThreeClass="slds-vertical-tabs__content slds-hide "
            }
        }

        toggleIconName = '';toggleButtonLabel 
        toggledropdownlabel
        get dropDown(){
            return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
         }
        handleToggleClick() {
            const contentBlockClasslist = this.template.querySelector('.ImageStaff').classList;
            contentBlockClasslist.toggle('slds-rise-from-ground');
            if (this.toggleIconName === 'preview') {
                this.toggleIconName = '';
               this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click ";
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
            }else {
                this.toggleIconName = 'preview';
                 this.toggledropdownlabel="slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open";
                this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
            }
        }
        showModal=false
        clickPatientHandler(){
            this.showModal=true
        }
    
        closeHandler(){
            this.showModal=false
        }
avatorShowDa=[]
        selectBoxHandler(){
            var selectedRecords =  
            this.template.querySelector('[data-id="datarow"]').getSelectedRows();
        this.avatorShowDa= selectedRecords   
        console.log('rowsOO',JSON.stringify(selectedRecords))
             deleteEnquiry({enquiryList: selectedRecords})  
             .then(result=>{  
               return refreshApex(this.patientData);  
             })  
             .catch(error=>{  
               alert('Cloud not delete'+JSON.stringify(error));  
             }) 
        
        }
        

        saveDraftValues = [];
        handlePatientSave(event) {
            this.saveDraftValues = event.detail.draftValues;
            const recordInputs = this.saveDraftValues.slice().map(draft => {
                const fields = Object.assign({}, draft);
                return { fields };
            });
        
            // Updateing the records using the UiRecordAPi
            const promises = recordInputs.map(recordInput => updateRecord(recordInput));
            Promise.all(promises).then(res => {
                this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
                this.saveDraftValues = [];
                return this.refresh();
            }).catch(error => {
                this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
            }).finally(() => {
                this.saveDraftValues = [];
            });
        }
        
        ShowToast(title, message, variant, mode){
            const evt = new ShowToastEvent({
                    title: title,
                    message:message,
                    variant: variant,
                    mode: mode
                });
                this.dispatchEvent(evt);
        }
        
        // This function is used to refresh the table once data updated
        async refresh() {
            await refreshApex(this.patientData);
        }
        
        navigateToLwcLogin(){
    
            this[NavigationMixin.Navigate]({
                type:'standard__webPage',
                attributes:{
                    url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
                }
            })             
        }       
      
      
    }