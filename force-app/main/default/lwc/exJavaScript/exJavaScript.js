import { LightningElement ,track} from 'lwc';

export default class ExJavaScript extends LightningElement {
  
persons=[{name:'suresh',company:'TCS'},{name:'Anil' , company:'TECH'}];
  showText=false;
  getter(){
    this.showText=true;
  }
  @track fullname ;
  @track title ;
   numbers=[{name:this.fullname,company:'tcs' },{name:this.title ,company:'IBM'} ];

  changeHandler(event) {
    this[event.target.name] = event.target.value;
  }

  get addTwo(){
return this.fullname*this.title ;
  }

}