import { LightningElement } from 'lwc';

export default class DateValidation extends LightningElement {
    startDate
    endDate
error
    dateHandler(event){
        const {value,name}=event.target
        this[name]=value //this.startDate
    }

    submitHandler(){
       if(this.validateDate(this.startDate , this.endDate)) {
        console.log('Date is Valid')
       }else{
this.error="End Date cannot be greater than startDate"
       }
    }
    validateDate(startDate , endDate){
        return new Date(startDate).getTime()< new Date(endDate).getTime()
    }
}