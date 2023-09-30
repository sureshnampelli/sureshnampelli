import { LightningElement , api } from 'lwc';

export default class ExampleJavaScript extends LightningElement {
    showText=false;
    hideText=false;
    persons=[];
    person1=[{id:1 ,name:'suresh', company:'TCS'},{id:2, name:'Anil' ,company:'Tech'}];
    person2=[{id:3,name:'Ramu' , company:'IBM'}];
    persons=this.person1.concat(this.person2);
    num1 = 10;
    num2 = 5;
   
    get additionResult() {
      return this.num1 + this.num2; 
    }
   
    get subtractionResult() {
      return this.num1 - this.num2; 
    }
   
    get multiplicationResult() {
      return this.num1 * this.num2; 
    }
    showHandler(){
        this.showText=true;
    }

    hideHandler(){
        this.hideText=true;
    }
    
    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'additionResult' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finish', value: 'finished' },
        ];
        
    }

    /* options(){
        return [
            { label: 'HYD', value: 'HYD' },
            { label: 'CHE', value: 'CHE' },
            { label: 'PUNE', value: 'PUNE' },
        ];
    }*/
    
    _uppercaseItemName;

    @api
    get itemName() {
      return this._uppercaseItemName;
    }
  
    set itemName(value) {
      this._uppercaseItemName = value.toUpperCase();
    }
    handleChange(event) {
        this.value = event.detail.value;

    }
   

}