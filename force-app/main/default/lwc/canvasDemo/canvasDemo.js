import { LightningElement } from 'lwc';

export default class CanvasDemo extends LightningElement {
    scanvas;
    ctx
    width
    height
    coneCanvas
    ctxOne
    cTwoCanvas
    curX;
curY;
ctxTwo
    renderedCallback(){
    this.scanvas = this.template.querySelector(".myCanvas");
    this.ctx = this.scanvas.getContext("2d");
    function degToRad(degrees) {
        return (degrees * Math.PI) / 180;
      }

     this.ctx.fillStyle = "rgb(255, 0, 0)";
      this.ctx.beginPath();
      this.ctx.moveTo(50, 50);
      this.ctx.lineTo(150, 50);
      const triHeight = 50 * Math.tan(degToRad(60));
     this.ctx.lineTo(100, 50 + triHeight);
      this.ctx.lineTo(50, 50);
      this.ctx.fill();
      this.ctx.fillStyle = "rgb(0, 0, 255)";
      this.ctx.beginPath();
      this.ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
      this.ctx.fill();
      this.ctx.fillStyle = "yellow";
this.ctx.beginPath();
this.ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
this.ctx.lineTo(200, 106);
this.ctx.fill();
this.ctx.strokeStyle = "white";
this.ctx.lineWidth = 1;
this.ctx.font = "36px arial";
this.ctx.strokeText("Canvas text", 50, 50);

this.ctx.fillStyle = "red";
this.ctx.font = "48px georgia";
this.ctx.fillText("Canvas text", 50, 150);

this.scanvas.setAttribute("aria-label", "Canvas text");


this.coneCanvas=this.template.querySelector(".myOneCanvas");
this.ctxOne = this.coneCanvas.getContext("2d");
this.ctxOne.strokeStyle = "blue";
this.ctxOne.lineWidth = 1;
this.ctxOne.font = "36px arial";
this.ctxOne.strokeText("Canvas text", 50, 50);

this.ctxOne.fillStyle = "red";
this.ctxOne.font = "48px georgia";
this.ctxOne.fillText("Canvas text", 50, 150);

this.coneCanvas.setAttribute("aria-label", "Canvas text");



this.cTwoCanvas=this.template.querySelector(".myTwoCanvas");
this.ctxTwo = this.cTwoCanvas.getContext("2d");

this.ctxTwo.strokeStyle = "blue";
this.ctxTwo.lineWidth = 1;
this.ctxTwo.font = "36px arial";
this.ctxTwo.strokeText("Canvas text", 50, 50);


this.cTwoCanvas.setAttribute("aria-label", "Canvas text");
// update mouse pointer coordinates

this.cTwoCanvas.addEventListener("click", () => {
    this.ctxTwo.fillStyle = "rgb(0,0,0)";
    this.ctxTwo.fillRect(0, 0, width, height);
  });
    
    }
      
    get(){
    
    }
    handleClear(){
    
    }
        

}