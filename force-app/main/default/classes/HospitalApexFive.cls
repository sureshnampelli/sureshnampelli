public with sharing class HospitalApexFive {
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Patient__c> getPatientAppointment(){
        return [SELECT Id ,Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
       Gender__c, Email__c , Fee__c, Variable__c,Cancelled_By__c,Date_Time__c,Test_By__c,Test_Name__c,Hospital_Patient__c.Enquiry__c,Hospital_Patient__c.Hospital_Doctor__c FROM Hospital_Patient__c ];
    }
    
    @AuraEnabled
    public static void createDoctorRecord(Hospital_Doctor__c doctorData) {
        insert doctorData;
    }
    @AuraEnabled
    public static void updateAccount(Account account) {
        update account;
    }
    @AuraEnabled
    public static void deleteHospitalDoctor(string docDelete){
        try {
            //delete repData;
            List<Hospital_Doctor__c> docList = [SELECT Name,Doctor_Type__c, Fee__c,Patient_Name__c,Image__c FROM  Hospital_Doctor__c WHERE id = :docDelete];
            delete docList;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
   
}