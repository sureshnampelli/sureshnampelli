import { LightningElement ,wire ,api} from 'lwc';
import { getRecord ,getFieldValue} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD  from '@salesforce/schema/Account.Name';
export default class WireWithProperty extends LightningElement {
    @api recordId;

    @wire(getRecord, {recordId: "$recordId" , fields: [ACCOUNT_NAME_FIELD]})
    record;

    get name(){
        return getFieldValue(this.record.data, ACCOUNT_NAME_FIELD)
    }
}