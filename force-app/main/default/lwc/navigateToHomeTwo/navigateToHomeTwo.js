import { LightningElement ,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {CurrentPageReference} from 'lightning/navigation'
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
export default class NavigateToHomeTwo extends NavigationMixin(LightningElement) {
    recordEditMode(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0035j00001DEsdSAAT',
                objectApiName:'Contact',
                actionName:'edit'
            }
        })
    }
    
    navigateToTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
               apiName:'Styling_in_LWC'
            }
        })
    }
    navigateToRelatedList(){
        this[NavigationMixin.Navigate]({
        type:'standard__recordRelationshipPage',
        attributes:{
            recordId:'0015j00001CKiUsAAL',
            objectApiName:'Account',
            relationshipApiName:'Contacts',
            actionName:'view'
        }
    })
    }
    
    navigateToWeb(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:"https://www.salesforcetroop.com"
            }
        })
    }

    clicknavigateToLwc(){
        this.navigateToLwc() 
     }

    navigateToLwc(){
        var defination={
            componentDef:'c:loginFormDemo'

        }
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(defination))
            }
        })
    }
    navigateToVFPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/apex/postalBranchPage'
            }
        }).then(generatedUrl=>{
            console.log(generatedUrl)
            window.open(generatedUrl)
        })
    }
@wire(CurrentPageReference)
pageRef
get pageReference(){
    return this.pageRef ? JSON.stringify(this.pageRef , null , 2) : ''
}
}