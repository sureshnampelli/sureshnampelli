import { LightningElement,wire,track } from 'lwc';
import getPatientEnquiry from '@salesforce/apex/HospitalApexFour.getPatientEnquiry';
import getDoctorsLogin from '@salesforce/apex/HospitalApexFour.getDoctorsLogin';
import deleteHospitalDoctor from '@salesforce/apex/HospitalApexFive.deleteHospitalDoctor';
import getPatientAppointment from '@salesforce/apex/HospitalApexFive.getPatientAppointment';
import allotedMedcine from '@salesforce/apex/HospitalAllotedMedicineController.allotedMedcine';
import getMedicineTotalDaily from '@salesforce/apex/HospitalAllotedMedicineController.getMedicineTotalDaily';
import createDoctorRecord from '@salesforce/apex/HospitalApexFive.createDoctorRecord';
import updateAllotedMedicine from '@salesforce/apex/HospitalAllotedMedicineController.updateAllotedMedicine';
import createAllotedMedicine from '@salesforce/apex/HospitalAllotedMedicineController.createAllotedMedicine';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  
import { RefreshEvent } from 'lightning/refresh';
import { refreshApex } from '@salesforce/apex';
import DoctorAppointmentLogo from '@salesforce/resourceUrl/DoctorAppointmentLogo'
import DoctorOneGif from '@salesforce/resourceUrl/DoctorOneGif'
import PatientLoginRemovebg from '@salesforce/resourceUrl/PatientLoginRemovebg';
import AppointmentHistoryRemovebg from '@salesforce/resourceUrl/AppointmentHistoryRemovebg'
import doctorPostionLogo from '@salesforce/resourceUrl/doctorPostionLogo'
import hospitalremovebg from '@salesforce/resourceUrl/hospitalLogoWatermark'
import medicineLogoRemovebg from '@salesforce/resourceUrl/medicineLogoRemovebg'
//Id,Name,Fee__c,Doctor_Type__c,Image__c,Patient_Name__c FROM Hospital_Doctor__c
//docDelete
//Name,Ex_Date__c,Cost__c,Each_Medicine_Cost__c,Amount__c,No_Of_Medicine__c FROM Hospital_Daily_Medicine__c
//Id,Name,Ex_Date__c,Cost__c,AMOUNT__c,Alloted_Medicine__c,Each_Med_Cost__c,Medicine_Left__c,Total__c
const actions = [ 
    { label: 'Create', name: 'create' },  
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
 ];
 const columns= [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Cost', fieldName: 'Cost__c' },
    { label: 'Ex Date', fieldName: 'Ex_Date__c' },
    { label: 'Alloted', fieldName: 'Alloted_Medicine__c' },
    { label: 'Med Left', fieldName: 'Medicine_Left__c' },
    { label: 'Total', fieldName: 'AMOUNT__c' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
 ];
export default class HospitalAdminNavigation extends LightningElement {
    columnsAllot=columns
    PatientLoginRemovebg=PatientLoginRemovebg
    doctorappointmentlogo=DoctorAppointmentLogo 
    AppointmentHistoryRemovebg=AppointmentHistoryRemovebg
    doctorPostionLogo=doctorPostionLogo
    hospitalremovebg=hospitalremovebg
    medicineLogoRemovebg=medicineLogoRemovebg
    doctorgif=DoctorOneGif
    isOpenModal=false
    @track isEdit=false;
    @track columns = columns;
    @track isEditAllot=false
    patientDataShow=false
    doctorsDataShow=false
    appointmentDataShow=false
    allotedMedShow=false
    recordId
    newDoctorName
    newDoctorFee
    newDoctorType
    newDoctorPassword
    showAddForm=false
    imgHide=true
    isAllotHide=false
    isDailyHide=true
    isCreateAllot=false
    dailyMedicineData=[]
    patientEnquiryData=[]
    
    patientDataHandler(){
        this.template.querySelector(".patientbtn").classList.toggle("myAppHistory")
        if( this.patientDataShow===false){
            this.patientDataShow=true 
            this.imgHide=false 
        }else{
this.patientDataShow=false
this.imgHide=true}
    }
    doctorDataHandler(){
        this.template.querySelector(".doctorbtn").classList.toggle("myAppHistory")
        if(this.doctorsDataShow===false ){
            this.doctorsDataShow=true
            this.imgHide=false 
        }else{
            this.doctorsDataShow=false
            this.imgHide=true
        }
    }
    appointmentDataHandler(){
        this.template.querySelector(".apphistorybtn").classList.toggle("myAppHistory")
        if( this.appointmentDataShow===false){
            this.appointmentDataShow=true
            this.imgHide=false 
        }else{
            this.appointmentDataShow=false
            this.imgHide=true
        }
    }
    createDoctorRecordHandler(){
        this.template.querySelector(".createDocbtn").classList.toggle("myAppHistory")
        if( this.showAddForm===false){
            this.showAddForm=true
            this.imgHide=false 
        }
        else{
            this.showAddForm=false
            this.imgHide=true
        }
    }

    medicineDataAllotHandler(){
        this.template.querySelector(".medicinebtn").classList.toggle("myAppHistory")
        if(this.allotedMedShow===false ){
            this.allotedMedShow=true
            
            this.imgHide=false 
        }else{
            this.allotedMedShow=false
            this.imgHide=true
        }
    }

    gogoogo='Success'

    dailyMedtoogle(){
        if(this.gogoogo==='Success'){
            this.gogoogo='error'
            this.isAllotHide=true

        }else{
            this.gogoogo='Success'  
            this.isAllotHide=false
        }
       
    }
    //Name,Fee__c,Doctor_Type__c,Image__c,Patient_Name__c
    handleNameChange(event){
this.newDoctorName =event.target.value
    }
    handleFeeChange(event){
        this.newDoctorFee=event.target.value
    }
    handleTypeChange(event){
       this.newDoctorType =event.target.value
    }
    handlePasswordChange(event){
        this.newDoctorPassword=event.target.value
    }
    saveNewDoctor() {
        const newDoctor = {
            Name: this.newDoctorName ,
            Fee__c: this.newDoctorFee,
            Doctor_Type__c:this.newDoctorType ,
            Patient_Name__c:this.newDoctorPassword ,
        };

        createDoctorRecord({ doctorData: newDoctor })
            .then(result => {
                const event = new ShowToastEvent({
                        title: 'Success',
                        message: 'Doctor Record inserted successfully',
                        variant: 'success'
                    });
                    this.dispatchEvent(event);
                    refreshApex( this.doctorsData)
                // Account created successfully
                // You can update the accountOptions and accountRecords here
             this.showAddForm = false;
            })
            .catch(error => {
                // Handle error
            });
    }
    cancelAddForm(){
        this.showAddForm = false;
    }
   
    oppPieconfig;
    @wire(getMedicineTotalDaily)
    wiredDailyMedicine({data,error}){
if(data){
console.log('daily med',data)
this.dailyMedicineData=data
console.log('chartsDemo',data)
const result = data.reduce((json, val)=>({...json, [val.Name]:(json[val.Name]|0)+1}), {})
console.log('red',JSON.stringify(result))
if(Object.keys(result).length){
    const pieChartLabels = Object.keys(result)
    console.log('key',JSON.stringify(pieChartLabels ))
    const pieChartData = Object.values(result)
    console.log('value',JSON.stringify(pieChartData))

this.oppPieconfig = {
    type: "pie",
    data: {
        labels: pieChartLabels,
        datasets: [{
            label: "Medicine Name",
            data: pieChartData,
            backgroundColor:  [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(30, 204, 148, 0.8)',
                'rgba(130, 204, 148, 0.8)'
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(30, 204, 148, 0.8)',
                'rgba(130, 204, 148, 0.8)'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },}
};
}if(error){
    console.error(error)
}
    }

@wire(getPatientEnquiry)
wiredPatientEnquiry({data,error}){
    if(data){
        console.log('enquiry',data)
this.patientEnquiryData=data
    }
    if(error){
        console.error(error)
    }
}
doctorsData=[]
@wire(getDoctorsLogin)
wiredDoctor(result){
    this.doctorsData=result
   
    if(result.error){
        console.log(result.error)
    }
}
patientAppointmentData=[]
@wire(getPatientAppointment)
wiredPatientAppointment({data,error}){
    if(data){
        console.log('patient Appointment',data)
this.patientAppointmentData =data
    }
    if(error){
        console.error(error)
    }
}
hanldeEdit(event)
{        
    this.isEdit=true
    this.recordId = event.currentTarget.dataset.id;
    console.log('Edit', this.recordId);        
}

handleDelete(event){        
    this.recordId = event.currentTarget.dataset.id;
    console.log('Delete', this.recordId);        
    this.delDoctor(this.recordId);  
      
}
delDoctor(currentRow) {    
    deleteHospitalDoctor({docDelete: currentRow }).then(result => {
        window.console.log('result^^' + result);
      //  this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: currentRow.Name + ' Attachment deleted.',
            variant: 'success'
        })); 
        refreshApex( this.doctorsData)           
    }).catch(error => {
        window.console.log('Error ====> ' + error);
       // this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!',
            message: JSON.stringify(error),
            variant: 'error'
        }));            
    });    
}
totalAllotedMedicine
@wire(allotedMedcine)
wiredAllotedMedicine(result){
this.totalAllotedMedicine=result
if(result.error){
    console.log(result.error)
}
}
allotedId
handleRowActions(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    this.allotedId = row.Id;
    switch (actionName) {  
        case 'create':          
      this.isCreateAllot=true
        break;      
        case 'edit':          
        this.isEditAllot=true
            break;
        case 'delete':
          //  this.delRep(row);
            break;
    }
}  
hideModalAllot(){
    this.isEditAllot=false
}
inputAllotName
inputAllotCost
inputAllotExDate
inputAllotAmount
inputAllotMedLeft
inputAllotedMedicine
editNameChangeHandler(event){
this.inputAllotName= event.target.value
}

editExDateChangeHandler(event){
 this.inputAllotExDate=   event.target.value
    }
editCostChangeHandler(event){
this.inputAllotCost=    event.target.value
    }
editAllotedChangeHandler(event){
  this.inputAllotedMedicine=  event.target.value
    }
editMedLeftChangeHandler(event){
   this.inputAllotMedLeft= event.target.value
    }
editAmountChangeHandler(event){
  this.inputAllotAmount=  event.target.value
    }

updateAllotedMedicineHandler(){
    //Id,Name,Ex_Date__c,Cost__c,AMOUNT__c,Alloted_Medicine__c,Each_Med_Cost__c,Medicine_Left__c,Total__c
    const allot={
        Id: this.allotedId,
        Name:this.inputAllotName,
        Ex_Date__c: this.inputAllotExDate,
        Cost__c: this.inputAllotCost,
        Alloted_Medicine__c: this.inputAllotedMedicine,
        Medicine_Left__c: this.inputAllotMedLeft,
        AMOUNT__c: this.inputAllotAmount
    }
    updateAllotedMedicine({allotMedicine:allot}).then(result => {
        window.console.log('result^^' + result);
      //  this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message:  'Medicine  Allot Updated.',
            variant: 'success'
        })); 
        refreshApex(this.totalAllotedMedicine)           
    }).catch(error => {
        window.console.log('Error ====> ' + error);
       // this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!',
            message: JSON.stringify(error),
            variant: 'error'
        }));            
    });    
}
createAllotedMedicineHandler(){
    const creAllot={
        Name:this.inputAllotName,
        Ex_Date__c: this.inputAllotExDate,
        Cost__c: this.inputAllotCost,
        Alloted_Medicine__c: this.inputAllotedMedicine
    }
    createAllotedMedicine({createMedicine:creAllot}).then(result => {
        window.console.log('result^^' + result);
        console.log('creAllot',result)
      //  this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message:  'Medicine  Allot Updated.',
            variant: 'success'
        })); 
        refreshApex(this.totalAllotedMedicine)           
    }).catch(error => {
        window.console.log('Error ====> ' + error);
       // this.showLoadingSpinner = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!',
            message: JSON.stringify(error),
            variant: 'error'
        }));            
    });    
}
hideCreateModel(){
    this.isCreateAllot=false
}
/*handleSubmit(event){
    //alert('Client ID  ' + this.clientId);
    console.log('onsubmit event recordEditForm'+ event.detail.fields);
    console.log('file chk>>',this.isFileAttached);
    if (this.isEdit == true){
        this.UpdateDetails = true;            
    }
    else{
        this.UpdateDetails = false;                  
    }

    if(!(this.isEdit)){     
        this.dispatchEvent(  
            new ShowToastEvent({
            title: 'Error',
            variant: 'error',  
            message: 'Attachment is mandatory',  
            }),  
        );
    }else{
        //call fileattachfunc
        event.preventDefault();
        const fields=event.detail.fields;
        fields.Added_By__c=this.clientId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);            
    }        
    this.isOpenModal=false;      
    this.isEdit=false;
}  */  
hideModalBox(){
    this.isEdit= false
    this.isOpenModal=false;      
}
}
