public with sharing class HospitalApex {
    @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> typePatient(String type){
        return [SELECT Id , First_Name__c , Last_Name__c ,Phone__c ,Full_Name__c,
         Email__c , Patient_Type__c FROM Enquiry__c WHERE Patient_Type__c=:type];
    }

    @AuraEnabled  
    public static void deleteEnquiry(List<Enquiry__c> enquiryList){  
      delete enquiryList;  
    }  

     @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> patientAdmin(){
        return [SELECT Id , First_Name__c , Last_Name__c ,Phone__c ,Full_Name__c,Name,
         Email__c , Patient_Type__c,Patient_Id__c FROM Enquiry__c ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Lab__c> hospitalLab(){
        return [SELECT Id,FULL_NAME__C,Name ,Gender__c,Age__c ,Sample_ID__c,Ref_Doctor__c ,Sample_Drawn_Date__c,
        Sample_Regd_Date__c,Sample_Auth_Date__c,S_Total_Cholesterol__c,S_Triglycerides__c,S_Hdl__c,	VLDL__c,SLDL__c,
        TChol__c,	LDL_HDL__c ,Email__c,Test__c,Patient_Id__c FROM Hospital_Lab__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Blood_Test__c> bloodTest(){
        return [SELECT Id ,Full_Name__c,Gender__c,Age__c,Name,Email__c,Sample_ID__c,Ref_Doctor__c ,Sample_Drawn_Date__c,Erythrocyte_Count__c,Hemoglobin__c,Packed_Cell_Volume__c,Platelet_Count__c,
        Sample_Regd_Date__c,Sample_Auth_Date__c, Test__c,Patient_Id__c FROM Hospital_Blood_Test__c];
    } 
    
    @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> hospitalLabEnquiry(){
        return [SELECT Id , First_Name__c , Last_Name__c ,Phone__c , (SELECT Id,FULL_NAME__C,Name ,Gender__c,Age__c ,Sample_ID__c,Ref_Doctor__c ,Sample_Drawn_Date__c,
        Sample_Regd_Date__c,Sample_Auth_Date__c,S_Total_Cholesterol__c,S_Triglycerides__c,S_Hdl__c,	VLDL__c,SLDL__c,
        TChol__c,	LDL_HDL__c ,Email__c FROM Hospital_Labs__r) ,  Full_Name__c,
         Email__c , Patient_Type__c FROM Enquiry__c ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Account__c> accountHospital(){
        return [SELECT Id, Lipid_Cost__c ,Blood_Cost__c FROM Hospital_Account__c ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> medicalHospital(){
        return [SELECT Id,Medicine_Name__c,Cost__c,Expiry_Date__c FROM Hospital_Medical__c];

    }

    
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> medical(String medName){
      return [SELECT Id,Cost__c ,Medicine_Name__c ,Expiry_Date__c FROM Hospital_Medical__c WHERE Medicine_Name__c=:medName];
    }
}