public with sharing class AzCompanyControllerTest {
    @AuraEnabled(cacheable=true)
    public static List<AZ_Company_Shift__c> getComapnyShift(String shiftName){
        return [SELECT Id,Name,AZ_Company_Date__c FROM AZ_Company_Shift__c WHERE AZ_Company_Date__r.Name=:shiftName ];
    }
   
}