public with sharing class HospitalPatientPagePdfController {
    public string pdfText {get;set;}
    public HospitalPatientPagePdfController() {
pdfText= String.escapeSingleQuotes(ApexPages.currentPage().getParameters().get('pdfText'));
    }
}