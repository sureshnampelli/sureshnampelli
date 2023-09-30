import { LightningElement ,api ,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
export default class WireWithFunction extends LightningElement {
@api recordId;
accounts;
error;
@wire(getRecord, { recordId: "$recordId" ,fields: ["Account.Name"] })
wiredAccount({error,data}){
    if(data){
        console.log("###Getting data fron wirewith function");
        this.accounts=data;
    }else if(error){
        this.error=error;
        console.log("###Error:" +error.body.message);
    }
}
}