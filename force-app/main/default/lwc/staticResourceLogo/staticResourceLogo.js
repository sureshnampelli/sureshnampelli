import { LightningElement } from 'lwc';
import salesforceLogostatic from '@salesforce/resourceUrl/salesforceStaticLogo';
import salesForceDemoLogo from '@salesforce/resourceUrl/salesforceLogo';
import resistanceDemo from '@salesforce/resourceUrl/resistancePageDemo';
export default class StaticResourceLogo extends LightningElement {
   showPage
   
   salesforcestaticurl= salesforceLogostatic ;
    salesforcelogourl=salesForceDemoLogo;
    resistanceUrl=resistanceDemo;
somi;
    rami;
    selected;
    billa
    status=''; 
    handleicon() {
      this.status = !this.status;
          this.billa = this.template.querySelector("lightning-icon")
               this.status ? this.billa.addEventListener("mouseover",this.status='success',true)
                
               :  this.billa.addEventListener("mouseout",this.status='',true)
          
        }
        renderedCallback(){
       this.selected=  this.status==''? this.rami:this.salesforcelogourl
       this.selectedImage =this.imageStatus=='high'? this.salesforcestaticurl:this.emptyImage
        }
        imageStatus
        smallImage
        emptyselect
        emptyImage
        selectedImage
        handleImage(){
            this.imageStatus=!this.imageStatus
this.smallImage=this.template.querySelector(".imageSmall")
this.imageStatus? this.smallImage.addEventListener("mouseover" , this.imageStatus='high')
:this.smallImage.addEventListener("mouseover" , this.imageStatus='' )

        }

        

                     
    /* handleClick(){
        this.showPage=true;
     }

     handleCan(){
        this.showPage=false;
     }*/


    
}