public with sharing class LoginApex {
    @AuraEnabled(cacheable=true)
    public static List<Login__c> loginSignIn(String userName){
      return [SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Rating__c, Enter_Password__c ,In_Or_Out__c, Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM 
      Login__c  WHERE User_Name__c =: userName ];

    }

    @AuraEnabled(cacheable=true)
    public static List<Login__c> loginSignInFilter(){
      return [SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Rating__c, Enter_Password__c ,In_Or_Out__c, Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM 
      Login__c   ];

    }

     @AuraEnabled(cacheable=true)
    public static List<Login__c> loginRecords(){
      return [SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Rating__c,Status__c,Status_Pro__c,In_Out__c,In_Or_Out__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM 
      Login__c  ];

    }

    @AuraEnabled(cacheable=true)
    public static List<Login__c> loginType(String typeSerarch){
      return [SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Rating__c,Status__c,In_Out__c,In_Or_Out__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM 
      Login__c WHERE Status__c =: typeSerarch ];

    }

   @AuraEnabled(cacheable=true)
    public static List<Attendance_Register__c> attendanceRegister(){
      return [SELECT Id,Full_Name__c FROM Attendance_Register__c WHERE CreatedDate=TODAY];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Document> getImages(){
      List<Document>  lst=new List<Document>();
      for(Document images : [SELECT Id,body,Name From Document WHERE Folder.Name='Images']){
        lst.add(images);
      }
      return lst;
    } 

    public class Filters{
      @AuraEnabled
      public  String searchKey{get;set;}
      
@AuraEnabled
public  String[] typewired{get;set;}

  }

  @AuraEnabled(cacheable=true)
  public static List<Login__c> getlogin(Filters filters){
    String key,whereClause='';
  
    String[] criteria, typewired=new List<String>{};
    if(filters !=null){
      typewired=filters.typewired;


if(!String.isEmpty(filters.searchKey)){
    key='%'+filters.searchKey+'%';
    criteria.add('User_Name__c LIKE:key');
}

if(filters.typewired!=null){
    criteria.add('Type__c IN:typewired');
}


    }
    String query='SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Status__c,In_Out__c,In_Or_Out__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM Login__c '+'WHERE' + String.join(criteria,'AND')+'WITH SECURITY_ENFORCED'+'ORDER BY Full_Name__c';
    return Database.query(query);
   
  }
  @AuraEnabled(cacheable=true)
  public static List<Login__c> loginSearc(String typed , String statusPro){
  String  querystring=' SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Status__c,In_Out__c,In_Or_Out__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM Login__c WHERE Type__c =\''+typed+'\'AND Status__c= \''+statusPro+'\'';
  return Database.query(querystring);
  }


  @AuraEnabled(cacheable=true)
  public static List<Login__c> loginSearch(String typed , String statusPro){
  String  querystring=' SELECT Id , User_Name__c ,Full_Name__c,Login_Time__c,Status__c,Status_Pro__c,In_Out__c,In_Or_Out__c, Enter_Password__c , Re_Enter_Password__c ,Password__c,Picture_Url_c__c ,Type__c ,Image__c FROM Login__c ';
  if(typed!=null){
    querystring += ' WHERE Type__c =\''+typed+'\'';
    if(statusPro!=null){
      querystring += ' AND Status_Pro__c= \''+statusPro+'\'';
    }
   
  }
   
  
  
  return Database.query(querystring);
  }

}