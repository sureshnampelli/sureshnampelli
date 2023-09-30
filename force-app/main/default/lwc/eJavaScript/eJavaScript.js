import { LightningElement } from 'lwc';
import generateData from './getData';

const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class EJavaScript extends LightningElement {
    data = [];
    columns = columns;

    connectedCallback() {
        const data = generateData({ amountOfRecords: 5 });
        this.data = data;
    }

    value ;
    number =8;

    get options() {
        return [
            { label: 'FOUR', value: 4 },
            { label: 'FIVE', value: 5 },
            { label: 'SIX', value: 6 },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
get isEqual(){ 
    if(this.value==6){
return 'two same numbers';
    }else{
        return 'not same';
    }
}
   

    get twoMultiple(){
        return this.value*this.number;
    }
}

