public with sharing class CarCartController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(){
        return [SELECT Id , Name ,MSRP__C,Description__c,Category__c,Picture_Url__c FROM Car__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<Bird__c> getBird(){
        return [SELECT Id,Name,MRP__c,Category__c,Picture_Url__c FROM Bird__c];
    }

}