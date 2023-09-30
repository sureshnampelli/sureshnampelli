import { LightningElement } from "lwc";
import getRandomCat from "@salesforce/apex/getRandomCatImage.getRandomCat";

export default class GetRandomCatRest extends LightningElement {
  imageURL;
  connectedCallback() {
    getRandomCat({}).then((response) => {
      console.log("###Response : " + response);
      var parsedData = JSON.parse(response);
      this.imageURL = parsedData[0].url;
    });
  }
}