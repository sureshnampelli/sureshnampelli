import LightningDataTable from 'lightning/datatable';
import customNameTemplate from "./customName.html"
import customImageTemplate from "./customImage.html"
import customRankTemplate from "./customRank.html"
import customLinkTemplate from "./customLink.html"
import customPickListTemplate from "./customPickList.html"
import customPickListEditTemplate from "./customPickListEdit.html"
import customMultiPickListTemplate from "./customMultiPickList.html"
import customMultiPickListEditTemplate from "./customMultiPickListEdit.html"
export default class CustomStyleDataType extends LightningDataTable {
    
    static customTypes={
        customName:{
            template:customNameTemplate,
            standardCellLayout: false,
            typeAttributes:["statusPro"]
        },
        customRank:{
            template:customRankTemplate,
            standardCellLayout: false,
            typeAttributes:["rankIcon"]
        },
        customPicture:{
            template:customImageTemplate,
            standardCellLayout:true,
            typeAttributes:["pictureUrl"]
        },
        customLink:{
            template:customLinkTemplate,
            standardCellLayout: false,
            typeAttributes:["toogleLink","toogleIcon"]
        },
        customPicklist:{
            template:customPickListTemplate,
            editTemplate:customPickListEditTemplate,
            standardCellLayout: true,
            typeAttributes:["options","value","context"]
        },
        customMultiPicklist:{
            template:customMultiPickListTemplate,
            editTemplate:customMultiPickListEditTemplate,
            standardCellLayout: true,
            typeAttributes:["options","value","context"]
        },
    }
}