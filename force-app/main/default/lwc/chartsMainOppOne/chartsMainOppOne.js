import { LightningElement ,wire} from 'lwc';
import getOpportunitie from '@salesforce/apex/OpportunityController.getOpportunitie';
export default class ChartsMainOppOne extends LightningElement {
    oppBarconfig;
    oppPieconfig;
    oppDoughnutConfig;
    oppPolarAreaConfig;
    oppBubbleConfig;
    oppLineConfig;
     mapChartBackgroundColor = new Map();
     
      connectedCallback() {
        this.mapChartBackgroundColor.set(0, 'rgb(255, 99, 132)');//red
        this.mapChartBackgroundColor.set(1, 'rgb(255, 205, 86)');//yellow
        this.mapChartBackgroundColor.set(2, 'rgb(3, 145, 15)');//green
        this.mapChartBackgroundColor.set(3, 'rgb(54, 162, 235)');//blue
        this.mapChartBackgroundColor.set(4, 'rgb(235, 111, 54)');//orange
        this.mapChartBackgroundColor.set(5, 'rgb(75, 192, 192)');//lightgreen
        this.mapChartBackgroundColor.set(6, 'rgb(163, 75, 192)');//purple
    }
    @wire(getOpportunitie)
    wiredOpprtunityList({ error, data }) {
        if(data)
        {
            let listOfOppStatus = [];
            let listOfOppStatusDataCount = [];
            let listOfBackgroundColor = [];
            let mapOppData = new Map();


             for (let i = 0; i < data.length; i++) {
                if (!mapOppData.has(data[i].StageName)) {
                    mapOppData.set(data[i].StageName, 1);
                }
                else {
                    mapOppData.set(data[i].StageName, mapOppData.get(data[i].StageName) + 1);
                }
            }
              let m = 0;
            let bgColor = this.mapChartBackgroundColor;
            mapOppData.forEach(function (value, key, map) {
                console.log('Key -> ' + key + ' value ->'   + value);
                listOfOppStatus.push(key);
                listOfOppStatusDataCount.push(mapOppData.get(key));
                listOfBackgroundColor.push(bgColor.get(m));
                m++;
            });
            if (listOfOppStatusDataCount.length > 0) {
                this.oppBarconfig = {
                    type: "bar",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };
                
                this.oppPieconfig = {
                    type: "pie",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };                
                this.oppDoughnutConfig = {
                    type: "doughnut",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };
                this.oppPolarAreaConfig = {
                    type: "polarArea",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };
                 this.oppBubbleConfig = {
                    type: "bubble",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };
                 this.oppLineConfig = {
                    type: "line",
                    data: {
                        labels: listOfOppStatus,
                        datasets: [{
                            label: "Opportunity",
                            data: listOfOppStatusDataCount,
                            backgroundColor: listOfBackgroundColor,
                            borderColor: listOfBackgroundColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                };
                
                }
          
            
        } 
            else if (error) {
            console.log(error);
        }
    }

}