public with sharing class HospitalPdfController {
    @AuraEnabled
    public static Attachment generatePDF(Id recordId , String htmlData ,String emailTo ){
        Pagereference page=Page.renderAsPDF;
        page.getParameters().put('pdfText',htmlData);
        Hospital_Account__c con =new Hospital_Account__c(Id=recordId);
    
        Attachment objAttachment = new Attachment();
        objAttachment.Name='report';
        objAttachment.ParentId=con.Id;
        objAttachment.Body=page.getContentaspdf();
        objAttachment.IsPrivate=false;
        insert objAttachment;
        return objAttachment;   
    }
@AuraEnabled
public static void getPdf( String htmlData ,String emailTo){
    Pagereference page=Page.renderAsPDF;
    page.getParameters().put('pdfText',htmlData);

            try{
                String[] toadd=new String[]{emailTo}; 

                Messaging.EmailFileAttachment ef2=new Messaging.EmailFileAttachment();
                ef2.setFileName('invoicePage.pdf');
                ef2.setBody(page.getContentaspdf());
                Messaging.EmailFileAttachment[] files=new Messaging.EmailFileAttachment[]{ef2};
        String body ='<h2>Dear Customer ,<br/><br/>';
        body='Your request is received with following details<br/>';
        body=body+'Last Name:<i>Suresh</i>';
         Messaging.SingleEmailMessage mail=new Messaging.SingleEmailMessage();
        mail.setToAddresses(toadd);
         mail.setSubject('Html Body Test Message');
        mail.setHtmlBody(body);
        mail.setSenderDisplayName('gr2');
        mail.setInReplyTo('abc@gmail.com');
        mail.setFileAttachments(files);
        Messaging.Email[] emails=new Messaging.Email[]{mail};
            Messaging.sendEmail(emails); 
    
    }
    catch(Exception e){
        throw e;
    }
}
                   
/*return [SELECT Id FROM Attachment WHERE ParentId=:recordId];*/
     /*   Messaging.EmailFileAttachment emos=new Messaging.EmailFileAttachment();
emos.setFileName('report.pdf');
emos.setBody(page.getContentaspdf());
emos.setContentType('pdf');

Messaging.EmailFileAttachment[] files=new Messaging.EmailFileAttachment[]{emos} ;
Messaging.SingleEmailMessage msg=new Messaging.SingleEmailMessage();
msg.setTargetObjectId(con.Id);
msg.setWhatId(con.Lab__c);
msg.setFileAttachments(files);
Messaging.Email[] emails=new Messaging.Email[]{msg};
Messaging.sendEmail(emails);
return con;*/
    
    
}