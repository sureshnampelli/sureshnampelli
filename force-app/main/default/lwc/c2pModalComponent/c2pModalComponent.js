import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    closeHandler(){
        const myEvent=new CustomEvent('close',{
            bubbles:true , detail:{ msg:"hai iam modal component" } })
        this.dispatchEvent(myEvent)
    }
}