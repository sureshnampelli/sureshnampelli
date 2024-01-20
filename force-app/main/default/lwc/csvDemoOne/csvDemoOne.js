import { LightningElement ,wire } from 'lwc';
import getAccounts from '@salesforce/apex/CsvController.getAccounts';
import {exportCSVFile} from 'c/csvutiliesone'
export default class CsvDemoOne extends LightningElement {
    accountData
    @wire(getAccounts)
    accountHandler({data}){
        if(data){
            console.log(data)
            this.accountData = data
        }
    }
    userData= [
        {
            username:"Nikhil",
            age:25,
            title:"Developer"
        },
        {
            username: 'Salesforcetroop',
            age: 2,
            title: 'Youtube channel'
        },
        {
            username: 'Friends',
            age: 20,
            title: 'Netflix series'
        }
    ]

    headers = {
        username:"User Name",
        age:"Age",
        title:"Title"
    }

    accountHeaders ={
        Id:"Record Id",
        Name:"Name",
        AnnualRevenue:"Annual Revenue",
        Industry:"Industry",
        Phone:"Phone"

    }
    downloadUserDetails(){
        console.log("download triggered.")
        exportCSVFile(this.headers, this.userData, "user detail")
    }
    downloadAccountData(){
        exportCSVFile(this.accountHeaders, this.accountData, "accounts detail")
    }
}