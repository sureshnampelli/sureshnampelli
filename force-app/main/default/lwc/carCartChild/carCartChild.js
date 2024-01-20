import { LightningElement,api } from 'lwc';

export default class CarCartChild extends LightningElement {
@api objtwo
outCartHandler(event){
    const myEvent=new CustomEvent('clear',{
        detail:{msgName:event.target.name.car}
    })
    this.dispatchEvent(myEvent)
}

closeHandler(){
    const myEventOne=new CustomEvent('close')
    this.dispatchEvent(myEventOne) 
}
}