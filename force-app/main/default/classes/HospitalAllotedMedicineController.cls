public with sharing class HospitalAllotedMedicineController {
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Daily_Medicine__c> getDailyMedicine(){
      return [SELECT Id,Name,Ex_Date__c,Cost__c,Each_Medicine_Cost__c,Amount__c,No_Of_Medicine__c FROM Hospital_Daily_Medicine__c WHERE CreatedDate>=:Date.TODAY()]; 
    }
 @AuraEnabled(cacheable=true)
    public static List<Hospital_Daily_Medicine__c> getMedicineTotalDaily(){
      return [SELECT Id,Name,Ex_Date__c,Cost__c,Each_Medicine_Cost__c,Amount__c,No_Of_Medicine__c FROM Hospital_Daily_Medicine__c]; 
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Alloted_Medicine__c> getAllotedMedcine(String allotedName){
        return [SELECT Id,Name,Ex_Date__c,Cost__c,AMOUNT__c,Alloted_Medicine__c,Each_Med_Cost__c,Medicine_Left__c,Total__c FROM Hospital_Alloted_Medicine__c WHERE Name=:allotedName];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Alloted_Medicine__c> allotedMedcine(){
        return [SELECT Id,Name,Ex_Date__c,Cost__c,AMOUNT__c,Alloted_Medicine__c,Each_Med_Cost__c,Medicine_Left__c,Total__c FROM Hospital_Alloted_Medicine__c];
    }

 @AuraEnabled
    public static void createAllotedMedicine(Hospital_Alloted_Medicine__c createMedicine) {
        insert createMedicine;
    }

    @AuraEnabled
    public static void updateAllotedMedicine(Hospital_Alloted_Medicine__c allotMedicine) {
        update allotMedicine;
    }

    @AuraEnabled
    public static void createHospitalPatient(Hospital_Patient__c createPatient) {
        insert createPatient;
    }
    
}