public class hospitalPharmasyCsvController {

        @AuraEnabled
        public static List<Hospital_Medical__c> saveFileChildPharma(String base64Data) {
    
    
            String Data=JSON.deserializeUntyped(base64Data).toString();
    
    
            list<Hospital_Medical__c> lstCCToInsert = new list<Hospital_Medical__c>();
    
    
            list<String> lstCSVLines = Data.split('\n');
    
    
    
            for(Integer i = 1; i < lstCSVLines.size(); i++){
    
    
                Hospital_Medical__c acc = new Hospital_Medical__c();
    
    
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
               
          
                acc.Ex_Date__c= csvRowData[0];
                acc.No_Of_Medicine__c= Decimal.valueOf(csvRowData[1]);
              acc.Cost__c=Decimal.valueOf(csvRowData[2]);
         
              acc.Medicine_Name__c= csvRowData[3];
    
             
                lstCCToInsert.add(acc);
            }
    
    
            
            insert lstCCToInsert;
    
    
    
            return [Select Id,Medicine_Name__c ,Cost__c ,Expiry_Date__c,Ex_Date__c ,Amount__c,No_Of_Medicine__c,	Each_Medicine__c,Time__c FROM Hospital_Medical__c Where CreatedDate>=:Date.TODAY()];
        }
    
}