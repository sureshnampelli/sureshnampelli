public with sharing class AccControl {
  @AuraEnabled(cacheable=true)
public static List<Account> getAcList(){
    return [SELECT Id, Name, phone FROM Account];
}
}