import { LightningElement ,api} from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import {loadScript} from 'lightning/platformResourceLoader'
export default class ChartsMainOne extends LightningElement {
    @api chartDataset; 
    chart;    
  
  renderedCallback() {    
    Promise.all([loadScript(this, chartJs+'/chartJs/Chart.js')])
      .then(() => {        
      const ctx = this.template.querySelector('canvas');
       this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartDataset)));         
           })
           .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading Chart',
                        message: error.message,
                        variant: 'error',
                    })
                );
            });
  }
}