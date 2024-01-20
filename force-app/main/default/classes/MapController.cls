public with sharing class MapController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name , description , BillingStreet, BillingCountry , BillingState ,
         BillingPostalCode FROM Account ORDER BY Name LIMIT 10 ];
    }
}