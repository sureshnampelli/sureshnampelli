import { LightningElement } from 'lwc';

export default class CustomLightningCard extends LightningElement {
    handleSlotFooterCange(){
        const footerElem=this.template.querySelecter('footer')
        if(footerElem){
            footerElem.classList.remove('slds-hide')
        }
    }
}