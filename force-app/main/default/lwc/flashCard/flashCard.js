import { LightningElement } from 'lwc';

export default class FlashCard extends LightningElement {
    randomcards={}
    myFlashCards=[
        {
            element:"Hydrogen",
            symbal:"H",
            atomicNumber:1
        },
        {
            element:"Helium",
            symbal:"He",
            atomicNumber:2
        },
        {
            element:"Lithium",
            symbal:"Li",
            atomicNumber:3
        },
        {
            element:"Beryllium",
            symbal:"Be",
            atomicNumber:4
        },
        {
            element:"Carbon",
            symbal:"C",
            atomicNumber:6
        },
        { 
            element:"Boron",
            symbal:"B",
            atomicNumber:5
        },
        {
            element:"Nitrogen",
            symbal:"N",
            atomicNumber:7
        },
        {
            element:"Oxygen",
            symbal:"O",
            atomicNumber:8
        },
        {
            element:"Fluorine",
            symbal:"F",
            atomicNumber:9
        },
        {
            element:"Neon",
            symbal:"Ne",
            atomicNumber:10
        }
    ]
    num
   
    setTimer(){
    setInterval(()=> {
        this.renCallback()  
    }, 2000);}

    handleClicked(){
        this.setTimer()
    }
    handleClick(){
       this.renCallback() 
    }
    
    renCallback(){
        this.num = Math.floor(Math.random()*this.myFlashCards.length); // get a random number between 0-9
   
    for(let i=0; i<=this.myFlashCards.length;i++){
        if(this.myFlashCards[i]==this.myFlashCards[this.num]){
          this.randomcards=this.myFlashCards[i]
        }
    } 
    }
uniquechar=""
 randomchar ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 connectedCallback() {
    for(let i=1;i<5;i++){
this.uniquechar += this.randomchar.charAt(
            Math.random() *this.randomchar.length)
    }
 }
 
    
}