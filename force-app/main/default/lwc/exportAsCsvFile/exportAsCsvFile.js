import { LightningElement,track,wire,api } from 'lwc';
import medical from '@salesforce/apex/HospitalApexTwo.medical';
import uploadFile from '@salesforce/apex/FileUploadClass.uploadFile'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
export default class ExportAsCsvFile extends LightningElement {
    @track conatctData = {}
    
    @api recordId;
    fileData
    columnHeader = ['ID', 'Medicine Name', 'Ex Date', 'Cost','Amount','No Of ' ,'Each']

    @wire(medical)
    wiredData({ error, data }) {
        if (data) {
            console.log('Data', data);
            this.conatctData = data;
        } else if (error) {
            console.error('Error:', error);
        }
    }

    exportContactData(){
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.columnHeader.forEach(element => {            
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        // Add the data rows
        this.conatctData.forEach(record => {
            doc += '<tr>';
            doc += '<th>'+record.Id+'</th>'; 
            doc += '<th>'+record.Medicine_Name__c+'</th>'; 
            doc += '<th>'+record.Ex_Date__c+'</th>';
            doc += '<th>'+record.Cost__c+'</th>'; 
            doc += '<th>'+record.Amount__c+'</th>';
            doc += '<th>'+record.No_Of_Medicine__c+'</th>'; 
            doc += '<th>'+record.Each_Medicine__c+'</th>';
            doc += '</tr>';
        });
        doc += '</table>';
        console.log('xl',doc)
            
        const file =doc
        var reader = new FileReader()
        reader.onload= () => {
            var base64 = reader.result.split(',')[1]
            this.fileData= {
                'filename':'csvFile',
                'base64':base64,
                'recordId':this.recordId
            }
            console.log('file',JSON.stringify(this.fileData))
        }
        reader.readAsDataURL(file)
      
    
    
        const {base64 ,filename ,recordId} =this.fileData
        uploadFile({base64 , filename , recordId}).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!`
            this.toast(title)
        })
    








        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Contact Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }
    toast(title){
        const toastEvent = new ShowToastEvent({
            title,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
      }
}