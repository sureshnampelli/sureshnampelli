import { LightningElement ,wire} from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetPicklistValuesByRecordTypeDemo extends LightningElement {
    shippingGeocodeAccuracy
    picklistValue
    @wire(getObjectInfo , { objectApiName: ACCOUNT_OBJECT})
    objectInfo

    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJECT,recordTypeById:'$objectInfo.data.defaultRecordTypeId' })
    accountPicklists({data,error}){
        if(data){
            console.log(data)
           this.shippingGeocodeAccuracy= data.picklistFieldValues.ShippingGeocodeAccuracy

        }
        if(error){
            console.error(error)
        }
    }
    handleChange(event){
        this.picklistValue=event.detail.values
    }

    


}