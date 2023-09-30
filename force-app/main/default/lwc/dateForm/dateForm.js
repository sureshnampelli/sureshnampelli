import { LightningElement ,api} from 'lwc';

export default class DateForm extends LightningElement {
@api    
    date='';
    datetime='';

    handleChange(event) {
        const field = event.target.name;
        if (field === "date") {
          this.date = event.target.value;
        } else if (field === "datetime") {
          this.datetime = event.target.value;
        }
      }
      get onlydate() {
        return this.date;
      }
      get datetime(){
        return this.datetime ;
      }
}