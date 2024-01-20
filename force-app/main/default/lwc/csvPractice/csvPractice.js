import { LightningElement ,wire,api} from 'lwc';
import getAccounts from '@salesforce/apex/CsvController.getAccounts'
import uploadFile from '@salesforce/apex/FileUploadClass.uploadFile'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CsvPractice extends LightningElement {
    accountData
    fileData
    @api recordId
    accountHeaders={
        Id:"Record Id",
        Name:"Name",
        AnnualRevenue:"Annual Revenue",
        Industry:"Industry",
        Phone:"Phone"
    }
    @wire(getAccounts)
    accountHandler({data, error}){
        if(data){
            console.log('pppp',data)
            this.accountData = data
        }
        if(error){
            console.error(error)
        }
    }


        //headers, totalData, fileTitle
        exportCSVFile( ){
        if(!this.accountData || !this.accountData.length){
            return null
        }
        console.log('data', JSON.stringify(this.accountData))
        //const jsonObject = JSON.stringify(this.accountData)
        const columnDelimiter = ','
        const lineDelimiter = '\r\n'
        console.log('headws',this.accountHeaders)
        const actualHeaderKey = Object.keys(this.accountHeaders)
        const headerToShow = Object.values(this.accountHeaders)
        console.log('head',actualHeaderKey)
        let str = ''
        str+=headerToShow.join(columnDelimiter)
        str+=lineDelimiter
        const data = typeof this.accountData !=='object' ? JSON.parse(this.accountData):this.accountData
        data.forEach(obj=>{
            let line =''
            actualHeaderKey.forEach(key=>{
                if(line !=''){
                    line+=columnDelimiter
                }
                
                let strItem =obj[key] ? obj[key]+'' : ''
                line+=strItem? strItem.replace(/,/g, ''):strItem
            })
            str+=line+lineDelimiter
        })
         
        const result = str
        console.log('str',JSON.stringify(str))
        if(!result){
            return null
        }
        const blob = new Blob([result])
        const exportedFileName =  "account_records"+'.csv'
        if(navigator.msSaveBlob){
            console.log('link1')
            navigator.msSaveBlob(blob, exportedFileName)
        } else {
            console.log('link2')
            const link = window.document.createElement('a')
            link.href='data:text/csv;charset=utf-8,' + encodeURI(result);
            link.target = "_self"
            link.download=exportedFileName
            console.log('link3')
            link.click()
            console.log('link',link)
        
        const encodeval=btoa( encodeURI(result))
        console.log('fmmff',JSON.stringify(encodeval))
    
    
    
            this.fileData= {
                'filename':'asd.docx',
                'base64':encodeval,
                'recordId':this.recordId
            }
            console.log('file',JSON.stringify(this.fileData))
    
        const {base64 ,filename ,recordId} =this.fileData
        uploadFile({base64 , filename , recordId}).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!`
            this.toast(title)
        })
    }}
    toast(title){
        const toastEvent = new ShowToastEvent({
            title,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
      }
  
    
}