public  class hospitalMasterCsvUploadController {
    @AuraEnabled
    public static List<Hospital_Master_Med__c> saveFileMed(String base64Data) {


        String Data=JSON.deserializeUntyped(base64Data).toString();


        list<Hospital_Master_Med__c> lstCCToInsert = new list<Hospital_Master_Med__c>();


        list<String> lstCSVLines = Data.split('\n');



        for(Integer i = 1; i < lstCSVLines.size(); i++){


            Hospital_Master_Med__c acc = new Hospital_Master_Med__c();


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

           
           acc.Cost__c= Decimal.valueOf(csvRowData[0]);
            acc.Med_Left__c= Decimal.valueOf(csvRowData[1]);
            
          acc.Ex_Date__c=csvRowData[2];


          acc.Name= csvRowData[3];
            lstCCToInsert.add(acc);
        }


        
        insert lstCCToInsert;



        return [Select Id, Name, Cost__c, Med_Left__c,Expiry_Date__c From Hospital_Master_Med__c Where CreatedDate>=:Date.TODAY()];
    }
}