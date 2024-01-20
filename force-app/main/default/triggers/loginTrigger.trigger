trigger loginTrigger on Login__c (before insert) {
List<Login__c> login=Trigger.new;
LoginTrigger.BeforeInsert(login);
}