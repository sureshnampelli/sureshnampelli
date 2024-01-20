import { LightningElement ,api } from 'lwc';
import generatePDF from '@salesforce/apex/HospitalPdfController.generatePDF';
import getPdf from '@salesforce/apex/HospitalPdfController.getPdf';
import uploadFile from '@salesforce/apex/FileUploadClass.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class HospitalLabPdf extends LightningElement {
@api labedpdf
@api recordId
@api bloodedpdf
pdfname
emailName
emailTwo
connectedCallback(){
    console.log('labedpdf',JSON.stringify(this.labedpdf))
}
    closeHandler(){
        const myEvent=new CustomEvent('close')
        this.dispatchEvent( myEvent)

    }
    openHandler(){
        const myEvent=new CustomEvent('selectclose')
        this.dispatchEvent( myEvent)

    }
    fileData
    pdfHandler(){
        
let content=this.template.querySelector('.container')
console.log(content.outerHTML)
//Hospital_Account__c (Attachment Cost(a065j00000NssHuAAJ) Id)
generatePDF({recordId:"a065j00000NssHuAAJ", htmlData:content.outerHTML }).then(result=>{
    console.log('attachment id',result)
    console.log('record',this.recordId)
    window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='00P5j00000NtQdQEAV'`)
}).catch(error=>{
    console.error(error)
})


const encodeval=btoa(content.outerHTML)
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
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
      }

    emailHandler(){
if(this.labedpdf){
        this.labedpdf.forEach(item=>{
            this.pdfname= item.Full_Name__c
        this.emailName=item.Email__c
             console.log('pnamelipid', item.Email__c)  
         })
        }

        if(this.bloodedpdf){
            this.bloodedpdf.forEach(ite=>{
                this.emailName=ite.Email__c
                console.log('lkjhgfdfghjk')
                     console.log('pnameblood', ite.Email__c)  
                 })
        }
 let content=this.template.querySelector('.container')
        getPdf({recordId:"a065j00000NssHuAAJ" , htmlData:content.outerHTML ,emailTo:this.emailName}).then(result=>{
            console.log('attachment email',result)
            window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='a045j00000NJKIoAAP''`)
        }).catch(error=>{
            console.error(error)
        })

       

    }

    emailHandlerTwo(){
        this.bloodedpdf.forEach(ite=>{
            this.emailTwo=ite.Email__c
            console.log('lkjhgfdfghjk')
                 console.log('pname', ite.Email__c)  
             })
             
     let contents=this.template.querySelector('.container')
            getPdf({recordId:'a045j00000NJKIoAAP' , htmlData:contents.outerHTML ,emailTo:this.emailTwo}).then(result=>{
                console.log('attachment email',result)
                window.open(`https://agility-fun-2547-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file='a045j00000NJKIoAAP'`)
            }).catch(error=>{
                console.error(error)
            })
    }
}