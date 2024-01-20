public with sharing class AzWorkerController {
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker__c> getAzWorker(){
        return [SELECT Id,Name,Email__c,Enter_Password__c,Worker_Role__c,Full_Name__c,Last_Name__c,Phone__c,Re_Enter_Password__c,Password__c,Image__c FROM AZ_Worker__c];
    }
    @AuraEnabled
    public static void createAzWorkerDaily(AZ_Worker_Daily__c enterWorkerDailyData){
        insert enterWorkerDailyData;
    }
    
     @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Daily__c> searchAzWorkerDaily(String workerDailyDateId){
        return [SELECT Id,Name,Email__c,Full_Name__c,Last_Name__c,Phone__c,Image__c,Shift_One__c,Shift_Two__c,Shift_Three__c,Az_Worker__c,Worker_Role__c FROM AZ_Worker_Daily__c WHERE AZ_Worker_Date__r.Name=:workerDailyDateId];
    }
    @AuraEnabled
    public static void updateAzWorkerDaily(AZ_Worker_Daily__c updateWorkerDaily){
update updateWorkerDaily;
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shift__c> searchAzWorkerShift(String workerShiftDataName){
        return [SELECT Id,Name,Shift_Name__c,Shift_Timings__c,AZ_Worker_Date__c FROM AZ_Worker_Shift__c WHERE AZ_Worker_Date__r.Name=:workerShiftDataName];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getAzWorkerShiftwise(){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name,
        Longitude__c,Latitude__c, Start_Time__c,End_Time__c,Working_Time__c,  Customer_Name__c,AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,Star_Rating__c,
        AZ_Worker_Shift__c,Admin_Email__c,Worker_Email__c,Admin_Phone__c,Shift_Date__c,Shift_Name__c,
        Customer_Phone__c,Admin_Image__c,Worker_Image__c,Toogle_Shift_c__c,Worker_Toogle__c,Worker_Phone__c FROM AZ_Worker_Shiftwise__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getSearchAzWorkerShiftwise(String workerRole,String shiftDate){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name,
        Longitude__c,Latitude__c,   Start_Time__c,End_Time__c,Working_Time__c, Shift_Name__c,Customer_Name__c,AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,AZ_Worker_Shift__c,Admin_Email__c,
Worker_Email__c,Admin_Phone__c,Customer_Phone__c,Admin_Image__c,Worker_Image__c,Star_Rating__c,
Toogle_Shift_c__c,Shift_Date__c,Worker_Toogle__c,Worker_Phone__c FROM AZ_Worker_Shiftwise__c WHERE Shift_Date__c=:shiftDate AND Worker_Role__c=:workerRole];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getCustomerAzWorkerShiftwise(String customerWiseId ,String customerWiseDateId ){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name, Customer_Name__c,AZ_Customer__c,Star_Rating__c,
        Longitude__c,Latitude__c,  Shift_Name__c,  AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,AZ_Worker_Shift__c,Admin_Email__c,Worker_Email__c,Admin_Phone__c,Shift_Date__c,
        Start_Time__c,End_Time__c,Working_Time__c,  Customer_Phone__c,Admin_Image__c,Worker_Image__c,Toogle_Shift_c__c,Worker_Toogle__c,Worker_Phone__c FROM AZ_Worker_Shiftwise__c 
        WHERE AZ_Worker_Shiftwise__c.AZ_Customer__c=:customerWiseId AND Shift_Date__c=:customerWiseDateId];
    }
    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getCustomerAdminWorkerShiftwise(String workerShiftWiseId  ){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name, Customer_Name__c,AZ_Customer__c,Star_Rating__c,
        Longitude__c,Latitude__c,  Shift_Name__c,  AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,AZ_Worker_Shift__c,Admin_Email__c,Worker_Email__c,Admin_Phone__c,Shift_Date__c,
     Start_Time__c,End_Time__c,Working_Time__c, Customer_Phone__c,Admin_Image__c,Worker_Image__c,Toogle_Shift_c__c,Worker_Toogle__c,Worker_Phone__c 
     FROM AZ_Worker_Shiftwise__c  WHERE Id=:workerShiftWiseId];
    }  


    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getAzWorkerShiftwiseRating(String workerRatingId){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name,
        Start_Time__c,End_Time__c,Working_Time__c,  Customer_Name__c,AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,Star_Rating__c,
        AZ_Worker_Shift__c,Admin_Email__c,Worker_Email__c,Admin_Phone__c,Shift_Date__c,Shift_Name__c,Longitude__c,Latitude__c,
        Customer_Phone__c,Admin_Image__c,Worker_Image__c,Toogle_Shift_c__c,Worker_Toogle__c,
        Worker_Phone__c FROM AZ_Worker_Shiftwise__c WHERE AZ_Worker_Shiftwise__c.AZ_Worker__c=:workerRatingId];
    }

    @AuraEnabled(cacheable=true)
    public static List<AZ_Worker_Shiftwise__c> getSearchAzWorkerShiftwiseWithId(String workerId,String shiftDate){
        return [SELECT Id,Admin_Name__c,Worker_Role__c,AZ_Enquiry__c,AZ_Worker__c,Name,Longitude__c,Latitude__c,
        Start_Time__c,End_Time__c,Working_Time__c, Shift_Name__c,Customer_Name__c,AZ_Customer__c,AZ_Admin_Shiftwise__c,AZ_Worker_Daily__c,AZ_Worker_Shift__c,Admin_Email__c,
Worker_Email__c,Admin_Phone__c,Customer_Phone__c,Admin_Image__c,Worker_Image__c,Star_Rating__c,
Toogle_Shift_c__c,Shift_Date__c,Worker_Toogle__c,Worker_Phone__c FROM AZ_Worker_Shiftwise__c WHERE Shift_Date__c=:shiftDate AND AZ_Worker_Shiftwise__c.AZ_Worker__c=:workerId];
    }
    @AuraEnabled
    public static void createAzWorkerShiftwise(AZ_Worker_Shiftwise__c createWorkerShiftwse){
        insert createWorkerShiftwse;
    }
    @AuraEnabled
    public static void updateAzWorkerShiftwise(AZ_Worker_Shiftwise__c updateWorkerShiftwise){
        update updateWorkerShiftwise;
    }

}
