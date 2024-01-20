import { LightningElement,wire,track,api } from 'lwc';
import getAdmin from '@salesforce/apex/AzCompanyController.getAdmin';
import getUserDetails from '@salesforce/apex/ProjectTwoController.getUserDetails';
import Id from '@salesforce/user/Id';
import { getRecord,getFieldValue  } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import UsrRoleName from '@salesforce/schema/User.Name';
import AZAD_ID from '@salesforce/schema/AZ_Admin__c'
import AZAD_NAME from '@salesforce/schema/AZ_Admin__c.Name'
import AZAD_PHONE from '@salesforce/schema/AZ_Admin__c.Phone__c'
import ENQUIRY_OBJ from '@salesforce/schema/Enquiry__c'
import ENQUIRY_TYPE from '@salesforce/schema/Enquiry__c.Type__c'
import CustomerProfileIcons from '@salesforce/resourceUrl/CustomerProfileIcons'
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import { NavigationMixin } from 'lightning/navigation';
export default class ProjectLwcTwo extends NavigationMixin (LightningElement) {
   work= CustomerProfileIcons+'/work.png' 
   nowork= CustomerProfileIcons+'/noworkone.png'
   @track IndustryPicklistValues
   fields=[AZAD_NAME,AZAD_PHONE]
   subscription = {};
    CHANNEL_NAME = '/event/RefreshDataTable__e';

    @wire(getUserDetails)
    wiredUser({data,error}){
        if(data){
            console.log('user',data)
        }if(error){
            console.error(error)
        }
    }
    @wire(getRecord, { recordId: Id, fields: [UsrRoleName ]}) 
    currentUserInfo({error, data}) {
        console.log('userid',Id);
        console.log('data',JSON.stringify(data));
        console.log('error',JSON.stringify(error));
        /*data {"apiName":"User","childRelationships":{},
        "fields":{"Name":{"displayValue":null,"value":"suresh kumar"}},"id":"0055j000009tgG2AAI","lastModifiedById":"0055j000009tgG2AAI","lastModifiedDate":"2024-01-18T05:53:49.000Z",
        "recordTypeId":null,"recordTypeInfo":null,"systemModstamp":"2024-01-18T05:53:49.000Z"}*/
        }
        @wire(getRecord, { recordId:AZAD_ID,fields:[AZAD_NAME] })
        wiredgetRecordAdmin({data,error}){
            console.log('data AZADMIN',JSON.stringify(data));
            console.log('error',JSON.stringify(error));
        }
        navigateToPostalApi(){
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                    pageName: 'hTR'
                },
            }); 
        }
        @track value
        pickTypeEnquiry=[]
        @wire(getObjectInfo, { objectApiName: ENQUIRY_OBJ })
        objectInfo;
        @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName:ENQUIRY_TYPE})
    IndustryPicklistValues({data,error}){
        if(data){
            console.log("pick",data)
            this.pickTypeEnquiry=[...this.generatePicklist(data)]
        }
        console.log(error)
    } 
    generatePicklist(data){
        return data.values.map(pick=>({  label:pick.label,value:pick.value}))
    }
    handleChangeIndustryPicklistValues(event) {
console.log('IndustryPicklistValues',event.detail.value)
this.isFacilityButton=event.detail.value
    } 
    toggleIconName = 'utility:preview';
    textPassword="password"
     handleToggleClick() {
     if (this.toggleIconName === 'utility:preview') {
         this.toggleIconName =  'utility:hide'
         this.textPassword="text"
     } else {
         this.toggleIconName = 'utility:preview';
         this.textPassword="password"
     }} 
     changePasswordHandler(event){
        console.log(event.target.value)
     }
     handleSubmit(event){
        //you can change values from here
        //const fields = event.detail.fields;
        //fields.Name = 'My Custom  Name'; // modify a field
        console.log('Account detail : ',event.detail.fields);
        console.log('Account name : ',event.detail.fields.Name);
    }
    handlePostalApi(){
        this.template.querySelector('c-postal-api').reload(); 
    }
    isFacilityButton
    get selectedClass(){
        return this.isFacilityButton==="others" ? ' slds-theme_default geeks slds-box' : ' geeks slds-box'; // you can use your custom class here.
  
    }
@wire(getAdmin)
wiredAdmin({data,error}){
    if(data){
        let arr=[]
        let arrOne=[]
        data.forEach(record=>{
            let objAd= Object.assign({}, record);
            objAd.Name=record.Name
            objAd.Phone=record.Phone__c
            arr.push(objAd)
        })
        data.forEach(record=>{
            let objAd= Object.assign({});
            objAd.Name=record.Name
            objAd.Phone=record.Phone__c
            arrOne.push(objAd)
        })
        console.log('Object.assign({})',JSON.stringify(arrOne))
        console.log('Object.assign({}, record)',JSON.stringify(arr))

    }
    if(error){
        console.error(error)
    }
}

    date
connectedCallback() {
   this.date=new Date().toISOString().split("T")[0]
  const  res = this.date.split('-')
   console.log('date',this.date,JSON.stringify(res),)
  // /--IN APEX CLASS--/Date.newInstance(Integer.valueOf(res[2]), Integer.valueOf(res[1]), Integer.valueOf(res[0]))
 subscribe(this.CHANNEL_NAME, -1, this.handleEvent).then(response => {
            this.subscription = response;
        });

        onError(error => {
            
        });
    }

    handleEvent = event => {
        const refreshRecordEvent = event.data.payload;
        if (refreshRecordEvent.RecordId__c === this.recordId) {
            this.recordId = '';
            return refreshApex(this.refreshTable);
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription, () => {

        });
    }


}