import { LightningElement } from 'lwc';
import signInTem from './signInTemplate.html';
import signUpTem from './signUpTemplate.html';
import defaultTemplate from './renderMultipleDemo.html';
export default class RenderMultipleDemo extends LightningElement {
selected=null;

    render(){
  return this.selected=== 'Sign In' ? signInTem : this.selected=== 'Sign Up' ? signUpTem : defaultTemplate ;
    }
    handleClick(event){
        this.selected=event.target.label;

        
    }
    handleDemo(event){
        if(event.target.label=== 'Sign In'){
            console.log('Sign In sucessfully');
        }else if(event.target.label=== 'Sign Up '){
            console.log('sign Up');
        }else{
            
        }
    }
}