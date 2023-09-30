import { LightningElement ,track} from 'lwc';


import FName from '@salesforce/schema/Candidate__c.Full_Name__c';
import EmailId from '@salesforce/schema/Candidate__c.Email_Id__c';
import PhoneNumber from '@salesforce/schema/Candidate__c.Phone_Number__c';
import addNewCandidate from '@salesforce/apex/CanController.addNewCandidate'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
  

export default class AddCustomLWC extends LightningElement {

    @track studDetails={
          firstName:FName,         
          phone:PhoneNumber,
          email:EmailId
    };

    FNameChangeHandler(event){
       
        this.studDetails.firstName=event.target.value;
    }

    EmailChangeHandler(event){
     this.studDetails.email=event.target.value;  
    }

    PhoneChangeHandler(event){
        this.studDetails.phone=event.target.value;
    }

    handleClick()
    {
        
       
        addNewCandidate({
            canName:this.studDetails.firstName,
            canEmail:this.studDetails.email,
            canPhone:this.studDetails.phone
        })
        .then(result => {
            const event = new ShowToastEvent({
                title: 'Candidate Registered',
                message: 'New Candidate '+ this.studDetails.firstName +' created.',
                variant: 'success'
            });
            this.dispatchEvent(event);
        })
        .catch(error => {
            const event = new ShowToastEvent({
                title : 'Error',
                message : 'Error creating contact. Please Contact System Admin',
                variant : 'error'
            });
            this.dispatchEvent(event);
        });

    }

}