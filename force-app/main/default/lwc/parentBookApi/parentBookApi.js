import { LightningElement } from 'lwc';


export default class ParentBookApi extends LightningElement {

    infoTable
query
timer
   
    fetchdata(){
        fetch('https://www.googleapis.com/books/v1/volumes?q='+this.query)
        .then(response=>response.json())
        .then(data=>{console.log('@@@@@@@@@',data)  ,this.infoTable=data })
        .catch(error=>console.error(error))
    }

    fetchBookHandler(event){
        this.query=event.target.value
        window.clearTimeout(this.timer)
       this.timer= setTimeout(()=>{
            this.fetchdata()
        },1000)
    }
    

    
}