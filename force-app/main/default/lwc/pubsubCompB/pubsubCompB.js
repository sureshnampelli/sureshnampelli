import { LightningElement ,wire} from 'lwc';
import{CurrentPageReference} 
   from 'lightning/navigation';
import { registerListener,
   unregisterAllListeners } 
   from 'c/pubSubMain';
export default class PubsubCompB extends LightningElement {
   /* message
    connectedCallback(){
        this.callSubscriber()
    }
    callSubscriber(){
        pubSub.subscribe('componentA', (message)=>{
            this.message = message
        })
    }*/
    /*connectedCallback() {
        registerListener('restaurantListUpdate' 
                     ,this.handleRestaurants, 
                     this);
        }
        
        disconnectedCallback() {
           unregisterAllListeners(this);
        }
*/
       /* @wire(CurrentPageReference)
        getPageReferenceParameters(currentPageReference) {
           if (currentPageReference) {
              console.log(currentPageReference);
              this.recordId = currentPageReference.attributes.recordId || null;
              let attributes = currentPageReference.attributes;
              let states = currentPageReference.state;
              let type = currentPageReference.type;
           }
        }*/
}