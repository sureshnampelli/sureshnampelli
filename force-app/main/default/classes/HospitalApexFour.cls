public with sharing class HospitalApexFour {
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Doctor__c> getHospitalDoctors(String docName){
        return [SELECT Id,Name,Fee__c,Doctor_Type__c,Image__c,Patient_Name__c FROM Hospital_Doctor__c WHERE Name=:docName ];
    }

 @AuraEnabled(cacheable=true)
    public static List<Hospital_Doctor__c> getDoctorsLogin(){
        return [SELECT Id,Name,Fee__c,Doctor_Type__c,Image__c,Patient_Name__c FROM Hospital_Doctor__c];
   }
    @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> getPatientEnquiry(){
        return [SELECT Id , First_Name__c , Last_Name__c ,Password__c,Phone__c ,Full_Name__c,
         Email__c , Patient_Type__c FROM Enquiry__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Enquiry__c> getPatientDetails(String patientId){
        return [SELECT Id , First_Name__c , Last_Name__c ,Password__c,Phone__c ,Full_Name__c,
        Gender__c,Age__c, Email__c , Patient_Type__c FROM Enquiry__c WHERE Id=:patientId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Patient__c> getHospitalPatientEnquiry(String patientEnquiryId){
        return [SELECT Id ,Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
       Gender__c, Email__c ,Variable__c,Cancelled_By__c, Fee__c,Date_Time__c,Test_By__c,Test_Name__c,Hospital_Patient__c.Enquiry__c,Hospital_Patient__c.Hospital_Doctor__c FROM Hospital_Patient__c WHERE  Hospital_Patient__c.Enquiry__c=:patientEnquiryId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Patient__c> getHospitalPatientDoctor(String patientDoctorId){
        return [SELECT Id ,Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
       Gender__c, Email__c , Fee__c,Variable__c,Cancelled_By__c,Date_Time__c,Test_By__c,Test_Name__c,Hospital_Patient__c.Enquiry__c,Hospital_Patient__c.Hospital_Doctor__c FROM Hospital_Patient__c WHERE  Hospital_Patient__c.Hospital_Doctor__c=:patientDoctorId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Patient__c> getPatientEnquiryDoctor(String DoctorId ,String EnquiryId){
        return [SELECT Id ,Name, First_Name__c , Last_Name__c ,Age__c,Date__c,Doctor_Name__c,Doctor_Type__c,Phone__c ,
       Gender__c, Email__c , Fee__c,Variable__c,Cancelled_By__c,Date_Time__c,Test_By__c,Test_Name__c,Hospital_Patient__c.Enquiry__c,Hospital_Patient__c.Hospital_Doctor__c FROM Hospital_Patient__c WHERE  Hospital_Patient__c.Hospital_Doctor__c=:DoctorId AND Hospital_Patient__c.Enquiry__c=:EnquiryId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Hospital_Lab__c> hospitalLab(){
        return [SELECT Id,FULL_NAME__C,Name ,Gender__c,Age__c ,Sample_ID__c,Ref_Doctor__c ,Sample_Drawn_Date__c,
        Sample_Regd_Date__c,Sample_Auth_Date__c,S_Total_Cholesterol__c,S_Triglycerides__c,S_Hdl__c,	VLDL__c,SLDL__c,
        TChol__c,	LDL_HDL__c ,Email__c,Test__c,Patient_Id__c FROM Hospital_Lab__c];
    }
}