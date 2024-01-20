public with sharing class hospitalPdfPageController {
    public string pdfText {get;set;}
    public hospitalPdfPageController() {
pdfText= String.escapeSingleQuotes(ApexPages.currentPage().getParameters().get('pdfText'));
    }
}