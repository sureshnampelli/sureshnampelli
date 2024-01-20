public  class lwcCSVUploaderController {
    @AuraEnabled
    public static List<Account> saveFile(String base64Data) {


        String Data=JSON.deserializeUntyped(base64Data).toString();


        list<Account> lstCCToInsert = new list<Account>();


        list<String> lstCSVLines = Data.split('\n');



        for(Integer i = 1; i < lstCSVLines.size(); i++){


            Account acc = new Account();


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


            acc.Name= csvRowData[0];
            acc.Site= csvRowData[1];
            acc.AccountSource= csvRowData[2];


            lstCCToInsert.add(acc);
        }


        
        insert lstCCToInsert;



        return [Select Id, Name, Site, AccountSource From Account Where CreatedDate>=:Date.TODAY()];
    }



}