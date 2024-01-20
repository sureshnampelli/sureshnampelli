import { LightningElement } from 'lwc';

export default class ExperimentCssOne extends LightningElement {
    handleScrollClick(){
        const topDiv = this.template.querySelector('[data-id="redDiv"]');
        topDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
}