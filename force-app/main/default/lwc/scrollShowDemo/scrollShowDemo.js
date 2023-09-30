import { LightningElement } from 'lwc';
import ShowOne from '@salesforce/resourceUrl/scrollShowOne';
import ShowTwo from '@salesforce/resourceUrl/scrollShowTwo';
import ShowThree from '@salesforce/resourceUrl/scrollShowThree';
import ShowFour from '@salesforce/resourceUrl/scrollShowFour';
import ShowFive from '@salesforce/resourceUrl/scrollShowFive';
import ShowSix from '@salesforce/resourceUrl/scrollShowSix';
import ShowSeven from '@salesforce/resourceUrl/scrollShowSeven';
import ShowEight from '@salesforce/resourceUrl/scrollShowEight';
import ShowNine from '@salesforce/resourceUrl/scrollShowNine';

export default class ScrollShowDemo extends LightningElement {
scrollOne=ShowOne 
scrollTwo=ShowTwo
scrollThree=ShowThree
scrollFour=ShowFour
scrollFive=ShowFive
scrollSix=ShowSix
scrollSeven=ShowSeven
scrollEight=ShowEight
scrollNine=ShowNine
imageUrlArray=[{image:this.scrollOne ,id:1},{image:this.scrollTwo,id:2},{image:this.scrollThree,id:3},
    {image:this.scrollFour,id:4},{image:this.scrollFive
        ,id:5},{image:this.scrollSix,id:6},{image:this.scrollSeven,id:7},{image:this.scrollEight,id:8},{image:this.scrollNine,id:9}];

    imgaeShow=this.imageUrlArray
    theCharImg
    calledOnce=false
    imageStatus;
    selectedImageurl
    selectedId;
    classStyle;
    checkedKey
    renderedCallback(){
        if(!this.calledOnce){
            this.calledOnce=true;
            this.checkedKey=this.template.querySelectorAll(".checkedBox")
            this.checkedKey.indeterminate = true
            this.checkedKey.addEventListener("change",()=>{if(this.checkedKey.checked){this.placekill=true}
                    
                    
                })
            
        }
    }
    checked = true;
changeToggle(event){
    this.checked = !this.checked;
}
    
    handleClick(){
        this.classStyle=" slds-list_horizontal slds-scrollable_x "
        for(let imagesrc of this.imageUrlArray){
            this.selectedImageurl=imagesrc.image}
            for(let ids of this.imageUrlArray ){
                this.selectedId=ids.id++}
        }
    
        handleClicked(){
            
            this.place=true
            this.persentRing=20
            this.isLong=1
            this.arcX=Math.cos(2 * Math.PI *60)
            this.arcY  =Math.sin(2 * Math.PI *60) 
        }
        placekill=false
        place=false
    
        somi;
        rami;
        selected;
        billa
        status=''; 
        styleClass
        handleicon() {
          this.status = !this.status;
              this.billa = this.template.querySelector("lightning-icon")
                   this.status ? this.billa.addEventListener("mouseover",this.status='success',true)
                    
                   :  this.billa.addEventListener("mouseout",this.status='',true)
              
            }
            renderedCallback(){
                this.classStyle=  this.status==''? " slds-list_horizontal slds-scrollable_x":" slds-list_vertical  slds-scrollable_y " 
                this.styleClass=  this.status==''? "width:15% ;height:20%":"width:15% ;height:20%" 

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
            persentRing
            isLong
            arcX
            arcY
        
           


        
}