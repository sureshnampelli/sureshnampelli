public with sharing class AccountDataController {
    @AuraEnabled(cacheable=true)
    public static Account getSingleAccount() {
        return [
            SELECT Id, Name, Phone, Rating, AccountNumber
            FROM Account
            LIMIT 1
        ];
    }
}