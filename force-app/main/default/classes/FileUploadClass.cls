public with sharing class FileUploadClass {
   @AuraEnabled
   public static string uploadFile(String base64,String filename ,String recordId ){
  ContentVersion cv =createContentVersion(base64 , filename);
  ContentDocumentLink cdl=createContentLink(cv.Id ,recordId);
  if(cv == null || cdl == null) { return null;}
  return cdl.Id ;
   }

    /*
   * @method createContentVersion() [private]
   * @desc Creates a content version from a given file's base64 and name
   * 
   * @param {String} base64 - base64 string that represents the file
   * @param {String} filename - full file name with extension, i.e. 'products.csv'
   * 
   * @return {ContentVersion} - returns the newly created ContentVersion, or null
   *   if there was an error inserting the record
   */

   private static ContentVersion createContentVersion(String base64 , String filename){
    ContentVersion cv = new ContentVersion();
    cv.VersionData =EncodingUtil.base64Decode(base64);
    cv.Title = filename;
    cv.pathOnClient = filename;
    try {
        insert cv ;
        return cv ;
    } catch(DmlException e){
        System.debug(e);
        return null;
        }
    }
 /*
   * @method createContentLink() [private]
   * @desc Creates a content link for a given ContentVersion and record
   * 
   * @param {String} contentVersionId - Id of the ContentVersion of the file
   * @param {String} recordId - Id of the record you want to attach this file to
   * 
   * @return {ContentDocumentLink} - returns the newly created ContentDocumentLink, 
   *   or null if there was an error inserting the record
   */
  private static ContentDocumentLink createContentLink(String contentversionId, String recordId){
    if(contentversionId == null || recordId == null){ return null;}
    ContentDocumentLink cdl = new ContentDocumentLink();
    cdl.ContentDocumentId = [ SELECT ContentDocumentId FROM ContentVersion WHERE Id =: contentversionId].ContentDocumentId;
    cdl.LinkedEntityId= recordId;
     // ShareType is either 'V', 'C', or 'I'
    // V = Viewer, C = Collaborator, I = Inferred
    cdl.ShareType = 'v';
    try {
        insert cdl ;
return cdl;
    } catch(DmlException e){
        System.debug(e);
        return null;
    }
  }

   }

