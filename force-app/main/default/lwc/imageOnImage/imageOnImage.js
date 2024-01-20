import { LightningElement ,wire} from 'lwc';
import herocompressed from '@salesforce/resourceUrl/herocompressed';
import apexLow from '@salesforce/resourceUrl/apexBottom';
import apexMain from '@salesforce/resourceUrl/apexMainOne';
import loginRecords from '@salesforce/apex/LoginApex.loginRecords';
import createBobject from '@salesforce/apex/HospitalAllotedMedicineController.createBobject';
export default class ImageOnImage extends LightningElement {
    apexmain=apexMain
    apexlow=apexLow
creH(){
    const aaa={
        Name:'Game Over',
        A__c:'a0N5j000007UII5EAO'
    }
    createBobject({createB:aaa}).then(result=>{
        console.log('gameOver')
    })
}
    loginRecordsData
    @wire(loginRecords)
    wiredLoginRecords(result){
        this.loginRecordsData=result
        if(result.error){
            console.error(error)
        }
    }
    randomcards
    connectedCallback(){
    
            setInterval(()=> {
                this.renCallback()  
            }, 3000);}
            renCallback(){
                this.num = Math.floor(Math.random()*this.loginRecordsData.data.length); // get a random number between 0-9
           
            for(let i=0; i<=this.loginRecordsData.data.length;i++){
                if(this.loginRecordsData.data[i]==this.loginRecordsData.data[this.num]){
                  this.randomcards=this.loginRecordsData.data[i].Picture_Url_c__c
                }
            } 
            }
}