import { LightningElement } from 'lwc';

export default class ExamChildApp extends LightningElement {
  
    userDetails=[{id:1,name:'Anil'},{id:2,name:'Suresh'},{id:3,name:'Bhaskar'},{id:4,name:'Praveen'}]
    userTimer=[{id:4,name:'Ani'},{id:3,name:'Sures'},{id:2,name:'Bhaska'},{id:1,name:'Prave'}]
    get userNumber(){
      if(this.enCounter>=100){
      return this.userDetails 
      }if(this.enCounter<=95){ return this.userTimer}
    } 
ramu
   selected
    billa;
    status=''; 
    handleicon() {
      this.status=!this.status
          this.billa = this.template.querySelector("lightning-icon")
               this.status ? this.billa.addEventListener("mouseover",this.status='error',true)
                
               :  this.billa.addEventListener("mouseout",this.status='',true)        
        }
       

       
        
connectedCallback(){ 
  this.setTimer() 
}

disconnectedCallback(){
  this.counter=10 ;this.setTimer() 
}

counter=10
timer=30
        enCounter=130;

        setTimer(){
          window.setInterval(()=>{this.enCounter=this.enCounter-1;
           if(this.enCounter==125){  this.setTimerone()}
           if(this.enCounter==90){
            this.counter=10
           }
          if(this.enCounter==70){
            this.setTimerone()
          }  },1000)}

       setTimerone(){ 
        
        window.setInterval(()=>{

       

        if(this.counter>=1){this.handleicon(); 
        return  this.counter=this.counter-1;}
       },1000) } 
      
      
}
