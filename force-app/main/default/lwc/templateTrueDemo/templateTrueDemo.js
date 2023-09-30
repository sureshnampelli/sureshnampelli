import { LightningElement,track } from 'lwc';

export default class TemplateTrueDemo extends LightningElement {
    @track showText = false;
  showHandler() {
    this.showText = true;
  }
}