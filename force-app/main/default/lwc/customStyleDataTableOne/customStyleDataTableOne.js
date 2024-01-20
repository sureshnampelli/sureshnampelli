import { LightningElement,wire } from 'lwc';
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import LOGIN_OBJECT from '@salesforce/schema/Login__c'
import LO_INOUT from '@salesforce/schema/Login__c.In_Or_Out__c'
import LO_RATING from '@salesforce/schema/Login__c.Rating__c'
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import PresentLogo from '@salesforce/resourceUrl/PresentLogo'
import AbsentLogo from '@salesforce/resourceUrl/AbsentLogo'
//Id , User_Name__c ,Full_Name__c,Login_Time__c, Enter_Password__c ,In_Or_Out__c,
// Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c 
const DEFAULT_ACTION=[
    { label:'All',checked:true,name:"all"},
    { label:'In',checked:false,name:"In"},
    { label:'Out',checked:false,name:"Out"},
]
const columns=[{label:"Full Name",fieldName:"Full_Name__c",hideDefaultActions:true,
typeAttributes: { tooltip: { fieldName: "Full_Name__c" } },},
{label:"In Or Out",fieldName:"In_Or_Out__c",editable:true,
hideDefaultActions:true,type:"customPicklist",
typeAttributes:{
    options:{fieldName:"pickListOptions"},
    value:{fieldName:"In_Or_Out__c"},
    context:{fieldName:"Id"}},actions:DEFAULT_ACTION},
    {label:"Rating",fieldName:"Rating__c",editable:true,
hideDefaultActions:true,type:"customPicklist",
typeAttributes:{
    options:{fieldName:"MultipickListOptions"},
    value:{fieldName:"Rating__c"},
    context:{fieldName:"Id"}}},
{label:"In Out",fieldName:"In_Out__c",type:"boolean",value:true,editable:true,hideDefaultActions:true},
{label:"Type",fieldName:"Type__c",editable:true,value:true,hideDefaultActions:true},
 {label:"Status", fieldName:"Status__c",hideDefaultActions:true,
type:"customName",typeAttributes:{
 statusPro:{
  fieldName:"statusPro"
 } 
  }  },]
export default class CustomStyleDataTableOne extends LightningElement {
    columns= columns
    logins
    refreshLogins 
    loadActionCompleted=false
    loginAllData=[]
    //Ax5211N31
    @wire(loginRecords,{pickList:'$inoutSource',pickList:'$ratingSource'})
    wiredLogin(result){
        this.refreshLogins=result
        if(result.data){
this.logins=result.data.map((record)=>{
    let pickListOptions= this.inoutSource
    let MultipickListOptions= this.ratingSource
let statusPro=record.Status__c === 'Present'?PresentLogo:AbsentLogo
let toogleIcon=record.Status__c==='Present'?PresentLogo:AbsentLogo

return {
    ...record,
    pickListOptions:pickListOptions,
    MultipickListOptions:MultipickListOptions,
    statusPro:statusPro,
    toogleIcon:toogleIcon
}})
this.loginAllData=[...this.logins]
         }if(result.error){
            console.error(error)
        }

    }
    draftValues=[]
 async saveHandler(event){
   let records= event.detail.draftValues
let updateRecordsArray  = records.map((currItem)=>{
    let fieldInput={...currItem};
    return {
        fields:fieldInput
    }
   });
this.draftValues=[];
let updateRecordsArrayPromise= updateRecordsArray.map((currItem)=>updateRecord(currItem)

);
await Promise.all(updateRecordsArrayPromise)
const evt = new ShowToastEvent({
    title: "Success",
    message:  "success",
    variant: "success",
});
this.dispatchEvent(evt);
await refreshApex( this.refreshLogins)
} 



ratingSource=[]
  inoutSource=[]
    inoutActions=[]
@wire(getObjectInfo,{objectApiName:LOGIN_OBJECT})
objectInfo;
@wire(getPicklistValues,{ recordTypeId:"$objectInfo.data.defaultRecordTypeId",
fieldApiName:LO_INOUT})wirePicklist({data,error}){
    if(data){
        console.log('llllllllllllllll',data)
this.inoutSource=data.values;
this.inoutActions=[]
data.values.forEach((currItem) => {
    this.inoutActions.push({
        label:currItem.label ,
        checked:false, 
        name:currItem.value
    }) 
});
/*this.columns.forEach((currIte)=>{
    if(currIte.fieldName==='In_Or_Out__c'){
    currIte.actions=[...currIte,actions,...this.inoutActions]}
})*/
this.loadActionCompleted=true
    }else if(error){
        console.log(error)
    }
}
@wire(getPicklistValues,{ recordTypeId:"$objectInfo.data.defaultRecordTypeId",
fieldApiName:LO_RATING})wireMultiPicklist({data,error}){
    if(data){
        console.log('llllllllllllllll',data)
this.ratingSource=data.values;}
else if(error){
    console.log(error)
}}
headerActionHandler(event){
let actionName=event.detail.action.name
//const colDef=event.detail.columnDefination;
const cols=[...this.columns]
console.log('actionName',actionName)
//console.log('colDef',colDef)
if( actionName==='all'){
    this.logins=[...this.loginAllData]
}else{
    this.loginAllData.filter((currItem) => actionName === currItem["In_Or_Out__c"]

    )
}
cols.find((currIte)=> currIte.fieldName === "In_Or_Out__c").actions.forEach((currIte)=>{
    if(currIte.name === actionName){
        currIte.checked=true;
    }else{
        currIte.checked=false;
    }
})
this.columns=[...cols]
}

get displayData(){
    if( this.logins && this.loadActionCompleted===true ){
        return true;
    }else{
        return false
    }
}
}
