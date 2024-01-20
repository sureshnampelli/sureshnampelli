import { LightningElement, track, api } from 'lwc';
import getContentDetails from '@salesforce/apex/ContentManagerServiceFilePreDown.getContentDetails';
import deleteContentDocument from '@salesforce/apex/ContentManagerServiceFilePreDown.deleteContentDocument';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Title',       fieldName: 'Title', wrapText : true,
        cellAttributes: { 
            iconName: { fieldName: 'icon' }, iconPosition: 'left' 
        }
    },
    { label: 'Created By',  fieldName: 'CREATED_BY',
        cellAttributes: { 
            iconName: 'standard:user', iconPosition: 'left' 
        }
    },
    { label: 'File Size',   fieldName: 'Size' },
    { label: 'Preview', type:  'button', typeAttributes: { 
            label: 'Preview',  name: 'Preview',  variant: 'brand-outline',
            iconName: 'utility:preview', iconPosition: 'right'
        } 
    },
    { label: 'Download', type:  'button', typeAttributes: { 
            label: 'Download', name: 'Download', variant: 'brand', iconName: 'action:download', 
            iconPosition: 'right' 
        } 
    },
    { label: 'Delete', type:  'button', typeAttributes: { 
            label: 'Delete',   name: 'Delete',   variant: 'destructive',iconName: 'standard:record_delete', 
            iconPosition: 'right' 
        } 
    } 
];
export default class ContentManagerFilePreviewDownLoad extends NavigationMixin(LightningElement) {

    @api title;
    @api showDetails;
    @api showFileUpload;
    @api showsync;
    @api recordId;
    @api usedInCommunity;
    @api showFilters;
    @api accept = '.csv,.doc,.xsl,.pdf,.png,.jpg,.jpeg,.docx,.doc';

    @track dataList;
    @track columnsList = columns;
    isLoading = false;

    wiredFilesResult;

    connectedCallback() {
        this.handleSync();
    }

    getBaseUrl(){
        let baseUrl = 'https://'+location.host+'/';
        return baseUrl;
    }

    handleRowAction(event){

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'Preview':
                this.previewFile(row);
                break;
            case 'Download':
                this.downloadFile(row);
                break;
            case 'Delete':
                this.handleDeleteFiles(row);
                break;
            default:
        }

    }

    previewFile(file){
        
        if(!this.usedInCommunity){
            
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'filePreview'
                },
                state : {
                    selectedRecordId: file.ContentDocumentId
                }
            });
        } else if(this.usedInCommunity){
            
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: file.fileUrl
                }
            }, false );
        }
        
    }

    downloadFile(file){
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: file.downloadUrl
                }
            }, false 
        );
    }

    handleDeleteFiles(row){

        this.isLoading = true;

        deleteContentDocument({
            recordId : row.ContentDocumentId
        })
        .then(result => {
            this.dataList  = this.dataList.filter(item => {
                return item.ContentDocumentId !== row.ContentDocumentId ;
            });
        })
        .catch(error => {
            console.error('**** error **** \n ',error)
        })
        .finally(()=>{
            this.isLoading = false;
        });
    }

    handleSync(){

        let imageExtensions = ['png','jpg','gif'];
        let supportedIconExtensions = ['ai','attachment','audio','box_notes','csv','eps','excel','exe',
                        'flash','folder','gdoc','gdocs','gform','gpres','gsheet','html','image','keynote','library_folder',
                        'link','mp4','overlay','pack','pages','pdf','ppt','psd','quip_doc','quip_sheet','quip_slide',
                        'rtf','slide','stypi','txt','unknown','video','visio','webex','word','xml','zip'];

        this.isLoading = true;
        getContentDetails({
            //this.recordId (ParentId)
            recordId : "a065j00000NssHuAAJ"
        })
        .then(result => {
            let parsedData = JSON.parse(result);
            let stringifiedData = JSON.stringify(parsedData);
            let finalData = JSON.parse(stringifiedData);
            let baseUrl = this.getBaseUrl();
            finalData.forEach(file => {
                file.downloadUrl = baseUrl+'sfc/servlet.shepherd/document/download/'+file.ContentDocumentId;
                file.fileUrl     = baseUrl+'sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId='+file.Id;
                file.CREATED_BY  = file.ContentDocument.CreatedBy.Name;
                file.Size        = this.formatBytes(file.ContentDocument.ContentSize, 2);

                let fileType = file.ContentDocument.FileType.toLowerCase();
                if(imageExtensions.includes(fileType)){
                    file.icon = 'doctype:image';
                }else{
                    if(supportedIconExtensions.includes(fileType)){
                        file.icon = 'doctype:' + fileType;
                    }
                }
            });
            this.dataList = finalData;
        })
        .catch(error => {
            console.error('**** error **** \n ',error)
        })
        .finally(()=>{
            this.isLoading = false;
        });
    }

    handleUploadFinished(){
        this.handleSync();
        //eval("$A.get('e.force:refreshView').fire();");
    }
    formatBytes(bytes,decimals) {
        if(bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    handleSearch(event){
        let value = event.target.value;
        let name  = event.target.name;
        if( name === 'Title' ){
            this.dataList = this.dataList.filter( file => {
                return file.Title.toLowerCase().includes(value.toLowerCase());
            });
        } else if( name === 'Created By' ){
            this.dataList = this.dataList.filter( file => {
                return file.CREATED_BY.toLowerCase().includes(value.toLowerCase());
            });
        }
    }

}