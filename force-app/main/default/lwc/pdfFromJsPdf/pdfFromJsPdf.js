import { LightningElement,api,wire,track } from 'lwc';
import jsPDF from '@salesforce/resourceUrl/jsPdfTwo';
import { loadScript } from 'lightning/platformResourceLoader';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import NAME_FIELD from '@salesforce/schema/Account.Name'
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue' 
const FIELDS = [
  'Contact.Id','Contact.Name',  'Contact.Account.Name',
     ' Contact.Email'
];
export default class PdfFromJsPdf extends LightningElement {
   /* name
    owner
    AnnualRevenue
    @api recordId
    @wire(getRecord, {recordId:'$recordId',
     fields:[NAME_FIELD, OWNER_NAME_FIELD, ANNUAL_REVENUE_FIELD]})
     accountHandler({data}){
         if(data){
             console.log(data)
             this.name = getFieldValue(data, NAME_FIELD) 
             this.AnnualRevenue = getFieldDisplayValue(data, ANNUAL_REVENUE_FIELD) 
             this.owner = getFieldValue(data, OWNER_NAME_FIELD) 

         }
     }
 jsPdfInitialized=false;
    renderedCallback(){
        console.log(this.contact.data);
        loadScript(this, jsPDF ).then(() => {});
        if (this.jsPdfInitialized) {
            return;
        }
        this.jsPdfInitialized = true;
    }
   
 generatePdf(){
       const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
}*/

jsPdfInitialized=false;
renderedCallback(){
    if (this.jsPdfInitialized) {
        return;
    }
    this.jsPdfInitialized = true;
//'/jspdf.umd.min.js'
    Promise.all([
        loadScript(this, jsPDF+'/jsPDF-1.3.2/jspdf.umd.min.js').then(() => {
            console.log("JS loaded");
        }).catch(error => {
            console.error("Error " + error);
        })
    ]);
}
generatePDF()
{
    this.generate();
    this.generatePDFImage();
}
generate()
{
    try
    {
        const { jsPDF } = window.jspdf;
        var verticalOffset=0.5;
        var size=12;
        var margin=0.5;

        const doc = new jsPDF('p', 'in', 'letter');
        //Landscape PDF
        //new jsPDF({   orientation: 'landscape',   unit: 'in',   format: [4, 2] })  
        // jsPDF('p', 'in', 'letter')

        //Sets the text color setTextColor(ch1, ch2, ch3, ch4) 
        doc.setTextColor(100); 
        //Create Text
        doc.text("Hello SalesforceCodex!", 10, 10);
        doc.rect(20, 20, 10, 10);
        
        // Set Margins:
        doc.setDrawColor(0, 255, 0)   //Draw Color
        .setLineWidth(1 / 72)  // Paragraph line width
        .line(margin, margin, margin, 11 - margin) // Margins
        .line(8.5 - margin, margin, 8.5 - margin, 11 - margin)

        var stringText='SalesforceCodex.com is started in 2016 as a personal blog where I tried to solve problems with simple and understandable content. Initially, my focus was on sharing content on which feature I was working. \n\nToday, SalesforceCodex.com is focused on helping salesforce developers, programmers and other IT professionals improve their careers. We are helping developers in integrating other technologies,  coding best practices, lightning web components, architecture, design solutions, etc.';
        
        var lines=doc.setFont('Helvetica', 'Italic')
                            .setFontSize(12)
                            .splitTextToSize(stringText, 7.5);
        //doc.setFontSize(40);
        doc.text(0.5, verticalOffset + size / 72, lines);
        verticalOffset += (lines.length + 0.5) * size / 72;
        //Save File
        doc.save("a4.pdf");
        
    }
    catch(error) {
        alert("Error " + error);
    }
}
//Convert Image into Base64
getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

//Create PDF with Image and Text
generatePDFImage(e)
{
    try{
        const { jsPDF } = window.jspdf;
        // You'll need to make your image into a Data URL
        var imgData = 'data:image/jpeg;base64,'+ this.getBase64Image(this.template.querySelector('.image'));            
        var doc = new jsPDF();
        doc.setFontSize(40);
        doc.text(35, 25, 'SalesforceCodex.com');
        doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
        doc.save("a4.pdf");
    }
    catch(error)
    {
       alert(error);
    }
}

}