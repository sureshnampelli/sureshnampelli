import { LightningElement,wire } from 'lwc';
import loginSignInFilter from '@salesforce/apex/LoginApex.loginSignInFilter';
import getComapnyShift from '@salesforce/apex/AzCompanyControllerTest.getComapnyShift';
import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ProjectLwcOne extends LightningElement {
    shId
    @wire(getComapnyShift,{shiftName:'$shId'})
    wiredcom({data,error}){
        if(data){
            
            console.log('login',data)
        }
if(error){
    console.error(error)
}}
    @wire(loginSignInFilter)
    wireLogin({data,error}){
        if(data){
            
            console.log('login',data)
        }
if(error){
    console.error(error)
}}
    cre(){
      
          
    }
dupe(){

    let employees = [
        { name: "Tony Stark", id: 1, department: "IT" },
        { name: "Peter Parker", id: 2, department: "CS" },
        { name: "Bruce Wayne", id: 3, department: "IT" },
        { name: "Clark Kent", id: 4, department: "CS" },
        { name: "WILL", id: 5, department: "MNB" },
        { name: "COULD", id: 6, department: "MNB" }
        ];
        
        Object.filter = (obj, predicate) =>
        Object.fromEntries(Object.Values(obj).
                            filter(([value]) =>
                            predicate(value)));
        ['IT','CS','MNB'].forEach(ea=>{
            
             var filtered = 
            Object.filter(employees, employee => 
                        employee.department ===ea);
                       
                    
                        console.log(JSON.stringify(filtered));
                       
})
      
let arr = [2, 5, 8, 1, 4]

function checkAvailability(arr, val) {
	return arr.some(
		function (arrVal) {
			return val === arrVal;
		});
}

console.log((checkAvailability(arr, 2)));
console.log((checkAvailability(arr, 87)));

    /*const check_duplicate_in_array=(input_array)=>{
        const duplicates =input_array.filter((item, index)=>input_array.indexOf(item) !== index);
        return Array.from(new Set(duplicates));
    }
    const arr=[1,1,2,2,3,3,4,5,6,1];
    console.log(check_duplicate_in_array(arr));*/
}
    
abOut
   
}