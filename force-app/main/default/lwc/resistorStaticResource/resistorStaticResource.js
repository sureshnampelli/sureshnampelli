import { LightningElement } from 'lwc';
import ResistanceDemo from '@salesforce/resourceUrl/resistanceCalling';

export default class ResistorStaticResource extends LightningElement {
    theCharImg
    calledOnce=false
    resistance=ResistanceDemo
    renderedCallback(){
        if(!this.calledOnce){
            this.calledOnce=true;
            this.template.querySelectorAll("lightning-button").forEach((btnEle)=>{
                btnEle.addEventListener("mouseover",(event)=>{
                    this.theCharImg=`${resistance}/images/${event.target.label}.jpg`
                    
                })
            })
        }
    }
}