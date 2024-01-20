public with sharing class HARController {
    @AuraEnabled(cacheable=true)
    public static List<HAttendance__c> getAttendance(String toDate){
        return [SELECT Id,Name,Status__c,Image__c,In_Out__c,Role__c FROM HAttendance__c WHERE HRegister__r.Name=:toDate];
    }

    @AuraEnabled(cacheable=true)
    public static List<HAttendance__c> getAttendanceSearch(){
    return  [SELECT Id,Name,Status__c,Image__c,In_Out__c,Role__c FROM HAttendance__c];
    
    }
    @AuraEnabled(cacheable=true)
    public static List<HRegister__c> getRegister(){
        return [SELECT Id,Name,Date__c FROM HRegister__c WHERE CreatedDate>=:Date.TODAY()];
    }

    @AuraEnabled(cacheable=true)
    public static List<Login__C> getLogins(){
        return [SELECT Id,Full_Name__c,In_Out__c,Picture_Url_c__c,Type__c FROM Login__c ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Attendance_Meta__mdt> getAttendanceMeta(){
        return [SELECT Id,Label,Status_Pro__c FROM Hospital_Attendance_Meta__mdt];
    }
}