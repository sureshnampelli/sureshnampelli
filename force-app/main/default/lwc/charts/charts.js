import { LightningElement  ,wire } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs'
import {loadScript} from 'lightning/platformResourceLoader'
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import getMedical from '@salesforce/apex/OpportunityController.getMedical';
export default class Charts extends LightningElement {
    isChartJsInitialized
    chart
   

    renderedCallback(){
        if(this.isChartJsInitialized){
            return;
        }
        loadScript(this, chartJs+'/chartJs/Chart.js').then(()=>{
            console.log("chartJs loaded succesfully")
            this.isChartJsInitialized = true
            this.loadCharts()
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
    config(){
        return {
            type: "doughnut",
            data: {
                labels: this.pieChartLabels ? this.pieChartLabels:[],
                datasets: [{
                    label: this.chartHeading,
                    data: this.pieChartData ? this.pieChartData:[],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(30, 204, 148, 0.8)',
                        'rgba(130, 204, 148, 0.8)'
                     
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        }
    }
    chartHeading='king'
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

}