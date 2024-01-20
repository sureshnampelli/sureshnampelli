public with sharing class AzCustomerController {
    @AuraEnabled(cacheable=true)
    public static List<AZ_Enquiry_Date__c> getTodayEnquiryDate(){
        return [SELECT Id,Name FROM AZ_Enquiry_Date__c WHERE CreatedDate>=:Date.TODAY()] ;
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Customer__c> getAzCustomer(){
        return [SELECT Id,Name,Full_Name__c,First_Name__c,Last_Name__c,Phone__c,Email__c,Enter_Password__c,Street_Long__c,City__c,Country__c,State__c,Pincode__c ,Re_Enter_Password__c,Password__c FROM AZ_Customer__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Customer__c> getAzSerachCustomer(String customerId){
        return [SELECT Id,Name,Full_Name__c,First_Name__c,Last_Name__c,Phone__c,Email__c,Enter_Password__c,Re_Enter_Password__c,Password__c,Street_Long__c,City__c,Country__c,State__c,Pincode__c FROM AZ_Customer__c WHERE Id=:customerId];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Admin_Shiftwise__c> getAdminTodayShiftwise(String adminTimeShift){
        return [SELECT Id,Name,Full_Name__c,Phone__c,Email__c,Image__c,Toogle__c,AZ_Company_Shift__c,AZ_Admin_Daily__c,Shift_Name__c,CreatedDate FROM AZ_Admin_Shiftwise__c WHERE CreatedDate>=: Date.TODAY() AND Shift_Name__c=:adminTimeShift];
    }
 @AuraEnabled(cacheable=true)
    public static List<AZ_Enquiry__c> getEnquiry(){
return [SELECT Id,Name,Admin_Email__c,Admin_Image__c,Admin_Phone__c,Admin_Name__c,City__c,Country__c,
AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Enquiry_Date__c,District__c,Email__c,Phone__c,Longitude__c,Latitude__c,
Pincode__c,State__c,Street_Long__c,Worker_Role__c,Toogle__c,Enquiry_Date__c FROM AZ_Enquiry__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Enquiry__c> searchAzEnquiry(String searchEnquiryId){
return [SELECT Id,Name,Admin_Email__c,Admin_Image__c,Admin_Phone__c,Admin_Name__c,City__c,Country__c,
AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Enquiry_Date__c,District__c,Email__c,Phone__c,Longitude__c,Latitude__c,
Pincode__c,State__c,Street_Long__c,Worker_Role__c,Toogle__c,Enquiry_Date__c FROM AZ_Enquiry__c  WHERE AZ_Enquiry_Date__r.Name=:searchEnquiryId];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Enquiry__c> getSearchEnquiry(String enquiryId){
return [SELECT Id,Name,Admin_Email__c,Admin_Image__c,Admin_Phone__c,Admin_Name__c,City__c,Country__c,
AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Enquiry_Date__c,District__c,Email__c,Phone__c,Longitude__c,Latitude__c,
Pincode__c,State__c,Street_Long__c,Worker_Role__c,Toogle__c,Enquiry_Date__c FROM AZ_Enquiry__c WHERE AZ_Enquiry__c.AZ_Customer__c=:enquiryId];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Enquiry__c> getSearchedEnquiryId(String getWithId){
return [SELECT Id,Name,Admin_Email__c,Admin_Image__c,Admin_Phone__c,Admin_Name__c,City__c,Country__c,
AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Enquiry_Date__c,District__c,Email__c,Phone__c,Longitude__c,Latitude__c,
Pincode__c,State__c,Street_Long__c,Worker_Role__c,Toogle__c,Enquiry_Date__c FROM AZ_Enquiry__c WHERE Id=:getWithId];
    }
    @AuraEnabled
    public static void createAzCustomer(AZ_Customer__c customerSignUp){
     insert customerSignUp;
    }
    @AuraEnabled
    public static void updateAzCustomer(AZ_Customer__c customerPassUpdate){
        update customerPassUpdate;
    }
    @AuraEnabled
    public static void createAzEnquiry(AZ_Enquiry__c enterEnquiryData){
        insert enterEnquiryData;
    }
    @AuraEnabled
    public static void updateAzEnquiry(AZ_Enquiry__c updateEnquiryData){
        update updateEnquiryData;
    }
}