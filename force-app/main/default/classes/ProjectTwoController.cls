public with sharing class ProjectTwoController {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserDetails(){
        return [ SELECT Name, Id,Email FROM User WHERE Id = : UserInfo.getUserId() ];
    }
   
        @AuraEnabled(cacheable=false)
        public static List<ContentDocumentLink> fetchClientFiles(String clientId){
           return [SELECT LinkedEntityId, ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType 
                        FROM ContentDocumentLink  
                    WHERE LinkedEntityId =: clientId];
        }
}