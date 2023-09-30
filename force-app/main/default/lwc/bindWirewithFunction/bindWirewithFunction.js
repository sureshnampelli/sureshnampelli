import { LightningElement ,wire} from 'lwc';
import getAccList from '@salesforce/apex/AccController.getAccList';

export default class BindWirewithFunction extends LightningElement {
    accounts;
    error;
    @wire(getAccList)
    wireAccounts({error,data}){
        if(data){
            this.accounts=data;
            this.error=undefined;
        } else if (error){
            this.error=error;
            this.accounts=undefined
        }
    }
}