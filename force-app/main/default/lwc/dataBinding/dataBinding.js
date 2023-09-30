import { LightningElement ,track} from 'lwc';

export default class DataBinding extends LightningElement {
    fullname="salesforce troop";
    @track title="salesforce developer"
    changeHandler(event){
        this.title=event.target.value
    }
}