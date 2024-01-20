import { LightningElement } from 'lwc';

export default class CheckboxExample extends LightningElement {
    selection=0
    boxOne=10;
    boxTwo=20;
    boxThree=30;
    checkedThree=0
    checkedTwo=0
    checkedOne=0
    checkedThreeOne
    
    handleCheckboxChange() {
        // Query the DOM
        const checked = Array.from(
            this.template.querySelectorAll('.checkedOnce')
        )
            // Filter down to checked items
            .filter((element) => element.checked)
            // Map checked items to their labels
            .map((element) => element.name);
        this.selection = checked.join('+');
    }
    get numberAdd(){
        return this.selection
    }
    handleCheckboxThree(event){
        this.checkedThreeOne=event.target.checked
        this.checkedThree=event.target.name
    }
    handleCheckboxTwo(event){
        this.checkedTwo=event.target.name
    }
    handleCheckboxOne(event){
        this.checkedOne=event.target.name
    }
    get addNumber(){
        
            return this.checkedOne+this.checkedTwo+this.checkedThree    
     

    }
}