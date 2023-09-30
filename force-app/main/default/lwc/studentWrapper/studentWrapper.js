import { LightningElement ,wire ,track,api} from 'lwc';
import students from '@salesforce/apex/StudentList.students';
export default class StudentWrapper extends LightningElement {

@wire(students) stud;

}