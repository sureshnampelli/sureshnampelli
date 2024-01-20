import { LightningElement } from 'lwc';
import {ShowToastEvent} from'lightning/platformShowToastEvent'
export default class ToastNotification extends LightningElement {
    toastHandler(){
      const event=  new ShowToastEvent({
            title:'Success!!',
            message:'Account Created!!',
            variant:'success'
        })
        this.dispatchEvent(event)
    }
}