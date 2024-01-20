import { LightningElement,track,wire,api } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import getMedical from '@salesforce/apex/OpportunityController.getMedical';
export default class ChartsDemo extends LightningElement {

    pieChartLabels=[]
    pieChartData=[]
    objOne=[]
    objTwo=[]
    @wire(getMedical)
    opportunityHandler({data, error}){
        if(data){
this.objOne=data

            console.log('chartsDemo',data)
            const result = data.reduce((json, val)=>({...json, [val.Medicine_Name__c]:(json[val.Medicine_Name__c]|0)+1}), {})
            console.log('red',JSON.stringify(result))
            if(Object.keys(result).length){
                this.pieChartLabels = Object.keys(result)
                console.log('key',JSON.stringify(this.pieChartLabels ))
                this.pieChartData = Object.values(result)
                console.log('value',JSON.stringify(this.pieChartData))
            }
        
        }
        if(error){
            console.error(error)
        }
    }
    objThree
    connectedHandler(){
        var res=[]
        // var  objTwo=['A','B','C','A','B','C','C']
          
          this.objOne.forEach(el=>{
              const index=res.findIndex(obj=>{
                  return obj['Name']===el.Medicine_Name__c
               } );
              if(index===-1){
                  res.push({
                    
                      "Name":el.Medicine_Name__c,
                      "count":1
                  })
              }
              else{
                 res[index]["count"]++        
                  
              }
          })
      
      console.log('bar',JSON.stringify( res))
      
         this.objThree = res.reduce((accumulator, object) => {
            return accumulator + object.count;
          }, 0);
        var  resOne=[]
        if(res.length){
        res.forEach(elm=>{
            const ind=resOne.findIndex(obj=>{
                return (obj['NameO']===elm.Name,obj['countO']===elm.count)
             } );
            if(ind>=-1){
                resOne.push({
                  
                    "NameO":elm.Name,
                    "countO":elm.count,
                    "percent":elm.count*100/this.objThree
                })
            }
           
        })
        console.log('setcart',JSON.stringify( resOne))}
       window.localStorage.setItem('setcart',JSON.stringify( resOne))
         this.objTwo=JSON.parse(window.localStorage.getItem('setcart') )
    }

    handleInputValueChanged(e) {
        let count = [...this.template.querySelectorAll('lightning-input')]
          .reduce((p,v) => (p+(v.value!==''?1:0)), 0);
        let val = (count/this.arr.length) * 100;
        this.value = val;
      }

      noColor(){
        this.template.querySelector('[data-id="myDiv"]').classList.remove('greenBorder');
    }
    changeGreen(){
        this.template.querySelector('[data-id="myDiv"]').classList.add('greenBorder');
        this.customclass = 'greenColor';
    }
    @track customclass = 'redColor'; // you can set this parameter basis of admin selection

    changeTheme() {
        this.customclass = 'greenColor';
    }

    @api height; /* This property is exposed via the XML file. */
    
    get modalStyling() {
        return 'height:' + this.height;
    }
    renderedCallback() { 

        this.initCSSVariables();

        /* JFYI, use a flag if you only want to run this logic on first render of the component. */

    }

    initCSSVariables() {
        var css = this.template.host.style;
        css.setProperty('--modalHeight', this.height);
    }


}
