import { LightningElement } from 'lwc';

export default class ResistanceCaliculator extends LightningElement {
    status='';
    number=6;
    number2=3;
    buttonClicked;
   storeTwo;
   storeone;
   outmap=[];
   ramu=[]
billa;
   somu;
   handleicon() {
    this.status = !this.status;
        this.billa = this.template.querySelector("lightning-icon")
             this.status ? this.billa.addEventListener("mouseover",this.status='success',true)
              
             :  this.billa.addEventListener("mouseout",this.status='',true)
        
      }
     get clean(){
        if(this.status==''){
        return  this.number+this.number2
           
                     }
                     else{return this.number*this.number2}
     }
 

  
    valueone='Resistor Value';
    valuetwo='Resistor Value';
    valuethree ='Resistor Value';
    resistance;
    Resistancevalue;
    
    myMap=new Map();
    postalColumns = [
        { label: 'Key', fieldName: 'Key' },
        { label: 'Value', fieldName: 'Value' }];

    resistor=[{one: '${this.valueone}' ,two:this.valuetwo ,three:this.valuethree}];

    get Band1() {
        return [
           
            { label: 'Block', value: 0 },
            { label: 'Brown', value: 1 },
            { label: 'Red', value: 2 },
            { label: 'Orange', value: 3 },
            { label: 'Yellow', value: 4 },
            { label: 'Green', value: 5 },
            { label: 'Blue', value: 6 },
            { label: 'Violet', value: 7},
            { label: 'Gray', value: 8 },
            { label: 'White', value: 9 }
           
        ];
    }

    get Band2() {
        return [
            { label: 'Block', value: 0 },
            { label: 'Brown', value: 1 },
            { label: 'Red', value: 2 },
            { label: 'Orange', value: 3 },
            { label: 'Yellow', value: 4 },
            { label: 'Green', value: 5 },
            { label: 'Blue', value: 6 },
            { label: 'Violet', value: 7},
            { label: 'Gray', value: 8 },
            { label: 'White', value: 9 }
           
        ];
    }

    get Band3() {
        return [
            { label: 'Block', value: 1 },
            { label: 'Brown', value: 10 },
            { label: 'Red', value: 100 },
            { label: 'Orange', value: 1000 },
            { label: 'Yellow', value: 10000 },
            { label: 'Green', value: 100000},
            { label: 'Blue', value: 1000000 },
            { label: 'Violet', value: 10000000},
            { label: 'Gray', value: 100000000 },
            { label: 'White', value: 1000000000 }
           
        ];
    }

    handleChange1(event) {
        this.valueone = event.detail.value;

    }

    handleChange2(event) {
        this.valuetwo = event.detail.value;
        const startone= event.detail.value;
        window.localStorage.setItem('startoneTimer', startone);
    }

    handleChange3(event) {
        this.valuethree = event.detail.value;
        const startTwo= event.detail.value;
        window.localStorage.setItem('startTwoTimer', startTwo);

        
    }

    handleClick(){
this.resistance=((this.valueone+this.valuetwo)*10*this.valuethree)/1000 ;
this.storeone=window.localStorage.getItem("startoneTimer");
this.storeTwo=window.localStorage.getItem("startTwoTimer");
this.myMap.set('window.localStorage.getItem("startoneTimer")',window.localStorage.getItem("startTwoTimer"));

this.outmap=this.myMap.get('window.localStorage.getItem("startoneTimer")');
window.localStorage.setItem('keymap', this.myMap);





    }


        
    
    handleClean(){
        function logMapEle(key,Value,map){
        this.ramu=['${key}','${value}'];
        this.somu=['${key}','${value}'];
        console.log('@@@@@@@@@@@@@' ,'m[${key}]=${value}');

        }
        new Map(['name','suresh'],['number',123]).forEach(logMapEle);
    }

    

    message = '';
 
    connectedCallback() {
        this.message = 'Fetching data...';
        this.fetchData(); // Simulating an API call
    }
 
    fetchData() {
        setTimeout(() => {
            this.Resistancevalue=this.resistor.one ;
            this.message='Hello World';

        }, 10000); // Simulating a delay of 10 seconds
    }

    
}


