public with sharing class AzChartController {
    @AuraEnabled(cacheable=true)
    public static List<AZ_Chat__c> getAzChat(){
        return [SELECT Id,Name,AZ_Customer__c,Customer_Name__c,Admin_Emoji__c,Customer_Emoji__c,Admin_Chat__c,Customer_Chat__c,AZ_Admin_Shiftwise__c FROM AZ_Chat__c ORDER BY CreatedDate DESC];
    }
    @AuraEnabled
    public static void createAzChat(AZ_Chat__c createChat){
        insert createChat;
    }
    @AuraEnabled
    public static void updateAzChat(AZ_Chat__c updateChat){
    update updateChat;
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Chat__c> getSearchAzChat(String adminId,String customerId){
        return [SELECT Id,Name,Admin_Chat__c,Customer_Chat__c,AZ_Customer__c,Customer_Name__c,Admin_Emoji__c,Customer_Emoji__c
     FROM AZ_Chat__c  WHERE AZ_Admin_Shiftwise__c=:adminId
        AND AZ_Customer__c=:customerId ORDER BY CreatedDate];
    }
   
}