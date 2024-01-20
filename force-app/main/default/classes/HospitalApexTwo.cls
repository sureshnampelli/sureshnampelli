public with sharing class HospitalApexTwo {
    @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> patientAdmin(){
        return [SELECT Id , First_Name__c , Last_Name__c ,Phone__c ,Full_Name__c,Name,
         Email__c , Patient_Type__c,Patient_Id__c FROM Enquiry__c ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> medical(){
      return [SELECT Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c ,Amount__c,No_Of_Medicine__c,Ex_Date__c,	Each_Medicine__c,Time__c FROM Hospital_Medical__c  ORDER BY CreatedDate DESC];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> medicalHospitalChild(String medChildName){
      return [SELECT Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c ,Amount__c,No_Of_Medicine__c,	Each_Medicine__c,Time__c FROM Hospital_Medical__c  WHERE Medicine_Name__c =:medChildName];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> medicalMed(Integer lengthNum){
      return [SELECT Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c ,Amount__c,No_Of_Medicine__c,	Each_Medicine__c,Time__c FROM  Hospital_Medical__c ORDER BY CreatedDate DESC LIMIT: lengthNum ];
    }

    @AuraEnabled
    public static List<Hospital_Medical__c> medicalMedLimit(Integer lengthLimit){
      return [SELECT Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c ,Amount__c,No_Of_Medicine__c,	Each_Medicine__c,Time__c FROM  Hospital_Medical__c ORDER BY CreatedDate DESC LIMIT: lengthLimit ];
    }

    @AuraEnabled
    public static void deleteMedical(Hospital_Medical__c objMedical){
        try {
            delete objMedical;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
 
@AuraEnabled(cacheable=true)
    public static List<Hospital_Master_Med__c> medicalMedPharma(String medBulkName){
      return [SELECT Id,Name,Medicine_Left__c,Med_Left__c,Cost__c ,Ex_Date__c,Expiry_Date__c ,Total__c,	Each_Medicine__c FROM  Hospital_Master_Med__c WHERE Name=:medBulkName ];
    }

    
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Master_Med__c> hospitalMasterPharma(){
      return [SELECT Id,Name,Medicine_Left__c,Med_Left__c,Cost__c ,Expiry_Date__c,Ex_Date__c ,Total__c,	Each_Medicine__c FROM  Hospital_Master_Med__c ];
    }

@AuraEnabled(cacheable=true)
public static List<Hospital_Medical__c> medicalPharama(Integer LimitKey ){
String query='SELECT Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c ,Amount__c,No_Of_Medicine__c,	Each_Medicine__c,Time__c FROM  Hospital_Medical__c ORDER BY CreatedDate DESC LIMIT'+'LimitKey';
return Database.query(query);
}
}