public  with sharing class WeatherWrapper {
   @AuraEnabled
    public string cityName {set;get;}
    public string weatherResponseJSON {set;get;}
    //Define the variable to show the values on vf page
    public string humidityValue {set;get;}
     public string pressureValue {set;get;}
        public string feelLikeTemp{set;get;}
     public string mintemperature {set;get;}
        public string maxTemperature {set;get;}
     public string averageTemperature{set;get;}
     public string weatherurl= 'https://api.openweathermap.org/data/2.5/weather?q='  ;
     public string key= '7f2d7fe9c22864a7f68b5ac0a07d3dbb' ;
    
    public void weatherhand(){
      
      string endpointURL= weatherurl + cityName + '&appid='+key;
     Http wHttp =new Http();
        HttpRequest weatherRequest =new HttpRequest();
        weatherRequest.setEndpoint(endpointURL);
                weatherRequest.setMethod('GET');
                weatherRequest.setTimeout(60000);
        HttpResponse weatherResponse=wHttp.send(weatherRequest);
        weatherResponseJSON =weatherResponse.getBody();
        System.JSONParser pParser=  System.JSON.createParser(weatherResponse.getBody());
         while(pParser.nextToken() !=null){
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'main'){
                    pParser.nextToken();
                    if( pParser.getCurrentToken() == JsonToken.START_OBJECT){
                         pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'temp'){
                  pParser.nextToken();
                   averageTemperature  = (pParser.getDecimalValue()-273.15)  +'c';
                     
                }
                       
             pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'feels_like'){
                  pParser.nextToken();
                     feelLikeTemp= (pParser.getDecimalValue()-273.15)  +'c';
                     
                }
             pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'temp_min'){
                   pParser.nextToken();
                    mintemperature  = (pParser.getDecimalValue()-273.15) +'c';
                    
                }
              pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'temp_max'){
                   pParser.nextToken();
                    maxTemperature  = (pParser.getDecimalValue()-273.15) +'c';
                    
                }
             pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'pressure'){
                   pParser.nextToken();
                    pressureValue  = pParser.getText();
                    
                }
              pParser.nextToken();
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'humidity'){
                   pParser.nextToken();
                   humidityValue  = pParser.getText();
                    
               
                 }
                   
                   
                    }
                    
                }
             
               
         }
        
    }
                  
}
