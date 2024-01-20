import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
export default class NavigateToHome extends NavigationMixin(LightningElement) {
NavigateToHome(){
    this[NavigationMixin.Navigate]({
        type:'standard__namedPage',
        attributes:{
            pageName:'home'
        }
    })
}

NavigateToChatterPage(){
    this[NavigationMixin.Navigate]({
        type:'standard__namedPage',
        attributes:{
            pageName:'chatter'
        }
    })   
}
navigateToNewRecord(){
    this[NavigationMixin.Navigate]({
        type:'standard__objectPage',
        attributes:{
            objectApiName:'Login__c',
            actionName:'new'
        }
    })      
}
navigateToNewRecordWithDefault(){
    const defaultValue=encodeDefaultFieldValues({
        FirstName:'Zero',
        LastName:'Hero',
        LeadSource:'other'
    })
    this[NavigationMixin.Navigate]({
        type:'standard__objectPage',
        attributes:{
            objectApiName:'Contact',
            actionName:'new'
        },
        state:{
            defaultFieldValues:defaultValue
        }
    })  

}
navigateToListView(){
    this[NavigationMixin.Navigate]({
        type:'standard__objectPage',
        attributes:{
            objectApiName:'Contact',
            actionName:'list'
        },
        state:{
          filterName:'Recent'
        }
    })    
}
navigateToFiles(){
    this[NavigationMixin.Navigate]({
        type:'standard__objectPage',
        attributes:{
            objectApiName:'ContentDocument',
            actionName:'home'
        }
    })   
}
recordViewMode(){
    this[NavigationMixin.Navigate]({
        type:'standard__recordPage',
        attributes:{
            recordId:'003N000001laB1ZIAU',
            objectApiName:'Contact',
            actionName:'view'
        }
    })
}

}