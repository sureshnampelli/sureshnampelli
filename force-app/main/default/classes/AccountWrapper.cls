public with sharing class AccountWrapper {
    @auraenabled
    public string name{get;set;}
    @auraenabled
    public integer numberOfEmployees{get;set;}
    @AuraEnabled
    public List<Contact> contacts { get; set; }
}