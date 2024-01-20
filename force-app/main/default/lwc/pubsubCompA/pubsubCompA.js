import { LightningElement ,wire} from 'lwc';
import{CurrentPageReference}
      from 'lightning/navigation';
import { fireEvent } 
       from 'c/pubSubMain';
export default class PubsubCompA extends LightningElement {
  /* message
    inputHandler(event){
        this.message = event.target.value
    }
    publishHandler(){
       // pubSub.publish('componentA', this.message)
       fireEvent(this.pageRef,
        'restaurantListUpdate',
          this.message);
          fireEvent({pageReference}, {eventName}, {data}) 
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