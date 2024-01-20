import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModal=false
    msg
    handleClick(){
        this.showModal=true
    }
    closeHandler(event){
        this.msg=event.detail.msg
        this.showModal=false
    }
}