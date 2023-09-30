public with sharing class CreateAcc {
    @AuraEnabled
 public static Account  createAccount(Account acc){
try{
return acc;
}catch(Exception e){
    throw new AuraHandledException(e.getMessage());
}
 }
}