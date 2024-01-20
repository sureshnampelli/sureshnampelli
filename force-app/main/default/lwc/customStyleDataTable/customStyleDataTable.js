import { LightningElement ,wire,track} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import {ShowToastEvent} from'lightning/platformShowToastEvent'
import LabLogo from '@salesforce/resourceUrl/LabLogo'
import Receptionist from '@salesforce/resourceUrl/Receptionist'
import DoctorLogo from '@salesforce/resourceUrl/DoctorLogo'
import PharmacistLogo from '@salesforce/resourceUrl/PharmacistLogo'
import NurseLogo from '@salesforce/resourceUrl/NurseLogo'
import PresentLogo from '@salesforce/resourceUrl/PresentLogo'
import AbsentLogo from '@salesforce/resourceUrl/AbsentLogo'
import ManagementLogo from '@salesforce/resourceUrl/ManagementLogo'
import DoctorMain from '@salesforce/resourceUrl/DoctorMain'
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
const columns=[
    {label:"Full Name",fieldName:"loginLink",type:"url", typeAttributes:{
        label:{fieldName:"loginName"},
        target:"_blank"
    }},{label:"In Out",fieldName:"In_Out__c",type:"boolean",value:true,editable:true},
    {label:"Status", fieldName:"Status_Pro__c",
    type:"customName",typeAttributes:{
     statusPro:{
      fieldName:"statusPro"
     } 
      }  },
    {label:"Type", fieldName:"Type__c",
       type:"customRank",typeAttributes:{
        rankIcon:{
            fieldName:"rankIcon"
        } 
         }  }
   ,
   
    {label:"Picture",type:"customPicture",typeAttributes:{
        pictureUrl:{
            fieldName:"Picture_Url_c__c"
        }
    },
cellAttributes:{
    alignment:"center"
}},{label:"User Name", fieldName:"toogleName",
type:"customLink",typeAttributes:{
    toogleLink:{
     fieldName:"toogleLink"
 },toogleIcon:{fieldName:"toogleIcon"} 
  }  }]


  
export default class CustomStyleDataTable extends LightningElement {
    @track showLoading = false;
    saveDraftValues = [];
    count=-1
    
    columns= columns
logins


@wire(loginRecords)
wiredLogin(result){
    if(result.data){
      //  console.log('custom',result.data)
       // this.logins=data
       this.logins=result.data.map((record)=>{
        let loginLink="/" + record.Id;
        let loginName =record.Full_Name__c;
        let statusPro=record.Status_Pro__c === 'Present'?PresentLogo:AbsentLogo
        let toogleIcon=record.Status__c==='Present'?PresentLogo:AbsentLogo
      let toogleLink =record.Id;
      let toogleName = record.User_Name__c;
        if(record.Type__c ==="Doctor"){
            console.log('do')
        }
    let rankIcon=record.Type__c ==="Doctor" ? DoctorLogo :record.Type__c ==="Receptionist" ?  Receptionist
         :record.Type__c ==='LabAssistant'? LabLogo:record.Type__c ==='Pharmacist' ?
          PharmacistLogo:record.Type__c ==='Nurse'?NurseLogo:ManagementLogo
        return {
            ...record,
            loginLink:loginLink,
            loginName:loginName ,
            rankIcon:rankIcon,
            statusPro:statusPro,
            toogleLink:toogleLink,
            toogleName:toogleName,
            toogleIcon:toogleIcon
        }
       })

    }if(result.error){
        console.error(error)
    }
}

tableClick(event){
    const dt = this.template.querySelector('c-custom-style-data-type');
    dt.openInlineEdit();
 console.log('ev',event.target.id)
 
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
this.template.querySelector("c-custom-style-data-type").getSelectedRows();    
//console.log('rows',JSON.stringify(selectedRecords))
arr.forEach(row=>{
    var arrlen=row.audi.length
    var arrdot=row.audi.indexOf('.')
  arrOne.push({id:row.id,aud:row.audi.slice(1,-(arrlen-arrdot)).toLowerCase()})  
   // console.log('MMK',row.audi.indexOf('/'),arrlen-arrdot,
//row.audi.slice(1,-(arrlen-arrdot)).toLowerCase(),JSON.stringify(arrOne))
arrOne.filter(fill=>{
    selectedRecords.forEach(item=>{
        if(item.Full_Name__c===fill.aud){
          //  console.log('addfilter',JSON.stringify(fill))
            var   ringtone= new Audio(DoctorMain+arr[fill.id].audi)
            ringtone.play()
                } 
      
    }) 
})

})

}

getSelectedName(event) {
    const selectedRows = event.detail.selectedRows;
    // Display that fieldName of the selected rows
    for (let i = 0; i < selectedRows.length; i++) {
        alert('You selected: ' + selectedRows[i].User_Name__c);
      console.log('You selected: ' ,selectedRows[i].Id)
    }
}

handleUpdate(event) {
    this.saveDraftValues = event.detail.draftValues;
    console.log('draft',event.detail.draftValues)
    const recordInputs = this.saveDraftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        this.showLoading = true;
        return { fields };
    });

    // Updateing the records using the UiRecordAPi
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(res => {
        this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
        this.saveDraftValues = [];
        this.showLoading = false;
        return refreshApex(this.logins)
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
    await refreshApex(this.logins);
}


}