import { LightningElement,wire } from 'lwc';
import getAttendanceMeta from '@salesforce/apex/HospitalAttendanceRegisterController.getAttendanceMeta';
import getRegister from '@salesforce/apex/HospitalAttendanceRegisterController.getRegister';
export default class HospitalAttendanceRegister extends LightningElement {
    today
    connectedCallback(){
this.today= new Date().toISOString().slice(0,10);
console.log( 'today',this.today)
    }

@wire(getAttendanceMeta)
wiredMetaData
COLUMNS=[{label:"Name",fieldName:"Label",editable:true},
{label:"Status Pro",fieldName:"Status_Pro__c",type:"boolean",value:true,editable:true}]
UPDATECOLUMNS=[{label:"Name",fieldName:"Name" ,editable:true},
{label:"Status",fieldName:"Status__c",editable:true,type:"boolean",value:true}]
updaterecords  
selecteddate 
showupdatedTable=true
selectedtoday=false
error
changeDateHandler(event){
console.log('html date',event.target.value)
this.selecteddate=event.target.value
getRegister({toDate: this.selecteddate}).then(result=>{
    console.log("getRegister",result)
    this.updaterecords=result;
if(this.today=== this.selecteddate){
if( this.updaterecords==null || this.updaterecords=== undefined || this.updaterecords==''){
this.showupdatedTable=false
this.selectedtoday=true
}
else{
this.showupdatedTable=true
this.selectedtoday=false
}
}
else if( this.today> this.selecteddate){
    if( this.updaterecords==null || this.updaterecords=== undefined || this.updaterecords==''){
        this.showupdatedTable=false
        this.selectedtoday=true
        }
        else{
        this.showupdatedTable=true
        this.selectedtoday=false
        }
} else{
    this.showupdatedTable=false
    this.selectedtoday=false
}
}).catch(error=>{
    this.error=error;
    console.log('eror', +this.error)
})
console.log('selectedtoday',+ this.selectedtoday)
console.log('show table', this.showupdatedTable)
    }
}