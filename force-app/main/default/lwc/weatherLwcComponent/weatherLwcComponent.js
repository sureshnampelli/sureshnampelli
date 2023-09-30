import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class WeatherLwcComponent extends LightningElement {
    countryOptions = [
        { "label": "India", "value": "IN" },
        { "label": "USA", "value": "US" },
        { "label": "Turkey", "value": "TR" },
        { "label": "Australia", "value": "AU" }
    ];
 
    countryCode;
    zipCode;
    showSpinner = false;
    result = {};
    //check field validation
    handleCheckValidation() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.fieldvalidate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
 
            if(inputField.name == "country"){
                this.countryCode = inputField.value;
            } else if(inputField.name == "pincode"){
                this.zipCode = inputField.value;
            }
        });
        return isValid;
    }
 
    handleValidation(event) {
        if(this.handleCheckValidation()) {
            this.handleSpinner();
            this.fetchWeatherInfo();
        }
    }
 
    fetchWeatherInfo(){
        let APIKey = '7f2d7fe9c22864a7f68b5ac0a07d3dbb';
        var endPoint = 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.zipCode + ',' + this.countryCode +'&appid=' +APIKey;
        //get request
        fetch(endPoint)
            .then((response) => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then((jsonResponse) => {
                console.log(jsonResponse);
                 
                 
                this.result.name = jsonResponse.name;
                this.result.sunset = this.convertUnixToTime(jsonResponse.sys.sunset);
                this.result.sunrise = this.convertUnixToTime(jsonResponse.sys.sunrise);
                this.result.pressure = jsonResponse.main.pressure;
                this.result.humidity = jsonResponse.main.humidity;
                this.result.temp = (jsonResponse.main.temp - 274.15).toFixed(2);
 
                this.handleSpinner();
            })
            .catch((error) => {
                console.log(error);
                this.error = error;
                this.handleSpinner();
            });
    }
 
 
    convertUnixToTime(unixtimestamp){
        console.log(unixtimestamp);
        var dt = unixtimestamp * 1000;
        var myDate = new Date(dt);
        console.log(myDate);
        return(myDate.toLocaleString());
    }
 
    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }
}