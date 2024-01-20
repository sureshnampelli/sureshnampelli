public with sharing class HospitalApexThree {
    @AuraEnabled(cacheable=true)
    public static  List<Attachment> attachedFiles(){
     
      return [SELECT Id, Name, Body, ContentType FROM Attachment WHERE   ParentId =:'a045j00000NJKIoAAP' ];
    }

    @AuraEnabled(cacheable=true)
    public static  List<Attachment> attachedFile(){
     
        return [SELECT Id, Name, Body, ContentType FROM Attachment WHERE  CreatedDate=TODAY ];
    }
}