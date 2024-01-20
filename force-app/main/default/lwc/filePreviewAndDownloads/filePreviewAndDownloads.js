import { LightningElement ,api,wire} from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/FilePreviewAndDownloadController.getRelatedFilesByRecordId';
import {NavigationMixin} from 'lightning/navigation'
export default class FilePreviewAndDownloads extends NavigationMixin(LightningElement) {
    @api recordId='a065j00000NssHuAAJ'
    filesList =[]
    @wire(getRelatedFilesByRecordId, {recordId:'a065j00000NssHuAAJ'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log('domnmwMn',data)
            this.filesList = Object.keys(data).map(item=>({"label":data[item],
             "value": item,
             "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log('HHHHH', JSON.stringify(this.filesList))
        }
        if(error){ 
            console.log(error)
        }
    }
    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }

}