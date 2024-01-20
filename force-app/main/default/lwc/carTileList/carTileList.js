import { LightningElement,wire } from 'lwc';
import getCars from '@salesforce/apex/carController.getCars';
export default class CarTileList extends LightningElement {
    cars
    error
    filters={}
@wire(getCars,{filter:'$filters'})
carsHandler({data,error}){
    if(data){
        console.log('cars',data)
        this.cars=data
    }
    if(error){
        console.error(error)
        this.error=error
    }
}
}