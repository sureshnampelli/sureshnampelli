public with sharing class AccController {
    @AuraEnabled(cacheable=true)

    public static List<Account> getAccList(){
        return [SELECT Id, Name FROM Account LIMIT 5];
    }
}