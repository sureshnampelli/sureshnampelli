import LightningDataTable from 'lightning/datatable'
import customNameTemplate from "./customHtrName.html"
import customImageTemplate from "./customHtrImage.html"
import customRankTemplate from "./customHtrRank.html"
import customLinkTemplate from "./customHtrLink.html"
export default class CustomStyleHtr extends LightningDataTable {
    static customTypes={
        customHtrName:{
            template:customNameTemplate,
            standardCellLayout: false,
            typeAttributes:["statusPro"]
        },
        customHtrRank:{
            template:customRankTemplate,
            standardCellLayout: false,
            typeAttributes:["rankIcon"]
        },
        customHtrPicture:{
            template:customImageTemplate,
            standardCellLayout:true,
            typeAttributes:["pictureUrl"]
        },
        customHtrLink:{
            template:customLinkTemplate,
            standardCellLayout: false,
            typeAttributes:["toogleLink","toogleIcon"]
        },
    }
}