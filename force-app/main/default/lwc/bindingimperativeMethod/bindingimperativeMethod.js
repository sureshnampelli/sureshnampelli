import { LightningElement } from 'lwc';
import getAccList from '@salesforce/apex/AccController.getAccList';
export default class BindingimperativeMethod extends LightningElement {
    accounts;
    error;
    handleClick(){
        getAccList()
        .this((result)=>{
            this.accounts=result;
            this.error=undefined

        })
        .catch((error)=>{
            this.error=error;
            this.accounts=undefined;
        });
    }
}