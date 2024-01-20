import { LightningElement,track } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import momentJs from '@salesforce/resourceUrl/momentJS'
import { RefreshEvent } from 'lightning/refresh';

export default class ProjectSignInPageLwc extends LightningElement {
    isMomentJsInitialized
    chart
    @track startDate;  
    @track datePickerString=new Date().toLocaleDateString('en-GB');
   // today=new Date()
    startDateUTC
    setStartDate
   connectedCallback(){
    console.log('submission connected call back');
  

    console.log( this.datePickerString)
    var today = new Date();      
   var loginTime=(today.getHours() + ":" + today.getMinutes());     
 //this.formattedStartDate = _startDate.toLocaleDateString('en-IN');
 let prsentDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()

 console.log('strt date',loginTime,prsentDate);
 
 let ShiftStratTime = new Date();

 ShiftStratTime.setHours(parseInt(12));
 ShiftStratTime.setMinutes(parseInt(5));
 let durationInMilliseconds = ShiftStratTime - today;
 console.log('durationMilliseconds'+durationInMilliseconds);
 let durationInMinutes = durationInMilliseconds / (1000 * 60);
 console.log('durationIn minutes'+durationInMinutes)
if(durationInMinutes>15){
    console.log('well',loginTime,prsentDate);  
}
   }
   
   
   
  
   
   
    renderedCallback(){
        if(this.isChartJsInitialized){
            return;
        }
        loadScript(this, momentJs).then(()=>{
            console.log("momentJs loaded succesfully")
            this.isMomentJsInitialized = true
          
        }).catch(error=>{
            console.error(error)
        })
    }
    loadCharts(){
        window.Chart.platform.disableCSSInjection = true

        const canvas = document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas)
        const ctx = canvas.getContext('2d')
        this.chart = new window.Chart(ctx, this.config())
    }
}