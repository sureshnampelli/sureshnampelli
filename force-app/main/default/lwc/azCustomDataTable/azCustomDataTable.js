import LightningDataTable from 'lightning/datatable';
import customLinkTemplate from "./azCustomDataTable.html"
export default class AzCustomDataTable extends LightningDataTable {
   
    static customTypes={ customLink:{
        template:customLinkTemplate,
        standardCellLayout: false,
        typeAttributes:["toogleLink","toogleEmail","toogleImage","tooglePhone"]
    },}
   
}