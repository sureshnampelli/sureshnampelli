public with sharing class AzCompanyController {
    @AuraEnabled(cacheable=true)
    public static List<AZ_Company_Date__c> getAzComapany(String companyDate){
        return [SELECT Id,Name,(SELECT Id ,Name,Shift_Name__c FROM AZ_Company_Shift__r) FROM AZ_Company_Date__c WHERE Name=:companyDate];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Company_Shift__c> getAzCompanyDate(String companyShift){
        return [SELECT Id,Name,Shift_Timings__c,Shift_Name__c ,(SELECT Id,Name,Full_Name__c,Email__c,Phone__c,Shift_Name__c FROM AZ_Admin_Shiftwise__r) FROM AZ_Company_Shift__c WHERE Id=:companyShift];
    }

    @AuraEnabled(cacheable=true)
    public static List<AZ_Admin__c> getAdmin(){
        return [SELECT Id,Name,Full_Name__c,Toogle_Name__c,First_Name__c,Toogle__c,Work__c,Variable__c,Last_Name__c,Phone__c,Email__c,Image__c,Enter_Password__c,Re_Enter_Password__c,Password__c FROM AZ_Admin__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<AZ_Admin_Daily__c> getAdminDaily(String adminDailyData){
        return [SELECT Id,Name,Full_Name__c,Admin_Id__c,Status_Pro__c,Login_Time__c,Logout_Time__c,First_Name__c,Shift_Name__c,Toogle__c,Work__c,Variable__c,Last_Name__c,Phone__c,Email__c,Image__c,AZ_Company_Date__c FROM AZ_Admin_Daily__c WHERE AZ_Company_Date__c=:adminDailyData];
    }   
    @AuraEnabled(cacheable=true)
    public static List<AZ_Admin_Shiftwise__c> getAdminShiftwise(){
        return [SELECT Id,Name,Full_Name__c,Phone__c,Email__c,AZ_Admin_Daily__c,Image__c,AZ_Company_Shift__c,Shift_Name__c FROM AZ_Admin_Shiftwise__c];

    }
    @AuraEnabled
    public static void createAdminShiftwiseRecord(AZ_Admin_Shiftwise__c adminShiftwiseData) {
        insert adminShiftwiseData;
    }
    @AuraEnabled
    public static void createAdminDaily(AZ_Admin_Daily__c adminDailyData){
        insert adminDailyData;
    }
    @AuraEnabled
    public static void updateAdminDaily(AZ_Admin_Daily__c updateAdminDailyData){
        update updateAdminDailyData;
    }
    @AuraEnabled
    public static void updateAdmin(AZ_Admin__c updateAdminData){
        update updateAdminData;
    }
}