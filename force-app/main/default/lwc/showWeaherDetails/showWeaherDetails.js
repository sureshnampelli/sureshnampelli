import { LightningElement } from 'lwc';

export default class ShowWeaherDetails extends LightningElement {

result = {} ;


    fetchWeatherInfo(){
let ApiKey='7f2d7fe9c22864a7f68b5ac0a07d3dbb';
let village='Delhi';
var endPoint='https://api.openweathermap.org/data/2.5/weather?q='+village+' &appid='+ApiKey;

     fetch(endPoint)
            .then((response) => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then((jsonResponse) => {
                console.log(jsonResponse);

                this.result.name=jsonResponse.name;

            })
            .catch((error) => {
                console.log(error);
                this.error = error;
            
            });

        }
    }
