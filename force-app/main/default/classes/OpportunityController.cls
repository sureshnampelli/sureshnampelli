public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitie(){
        return [SELECT StageName FROM Opportunity];
    }
    @AuraEnabled(cacheable=true)
    public static List<Hospital_Medical__c> getMedical(){
        return [SELECT Medicine_Name__c FROM Hospital_Medical__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOpportunities(){
        return [SELECT SUM(ExpectedRevenue) expectRevenue, SUM(Amount) amount, StageName stage 
               FROM Opportunity WHERE StageName NOT IN ('Closed Won') GROUP BY StageName LIMIT 20];
    }
}