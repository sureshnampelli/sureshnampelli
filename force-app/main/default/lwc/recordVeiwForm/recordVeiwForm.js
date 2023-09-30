import { LightningElement ,api,track} from 'lwc';
import date from '@salesforce/schema/WEEK_OFF__C.DATE__C' ;
import monthholiday from '@salesforce/schema/WEEK_OFF__C.MONTH_HOLIDAY__C';
export default class RecordVeiwForm extends LightningElement {
  @api  recordId;
   @api objectName;
   @track fields =[date ,monthholiday];
   connectedCallback(){
    this.objectName=this.objectName;
   }
}