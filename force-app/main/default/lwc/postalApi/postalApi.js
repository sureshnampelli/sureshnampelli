import { LightningElement } from 'lwc';

export default class PostalApi extends LightningElement {
    pincodeNum;
    pinCodeTin;
    pincodeNumber;
    postalcode=[];
    stram=[];
    postalColumns = [
      { label: 'Name', fieldName: 'Name' },
      { label: 'Circle', fieldName: 'Circle' },
      { label: 'District', fieldName: 'District' },
      { label: 'Division', fieldName: 'Division' },
      { label: 'Region', fieldName: 'Region"' }
  ];
  

  

  changeHandler(event) {
    this.pincodeNumber= event.target.value;
   
  }
  handleClick(){
    fetch('https://api.postalpincode.in/pincode/'+this.pincodeNumber, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log(" ##!!! data", data[0].PostOffice[0])
      console.log(" ####### data", data[0].PostOffice[0].Name);    
     this.postalcode=data[0].PostOffice
     
      
    });

    
  }
  branchName
  changeBranchHandler(event){
this.branchName=event.target.value
  }
  handleClickName(){
    fetch('https://api.postalpincode.in/postoffice/'+this.branchName, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log(" ##!!! data name", data[0])
      console.log(" ##!!! data", data[0].PostOffice[0])
      console.log(" ####### data", data[0].PostOffice[0].Name);    
     this.postalcode=data[0].PostOffice
     
      
    });

    
  }


   /* connectedCallback() {      
this.handleClick();

  }

  handleTin(){
    for(let i=0 ; i<=this.postalcode.length;i++){
      if(this.postalcode[i].Circle=='Andhra Pradesh'){
        console.log("@@@@@@@@@@@@@@",this.postalcode[i].Circle);
this.pinCodeTin=this.postalcode[i].Name;
      }

    }
  }*/
  
}