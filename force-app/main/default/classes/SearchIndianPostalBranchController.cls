public class SearchIndianPostalBranchController {
    public string postalPincode{set ;get ;}
    public List<PostOfficeBranch> lstBranches {set;get;}
    public string postalResponseJSON {set; get;}
    public void SearchPostalBranches(){
        lstBranches=new List<PostOfficeBranch>();
        if(postalPincode !=null && postalPincode !='' ){
            string endPointURL='https://api.postalpincode.in/pincode/'+postalPincode;
            Http postalHttp=new Http();
            HttpRequest postalRequest=new HttpRequest();
            postalRequest.setEndpoint(endPointURL);
                postalRequest.setMethod('GET');
                postalRequest.setTimeout(20000);
            HttpResponse postalResponse=postalHttp.send(postalRequest);
            postalResponseJSON=postalResponse.getBody();
            //parse the JSON content and represent in the tabular format
            System.JSONParser pParser=System.JSON.createParser(postalResponse.getBody());
            while(pParser.nextToken() !=null){
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'Message'){
                    pParser.nextToken();
                    system.debug('Response  message is ....'+pParser.getText());
                }
                 if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'Status'){
                   
                    system.debug('Response status is ....'+pParser.getText());
                }
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText() == 'PostOffice'){
                    pParser.nextToken();
                    if(pParser.getCurrentToken()==JsonToken.START_ARRAY)
                    {
                        pParser.nextToken();
                        while(pParser.getCurrentToken() ==JsonToken.START_OBJECT)
                        {
                            PostOfficeBranch branch=(PostOfficeBranch) pParser.readValueAs(PostOfficeBranch.class);
                            lstBranches.add(branch);
                            pParser.nextToken();
                        }
                    }
                } 
            }
        }
    }
}