import { LightningElement ,wire,track} from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import LOGIN_OBJECT from '@salesforce/schema/Login__c';
import TITLE_FIELD from '@salesforce/schema/Login__c.Id'
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
import LOGIN_ID from '@salesforce/schema/Login__c.Id'
import LOGIN_STATUS from '@salesforce/schema/Login__c.Status_Pro__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
export default class GetListUiDemoOne extends LightningElement {
    disabled = false;
    @track error;
    @track showLoading = false;



    logins=[]
    pageToken=null
    nextPageToken=null
    previousPageToken=null
@wire(getListUi , {objectApiName:LOGIN_OBJECT,listViewApiName:'All',
pageSize:10,sortBy:TITLE_FIELD,pageToken:'$pageToken'})
listViewHandler({data,error}){
    if(data){
        console.log('List',data)
        this.logins=data.records.records
        console.log('ListView',data.records.records[0].fields.Id.value)
this.nextPageToken=data.records.nextPageToken
this.previousPageToken=data.records.previousPageToken
    } if(error){
        console.error(error)
    }
}
handlePreviousPage(){
    this.pageToken= this.previousPageToken
}
handleNextPage(){
    this.pageToken= this.nextPageToken
}
splitData=[]
NosplitData
count=0
countOne=1
totalPage

/////

columns = [
      
    { label: 'Full Name', fieldName: 'Full_Name__c' },{ label: 'Status', fieldName: 'Status_Pro__c' },]

loginRecordsDataOneTwo=[]
dotlen=[]
@wire(loginRecords)
wiredLoginRecords(result){
   // this.dotlen=result
    //this.loginRecordsOne=result.data
    this.loginRecordsDataOneTwo=result
   if(result.data){
        console.log('ereewd',result)
        this.dotlen=result
        console.log('loginResult',this.dotlen.data.length/5)
        const NoOfPage=Math.ceil(this.dotlen.data.length/5)
        this.totalPage=Math.ceil(this.dotlen.data.length /NoOfPage);
        const size = Math.ceil(this.dotlen.data.length /NoOfPage);
     this.splitData=   Array.from({ length:NoOfPage }, (v, i) =>
     this.dotlen.data.slice(i * size, i * size + size)
    
    );
    //this.NosplitData= this.splitData[0]
    window.localStorage.setItem('Table',JSON.stringify(this.splitData))
    this.splitData = JSON.parse(window.localStorage.getItem('Table'));
    console.log('spiltResult',JSON.stringify(this.splitData[this.count]))
    console.log('lenresult', this.splitData.length)
            console.log('resoneIUYU',this.loginRecordsDataOneTwo.data)
    }
    
   
    if(result.error){
        console.error(error)
    }
}

selectCheckBoxHandler(){
    var selectedRecords =
      this.template.querySelector("lightning-datatable").getSelectedRows();  
      console.log('rows',selectedRecords)
      selectedRecords.filter(pre=>{
        if(pre.Status_Pro__c==='Present'){
            this.showLoading = true;
console.log('present',pre)

const fields = {};
fields[LOGIN_ID.fieldApiName] = pre.Id;
fields[LOGIN_STATUS.fieldApiName] ='Absent';

const recordInput = { fields };
console.log(recordInput);
updateRecord(recordInput)
.then(() => {
    this.showToast('Success!!', 'Att updated successfully!!', 'success', 'dismissable');
    // Display fresh data in the form
    this.showLoading = false;
    this.handlePreviousPageOne()
    this.handleNextPgeNone()
    return refreshApex(this.dotlen,this.splitData,this.NosplitData);
    
})
.catch(error => {
    this.showLoading = false;
    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
});
        }if(pre.Status_Pro__c==='Absent'){
            this.showLoading = true;
            console.log('Absent',pre)
            const fields = {};
fields[LOGIN_ID.fieldApiName] = pre.Id;
fields[LOGIN_STATUS.fieldApiName] ='Present';

const recordInput = { fields };
console.log(recordInput);
updateRecord(recordInput)
.then(() => {
    this.showToast('Success!!', 'Att updated successfully!!', 'success', 'dismissable');
    // Display fresh data in the form
    this.showLoading = false;
    this.handlePreviousPageOne()
    this.handleNextPgeNone()
    return refreshApex(this.dotlen,this.splitData,this.NosplitData);
})
.catch(error => {
    this.showLoading = false;
    this.showToast('Error!!', error.body.message, 'error', 'dismissable');
});
        }
      })
      if(selectedRecords){}
     /* deleteEnquiry({enquiryList: selectedRecords})  
     .then(result=>{  
       return refreshApex(this.loginRecordsDataOneTwo);  
     })  
     .catch(error=>{  
       alert('Cloud not delete'+JSON.stringify(error));  
     })  */

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
    this.handlePreviousPageOne()
   this.handleNextPgeNone()
    await refreshApex(this.dotlen,this.splitData,this.NosplitData);
}

showToast(title, message, variant, mode) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(evt);
}

////////////////
/*

@wire(loginRecords)
loginWired({data,error}){
    if(data){
        console.log('login',data)
        const NoOfPage=Math.ceil(data.length/5)
        this.totalPage=Math.ceil(data.length /NoOfPage);
        const size = Math.ceil(data.length /NoOfPage);
     this.splitData=   Array.from({ length:NoOfPage }, (v, i) =>
    data.slice(i * size, i * size + size)
   
  );
//this.NosplitData= this.splitData[0]
window.localStorage.setItem('Table',JSON.stringify(this.splitData))
this.splitData = JSON.parse(window.localStorage.getItem('Table'));
  console.log('spilt',JSON.stringify(this.splitData[this.count]))
  console.log('len', this.splitData.length)
    }
    if(error){
        console.error(error)
    }
}*/
renderedCallback(){
    this.NosplitData= this.count=== 0 ? this.splitData[this.count] : this.splitData[this.count]
}
get disablePrevious(){
    return this.count<=0
}
get disableNext(){
    return this.count>= this.totalPage
}
handlePreviousPageOne(){
    this.count= this.count-1
    this.countOne= this.countOne-1
  //  this.NosplitData= this.splitData[this.count]
   /* if(0<=this.splitData[this.count]){
        
        this.NosplitData= this.splitData[this.count]
    }*/
}
handleNextPgeNone(){
   // this.NosplitData= this.splitData[this.count]
    this.count= this.count+1
    this.countOne= this.countOne+1
  /*  if(this.splitData[this.count]<= this.splitData.length){
        
        this.NosplitData= this.splitData[this.count]
 
    }*/
   
}
}