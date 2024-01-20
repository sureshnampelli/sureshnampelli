public with sharing class HospitalAttendanceRegisterController {
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Attendance_Meta__mdt> getAttendanceMeta(){
        return [SELECT Id,Label,Status_Pro__c FROM Hospital_Attendance_Meta__mdt];
    }

    @AuraEnabled(cacheable=true)
   public static List<Hospital_Attendance__c> getRegister(Date toDate){
   return [SELECT Id,Name,Status__c FROM Hospital_Attendance__c WHERE Hospital_Register__r.Date__c=:toDate];
   }

   //To save the draft values if exist,
   public static void updateDetails(List<object> empMap ,Date selectedDate ){
    Map<object,object> resultMap;
    String stDate=selectedDate.format();
    system.debug('stdate'+stDate);
    Id updateDateId;
    Id newDateId;
    List<Hospital_Register__c> existRec=[SELECT Id,Date__c FROM Hospital_Register__c WHERE Date__c=:selectedDate];
     if(existRec.size()>0){
        updateDateId=existRec[0].Id;
     }
     else{
        Hospital_Register__c dt =new Hospital_Register__c(Date__c=selectedDate,Name=stDate);
        insert dt;
        newDateId=dt.Id;
     }
     List<Hospital_Attendance__c> empList= new List<Hospital_Attendance__c>();
     List<Hospital_Attendance__c> empupdateList= new List<Hospital_Attendance__c>();

     Map<String,Hospital_Attendance__c> extempMap=new Map<String,Hospital_Attendance__c>();
     if(updateDateId!=null){
        List<Hospital_Attendance__c> extempList=[SELECT Id,Name,Status__c FROM Hospital_Attendance__c WHERE
        Hospital_Register__c=: updateDateId];
        for(Hospital_Attendance__c ept: extempList){
            extempMap.put(ept.Name,ept);
        }
     }
     if(newDateId!=null){
        for (object ob :empMap ) {
            resultMap=(Map<object,object>)ob;
            String Name=(String)resultMap.get('Label');
            Boolean empStatus=(Boolean)resultMap.get('Status_Pro__c');
            system.debug('resultMap'+resultMap);
            system.debug('selectedDate'+selectedDate);
Hospital_Attendance__c emp=new Hospital_Attendance__c(Name=Name,Status__c=empStatus);
if(newDateId!=null){
    emp.Hospital_Register__c=newDateId;
}
empList.add(emp);
system.debug('emp123'+emp);
        }
     }
     //to handle the updation of emendment on old data
     else if(updateDateId!=null) {
        for (Object ob : empMap) {
            resultMap=(Map<object,object>)ob;
            system.debug('resultMap123'+resultMap);
            String Name=(String)resultMap.get('Name');
            Boolean empStatus=(Boolean)resultMap.get('Status__c');
            Hospital_Attendance__c  empRec=extempMap.get(Name);
            empRec.Status__c=empStatus;
            empupdateList.add(empRec);
        }
     }
     //add the all unedied emp details from metadata to salesforce 
     if(newDateId!=null){
        List<Hospital_Attendance_Meta__mdt> empMdt=[SELECT Status_Pro__c,Label FROM Hospital_Attendance_Meta__mdt];
    Map<String , Hospital_Attendance__c> mapemp= new   Map<String , Hospital_Attendance__c>();
    if(empMdt.size()>0){
        for(Hospital_Attendance__c empAtt:empList){
            mapemp.put(empAtt.Name,empAtt);
        }
        for(Hospital_Attendance_Meta__mdt emp : empMdt) {
          if(!mapemp.containskey(emp.Label)){
            Hospital_Attendance__c emp2=new Hospital_Attendance__c(Name=emp.Label,Status__c=false);
            emp2.Hospital_Register__c=newDateId;
            empList.add(emp2);
          }  
        }
    }
    }
    if(empList.size()>0){
        Database.insert(empList);
    }
    if(empupdateList.size()>0){
        Database.update(empupdateList);
    }
   }
}