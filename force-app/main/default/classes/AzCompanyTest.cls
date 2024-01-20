@isTest
public with sharing class AzCompanyTest {
    @testsetup Static void TestCompanyData(){
        AZ_Company_Date__c com=new AZ_Company_Date__c();
         com.Name='2024-01-17';
         insert com;
         AZ_Company_Shift__c azcs= new AZ_Company_Shift__c();
         azcs.Name='Shift1';
         azcs.AZ_Company_Date__c=com.Id;
         azcs.Shift_Name__c='Shift1';
         azcs.Shift_Timings__c='11:11:11-23:23:23';
         insert azcs;
        
         Test.startTest();
         AzCompanyControllerTest.getComapnyShift(com.Name);
     Test.stopTest(); 
         
     }
}