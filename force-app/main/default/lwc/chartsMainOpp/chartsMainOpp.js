import { LightningElement ,wire} from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
export default class ChartsMainOpp extends LightningElement {
    chartConfiguration;
 
    @wire(getOpportunities)
    getOpportunities({ error, data }) {
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
        } else if (data) {
            let chartAmtData = [];
            let chartRevData = [];
            let chartLabel = [];
            data.forEach(opp => {
                chartAmtData.push(opp.amount);
                chartRevData.push(opp.expectRevenue);
                chartLabel.push(opp.stage);
            });
 
            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                            label: 'Amount',
                            backgroundColor: "green",
                            data: chartAmtData,
                        },
                        {
                            label: 'Expected Revenue',
                            backgroundColor: "orange",
                            data: chartRevData,
                        },
                    ],
                    labels: chartLabel,
                },
                options: {},
            };
            console.log('data => ', data);
            this.error = undefined;
        }
    }
}