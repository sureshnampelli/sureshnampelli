import { LightningElement,wire,track ,api} from 'lwc';
import hospitalMasterPharma from '@salesforce/apex/HospitalApexTwo.hospitalMasterPharma';
import medicalHospitalChild from '@salesforce/apex/HospitalApexTwo.medicalHospitalChild';
import chartJs from '@salesforce/resourceUrl/chartJs'
import {loadScript} from 'lightning/platformResourceLoader'
import hospitalremovebg from '@salesforce/resourceUrl/hospitalremovebg'
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import saveFileMed from '@salesforce/apex/hospitalMasterCsvUploadController.saveFileMed';
import saveFile from '@salesforce/apex/lwcCSVUploaderController.saveFile';
import getMedical from '@salesforce/apex/OpportunityController.getMedical';
import HOSPITAL_MASTER from '@salesforce/schema/Hospital_Master_Med__c';
import COST from '@salesforce/schema/Hospital_Medical__c.Cost__c';
import NOMEDICINE from '@salesforce/schema/Hospital_Medical__c.No_Of_Medicine__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import MEDICAL_OBJECT from '@salesforce/schema/Hospital_Medical__c';
import attachedFiles from '@salesforce/apex/HospitalApexThree.attachedFile';
import { NavigationMixin } from 'lightning/navigation';
const columns = [
    
   { label: 'Cost', fieldName: 'Cost__c' },
    { label: 'Med Left', fieldName: 'Med_Left__c' },
    { label: 'Expiry Date', fieldName: 'Expiry_Date__c'  },
    { label: 'Name', fieldName: 'Name' },
  
 ];
export default class HospitalPharmaManager extends NavigationMixin(LightningElement) {
    hospitalRemovebg=hospitalremovebg
    medicalChild
        headings=["Name","Cost","Each Medicine","Ex.Date"," Alloted","Medicine Left"  ,"Total"]
        fullTableData=[] ; filteredData=[] ; timer ; filterBy="Name" ; sortedBy = 'Name'; sortDirection='asc';
        @api staffUserName
        @api staffImage
       @api staffJobRole
        toggleIconName = '';toggleButtonLabel 
       
      
        get popvover(){
            return  this.toggleIconName=== 'preview' ? "slds-visible" : "slds-hidden"
         }
         handleToggleClick() {
             // retrieve the classList from the specific element
             const contentBlockClasslist = this.template.querySelector(
                 '.ImageStaff'
             ).classList;
             // toggle the hidden class
             contentBlockClasslist.toggle('slds-rise-from-ground');
         
             // if the current icon-name is `utility:preview` then change it to `utility:hide`
             if (this.toggleIconName === 'preview') {
                 this.toggleIconName = '';
                 this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-fall-into-ground";
             }else {
                 this.toggleIconName = 'preview';
                 this.toggleButtonLabel = "slds-popover slds-popover_tooltip slds-nubbin_bottom-left slds-rise-from-ground";
             }
         }
@wire(attachedFiles)
attachedFilesHandler({data,error}){
    if(data){
        console.log('attachedDa',data)
      
    }
    if(error){
        console.log(error)
    }
}

        @wire(hospitalMasterPharma)
        medMasterHandler({data, error}){
            if(data){
                console.log(data)
                this.fullTableData = data
                this.filteredData= data
            }
            if(error){
                console.log(error)
            }
        }

        splitData=[]
        NosplitData
        count=0
        countOne=1
        totalPage
        callApex(NameChild){
            medicalHospitalChild({medChildName:NameChild}).then(result=>{
                console.log('medChild',result)
              //  this.medicalChild=result
                const NoOfPage=Math.ceil(result.length/5)
                console.log('noof', NoOfPage)
        this.totalPage=Math.ceil(result.length /5);
        console.log('totalpages', this.totalPage)
        const size = Math.ceil(result.length /NoOfPage);
     this.splitData=   Array.from({ length:NoOfPage }, (v, i) =>
    result.slice(i * size, i * size + size)
   
  );
window.localStorage.setItem('Table',JSON.stringify(this.splitData))
this.splitData = JSON.parse(window.localStorage.getItem('Table'));
  console.log('spilt',JSON.stringify(this.splitData[this.count]))
  console.log('len', this.splitData.length)
                if(this.splitData){
                    this.promtStatus=true
                }
            })
        }

        renderedCallback(){
            this.medicalChild= this.count=== 0 ? this.splitData[this.count] : this.splitData[this.count]
        }
        get disablePrevious(){
            return this.count<=0
        }
        get disableNext(){
            return this.count>= this.totalPage-1
        }
        handlePreviousPageOne(){
            this.count= this.count-1
            this.countOne= this.countOne-1
         
        }
        handleNextPgeNone(){
            this.count= this.count+1
            this.countOne= this.countOne+1  
        }

        dismissHandler(){
            this.promtStatus=false 
        }
        editChildHandler(event){
            this.editShow=true
            this.editrecordId=event.target.name
console.log('edit',event.target.name)
        }


        editShow=false
        editrecordId
      
        objectApiName=MEDICAL_OBJECT
        fields={
            nomedicineField:NOMEDICINE,
            costField:COST
        }
        editSubmit(){
            this.editShow=false
        }
        handleReset(){
            const inputFields=this.template.querySelectorAll('lightning-input-field')
            if(inputFields){
                Array.from(inputFields).forEach(field=>{
                    field.reset()
                })
            
           }
            this.editShow=false
        }
    get sortByDirectionOptions(){
        return [{label:'ASC',value:'asc'},
    {label:'Desc',value:'desc'}]
    }
        get FilterByOptions(){
            return [
                {label:"All", value:'All'},
                {label:"Id", value:'Id'},
                {label:'Name', value:'Name'},
                {label:'Ex.Date', value:'Expiry_Date__c'}
            
            ]
        }

        get sortByOptions(){
            return [
                {label:"Id", value:'Id'},
                {label:'Name', value:'Name'},
                {label:'Ex.Date', value:'Expiry_Date__c'},
                {label:'Cost',value:'Cost__c'},
                {label:'Alloted',value:'Med_Left__c'},
                {label:'Medicine Left',value:'Medicine_Left__c'},
                {label:'Total',value:'Total__c'}
            
            ]
        }
        
        classError
        connectedCallback(){
            this.classError="slds-text-color_error"
       const userElements=this.template.querySelectorAll('.tablell')
       Array.from(userElements).forEach(item=>{
        console.log(item.innerText);
        item.setAttribute('title',item.innerText);
        item.style = 'background-color: Red;'
    })
           
     
           
        }

       
        tableMedNameHandler(event){
            console.log('Nameon',event.target.id)
            const NameVal=event.target.id
           const NameIn= NameVal.indexOf('-')
            const NameValL=NameVal.length
            console.log('Name',NameValL-NameIn)
            console.log('NammnL', NameValL)
            
            const NameValue=NameVal.slice(0,-(NameValL-NameIn)).toString()
            this.callApex(NameValue)
            this.template.querySelectorAll('.tableName').forEach(tableName =>
                tableName.addEventListener("click", () => tableName.classList.toggle("tabName"))
              )
        }
        tableRowSelector(event){
            console.log('jhj',event.target.id)
            const val=event.target.id
            this.ind=val.slice(0,-4).toString()
            console.log('jhjbnb',this.ind)
            this.template.querySelectorAll('.tableRow').forEach(tableRow =>
                tableRow.addEventListener("click", () => tableRow.classList.toggle("red"))
              )
        }
        ind
        tableMedLeft(event){
            console.log('jhj',event.target.id)
            const val=event.target.id
            this.ind=val.slice(0,-4).toString()
            console.log('jhjbnb',this.ind)
            this.template.querySelectorAll('.tableLeft').forEach(tableLeft =>{
        if(this.ind<=100){
            tableLeft.addEventListener("click", () => tableLeft.classList.toggle("more"))
        } else {
                tableLeft.addEventListener("click", () => tableLeft.classList.toggle("green"))}})
        }
    

        filterbyHandler(event){
            this.filterBy = event.target.value
            console.log('fill',event.target.value)
        }
    
        filterHandler(event){
            const {value} = event.target
            window.clearTimeout(this.timer)
            if(value){
                this.timer = window.setTimeout(()=>{
                    console.log(value)
                    this.filteredData = this.fullTableData.filter(eachObj=>{
                        if(this.filterBy === 'All'){
                            /**Below logic will filter each and every property of object */
                            return Object.keys(eachObj).some(key=>{
                                return eachObj[key].toLowerCase().includes(value)
                            })
                        } else {
                             /**Below logic will filter only selected fields */
                            const val = eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                            return val.toLowerCase().includes(value)
                        }
                    })
                }, 500)
                
            } else {
                this.filteredData = [...this.fullTableData]
            }
            
        }

        sortOrderHandler(event){
            this.sortDirection=event.target.value
        }
        sortHandler(event){
            this.sortedBy = event.target.value
            this.filteredData = [...this.sortBy(this.filteredData)]
        }
    
        sortBy(data){
            const cloneData = [...data]
            cloneData.sort((a,b)=>{
                if(a[this.sortedBy] === b[this.sortedBy]){
                    return 0
                }
                return this.sortDirection === 'desc' ? 
                a[this.sortedBy] > b[this.sortedBy] ? -1:1 :
                a[this.sortedBy] < b[this.sortedBy] ? -1:1
            })
            return cloneData
        }
promtStatus=false



       
        chartHeading='king'
        pieChartLabels=[]
        pieChartData=[]
        objOne=[]
        objTwo=[]
        @wire(getMedical)
        opportunityHandler({data, error}){
            if(data){
    this.objOne=data
    var res=[]
    // var  objTwo=['A','B','C','A','B','C','C']
      
      data.forEach(el=>{
          const index=res.findIndex(obj=>{
              return obj['Name']===el.Medicine_Name__c
           } );
          if(index===-1){
              res.push({
                
                  "Name":el.Medicine_Name__c,
                  "count":1
              })
          }
          else{
             res[index]["count"]++        
              
          }
      })
  
  console.log('bar',JSON.stringify( res))
  
     this.objThree = res.reduce((accumulator, object) => {
        return accumulator + object.count;
      }, 0);
    var  resOne=[]
    if(res.length){
    res.forEach(elm=>{
        const ind=resOne.findIndex(obj=>{
            return (obj['NameO']===elm.Name,obj['countO']===elm.count)
         } );
        if(ind>=-1){
            resOne.push({
              
                "NameO":elm.Name,
                "countO":elm.count,
                "percent":elm.count*100/this.objThree
            })
        }
       
    })
    console.log('setcart',JSON.stringify( resOne))}
   window.localStorage.setItem('setcart',JSON.stringify( resOne))
     this.objTwo=JSON.parse(window.localStorage.getItem('setcart') )
     this.progressStatus=true
                console.log('chartsDemo',data)
                const result = data.reduce((json, val)=>({...json, [val.Medicine_Name__c]:(json[val.Medicine_Name__c]|0)+1}), {})
                console.log('red',JSON.stringify(result))
                if(Object.keys(result).length){
                    this.pieChartLabels = Object.keys(result)
                    console.log('key',JSON.stringify(this.pieChartLabels ))
                    this.pieChartData = Object.values(result)
                    console.log('value',JSON.stringify(this.pieChartData))
                }
            
            }
            if(error){
                console.error(error)
            }
        }

      
        objThree
        
    progressStatus=true
    progressHandler(){
        this.progressStatus=false
    }
    proFocus
    get focus(){
        return this.proFocus
    }
    get showHide(){
return this.proFocus ? "slds-visible" :"slds-hidden"
    }
    progressFocus(event){
        console.log('focus',event.target.name)   
        this.template.querySelectorAll('.proGro').forEach(tableName =>
            tableName.addEventListener("click", () =>  tableName.classList.toggle('pro')))
            this.template.querySelectorAll('.proGro').forEach(tableName =>{
                if(event.target.id===tableName.id){
                    console.log('ta',tableName.id)
                    this.proFocus=event.target.name
                }
                })
    }
    @api recordid;

   @track columns = columns;
   @track data;
   @track fileName = '';
   @track UploadFile = 'Upload ';
   @track showLoadingSpinner = false;
   @track isTrue = false;
   selectedRecords;
   filesUploaded = [];
   file;
   fileContents;
   fileReader;
   content;
   MAX_FILE_SIZE = 1500000;

   handleFilesChange(event) {
       if(event.target.files.length > 0) {
           this.filesUploaded = event.target.files;
console.log('file',event.target.files)
           this.fileName = event.target.files[0].name;
       }
   }

   handleSave() {
       if(this.filesUploaded.length > 0) {
           this.uploadHelper();
       }
       else {
           this.fileName = 'Please select a CSV file to upload!!';
       }
   }

   uploadHelper() {
       this.file = this.filesUploaded[0];
      if (this.file.size > this.MAX_FILE_SIZE) {
           window.console.log('File Size is to long');
           return ;
       }
       this.showLoadingSpinner = true;
       this.fileReader= new FileReader();
       this.fileReader.onloadend = (() => {
           this.fileContents = this.fileReader.result;
           this.saveToFile();
       });
       this.fileReader.readAsText(this.file);
   }
 

   saveToFile() {
    console.log('csvUplod',JSON.stringify(this.fileContents))
    saveFileMed({ base64Data: JSON.stringify(this.fileContents), cdbId: this.recordid})

       .then(result => {
           window.console.log('result ====> ');
           window.console.log(result);
           this.data = result;
           this.fileName = this.fileName + ' - Uploaded Successfully';
           this.isTrue = false;
           this.showLoadingSpinner = false;
           this.dispatchEvent(
               new ShowToastEvent({
                   title: 'Success!!',
                   message: this.file.name + ' - Uploaded Successfully!!!',
                   variant: 'success',
               }),
           );
       })
       .catch(error => {
           window.console.log(error);
           this.dispatchEvent(
               new ShowToastEvent({
                   title: 'Error while uploading File',
                   message: error.message,
                   variant: 'error',
               }),
           );
       });
   }


   navigateToLwcLogin(){
    
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        attributes:{
            url:"https://gr2-dev-ed.develop.lightning.force.com/lightning/n/Apex_Hospital"
        }
    })             
}

 
}