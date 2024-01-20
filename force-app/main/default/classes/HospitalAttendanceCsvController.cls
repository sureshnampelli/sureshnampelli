public  class HospitalAttendanceCsvController {
   
        @AuraEnabled
        public static List<Attendance_Register__c> saveFileAttendance(String base64Data) {
    
    
            String Data=JSON.deserializeUntyped(base64Data).toString();
    
    
            list<Attendance_Register__c> lstCCToInsert = new list<Attendance_Register__c>();
    
    
            list<String> lstCSVLines = Data.split('\n');
    
    
    
            for(Integer i = 1; i < lstCSVLines.size(); i++){
    
    
                Attendance_Register__c acc = new Attendance_Register__c();
    
    
                String csvLine = lstCSVLines[i];
    
    
                String prevLine = csvLine;
                Integer startIndex;
                Integer endIndex;
                
                while(csvLine.indexOf('"') > -1){
                
                    if(startIndex == null){
                        startIndex = csvLine.indexOf('"');
                        csvLine = csvLine.substring(0, startIndex) + ':quotes:' + csvLine.substring(startIndex+1, csvLine.length());
                    }else{
                        if(endIndex == null){
                            endIndex = csvLine.indexOf('"');
                            csvLine = csvLine.substring(0, endIndex) + ':quotes:' + csvLine.substring(endIndex+1, csvLine.length());
                        }
                    }
                    
                    if(startIndex != null && endIndex != null){
                        String sub = csvLine.substring(startIndex, endIndex);
                        sub = sub.replaceAll(',', ':comma:');
                        csvLine = csvLine.substring(0, startIndex) + sub + csvLine.substring(endIndex, csvLine.length());
                        startIndex = null;
                        endIndex = null;
                    }
                }
                
                List<String> csvRowData = new List<String>();
    
    
                for(String column : csvLine.split(',')){
    
    
                    column = column.replaceAll(':quotes:', '').replaceAll(':comma:', ',');
    
    
                    csvRowData.add(column);
    
    
    
                }
               
             list<Attendance_Register__c>  listAtt= [Select Id, Full_Name__c, Post__c,Login_Time__c From Attendance_Register__c Where CreatedDate=TODAY];
            
               for(Attendance_Register__c li:  listAtt){
                if(csvRowData[0]!=li.Full_Name__c){
                    acc.Full_Name__c= csvRowData[0];
                    //  acc.Login_Time__c=NOW();
                       
                     acc.Post__c=csvRowData[2];
                     acc.Status__c='Present';
                }
               }
                  
                    
                
              
                lstCCToInsert.add(acc);
              
              
               
            }
    
    
            
            insert lstCCToInsert;
    
    
    
            return [Select Id, Full_Name__c, Post__c,Login_Time__c From Attendance_Register__c Where CreatedDate>=:Date.TODAY()];
        }
    }
