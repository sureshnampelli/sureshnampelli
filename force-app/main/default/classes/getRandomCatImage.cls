public with sharing class getRandomCatImage {
    
    @AuraEnabled
    public static string getRandomCat(){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.thecatapi.com/v1/images/search');
        req.setMethod('GET');
        HttpResponse resp = http.send(req);
        return resp.getBody();
    }
}