import { LightningElement,track } from 'lwc';

export default class FindMethod extends LightningElement {
 person=[{
        name:'Florin',age:25   
    },{name:'Ivan',age:20
    }]
    person2=[{name:'Lian',age:18}];
    bank=[{name:'SBI', CEO:'Suresh'},{name:'CBI',CEO:'Anil'}];
    
    bank1=[{name:'TCS' , CEO:'Ram'},{name:'IBM',CEO:'Kumar'}];
persons=[];
company=[];

persons=this.person.concat(this.person2);  
company=this.bank.concat(this.bank1);  
@track userAge = 18;
 
get ageMessage() {
    if (this.userAge >= 18) {
        return 'You are an adult.';
    } else {
        return 'You are a minor.';
    }
}


employee =[{name:'suresh',name:'naresh'}];
 
  get forEach() {
    return this.company.forEach((per)=>per); 
  }
  numbers = [1, 2, 3, 4, 5];
 
  get SquaredNumbers() {
      return this.persons.map((num) => num.name);
  }

  /*  person={ };
   res='';
   this.persons.forEach(per=>{
    this.person(per.name);
   });*/
   /* findFlo(){
        
        this.res=this.persons.ferEach(findFlorin);
function findFlorin(person){
 return person.name=='Florin';
} 
    }  */

}