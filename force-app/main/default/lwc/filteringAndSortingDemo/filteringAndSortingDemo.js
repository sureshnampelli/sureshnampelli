import { LightningElement , wire } from 'lwc';

import getContacts from '@salesforce/apex/ContactController.getContacts';
export default class FilteringAndSortingDemo extends LightningElement {
    heading=["Id " , "Name" , "Title" , "Email"]
    filterData=[]
filteredData=[]
timer
filterBy="Name"

sortedBy='Name'
sortDirection='asc'
@wire(getContacts)
wiredContacts({data,error}){
    if(data){
        console.log('filtering' , data)
        this.filterData=data
       this.filteredData=[...this.sortBy(data)]
    }
    if(error){
        console.error(error)
    }
}
get FilterByOptions(){
    return [
        {label:"All" , value:'All'},
        {label:"Id" , value:'Id' },
        {label:"Name" , value:'Name' },
        {label:"Title" , value:'Title' },
        {label:"Email" , value:'Email' }
    ]
}

get sortByOptions(){
    return  [
        {label:"Id" , value:'Id' },
        {label:"Name" , value:'Name' },
        {label:"Title" , value:'Title' },
        {label:"Email" , value:'Email' }
    ]
}

filterbyHandler(event){
    this.filterBy=event.target.value
}

filterHandler(event){
    const { value } =event.target
    window.clearTimeout(this.timer)
    if(value){
        this.timer=window.setTimeout(()=>{
            console.log('target' , value)
            this.recordId=this.filteredData.Id
            this.filteredData= this.filterData.filter(eachObj=>{
                if(this.filterBy==='All'){
                     return Object.keys(eachObj).some(key=>{
                    return eachObj[key].toLowerCase().includes(value)
                })
            }
               else{
                /**Below logic will filter only seltected fields */
                const val=eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                return val.toLowerCase().includes(value)
               }
                
            } )
        },500)
         
    
}else{
    this.filteredData=[...this.filterData]
}
}

 /**sorting logic */
 sortHandler(event){
    this.sortedBy=event.target.value
    this.filteredData=[...this.sortBy(this.filteredData)]
 }  

 sortBy(data){
    const cloneData=[...data]
    cloneData.sort((a,b)=>{
        if(a[this.sortedBy] === b[this.sortedBy]){
            return 0
        }
        return this.sortDirection==='dese' ?
        a[this.sortedBy] > b[this.sortedBy] ? -1:1:
        a[this.sortedBy] < b[this.sortedBy] ? -1:1
    })
    return cloneData
 }
}