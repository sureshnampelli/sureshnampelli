import { LightningElement } from 'lwc';
import createAccountContact from '@salesforce/apex/AccountService.createAccountContact';

export default class ApexWrapperCall extends LightningElement {
    contacts=[];
    error;

    handleClick(e)
    {
        var contact=
        {
            LastName:'Sahni',
            Email:'salesforcecodex@gmail.com',
            Phone:'9871506648'
        };
        this.contacts.push(contact);
        var pass=
        {
            Name:'Dhanik',
            NumberOfEmployees:2,
            Contacts:this.contacts
        };
        createAccountContact({wrapper:pass})
        .then(result => {
            console.log('Data:'+ JSON.stringify(result));
        }) .catch(error => {
            console.log(error);
            this.error = error;
        }); 
    }
}