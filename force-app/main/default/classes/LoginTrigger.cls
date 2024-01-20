public with sharing class LoginTrigger {

   public static void BeforeInsert(List<Login__c> login){
      for(Login__c lo : login){
     if( lo.Enter_Password__c==lo.Re_Enter_Password__c){
lo.Password__c=lo.Enter_Password__c;
     }else{
      lo.addError('enter same');
     }

      }
   }
}