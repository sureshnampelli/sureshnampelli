public with sharing class AdminEmailController {
    @AuraEnabled
    public static void adminEmailOTP(String adminEmail,String adminShift,String adminName,String adminOtp){
                try{
                    String[] toadd=new String[]{adminEmail}; 
            String body ='<h2>Dear Admin ,<br/><br/>';
            body='Your request is received with following details<br/>';
            body=body+'Name:'+adminName;
            body=body+'Shift:'+adminShift;
           body=body+'OTP:'+adminOtp;
             Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
            mail.setToAddresses(toadd);
             mail.setSubject('Html Body Test Message');
            mail.setHtmlBody(body);
            mail.setSenderDisplayName('gr2');
            mail.setInReplyTo('abc@gmail.com');
            Messaging.Email[] emails=new Messaging.Email[]{mail};
                Messaging.sendEmail(emails); 
    
        }
        catch(Exception e){
            throw e;
        }
    }
   
    @AuraEnabled
    public static void adminEmailOTPShiftTime(String adminTimeEmail,String adminTimeShift,String adminTimeName,String adminTimeOtp){
                try{
                    String[] toadd=new String[]{adminTimeEmail}; 
            String body ='<h2>Dear Customer ,<br/><br/>';
            body='Your request is received with following details<br/>';
            body=body+'Name:'+adminTimeName;
            body=body+'Shift:'+adminTimeShift;
           body=body+'OTP:'+adminTimeOtp;
             Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
            mail.setToAddresses(toadd);
             mail.setSubject('Html Body Test Message');
            mail.setHtmlBody(body);
            mail.setSenderDisplayName('gr2');
            mail.setInReplyTo('abc@gmail.com');
            Messaging.Email[] emails=new Messaging.Email[]{mail};
                Messaging.sendEmail(emails); 
    
        }
        catch(Exception e){
            throw e;
        }
    }
}