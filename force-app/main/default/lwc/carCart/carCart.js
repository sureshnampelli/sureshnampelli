import { LightningElement ,wire} from 'lwc';
import getCars from '@salesforce/apex/CarCartController.getCars';
import getBirds from '@salesforce/apex/CarCartController.getBird';
export default class CarCart extends LightningElement {
    cars
    error
@wire(getCars)
carsHandler({data,error}){
    if(data){
        console.log('cars',data)
        this.cars=data
        
    }
    if(error){
        console.error(error)
        this.error=error
    }
}

birds
bird
@wire(getBirds)
birdsHandler({data,error}){
    if(data){
        console.log('cars',data)
        this.birds=data
        console.log('b',data[3].Picture_Url__c)
        this.bird=data[1].Picture_Url__c
        
    }
    if(error){
        console.error(error)
    
    }
}


objTwo=[]
 objOne=[]

showCartHandler(event){
    //event.preventDefault();
    const CarName=event.target.name.Name
    const Image=event.target.name.Picture_Url__c
    const Cost=event.target.name.MSRP__c

   this.objOne.push({"car":CarName,"img":Image,"cost":Cost})
 console.log('nnn',JSON.stringify(this.objOne))
      
    var res=[]
      // var  objTwo=['A','B','C','A','B','C','C']
        
        this.objOne.forEach(el=>{
            const index=res.findIndex(obj=>{
                return (obj['car']===el.car,obj['img']===el.img,obj['cost']===el.cost)
            }); 
            if(index===-1){
                res.push({
                    "img":el.img,
                    "car":el.car,
                    "cost":el.cost,
                    "Total":el.cost,
                    "count":1
                })
            }
            else{
                res[index]["Total"]+=el.cost,
               res[index]["count"]++        
                
            }
        })
    
    
    
     window.localStorage.setItem('setcart',JSON.stringify( res))
       this.objTwo=JSON.parse(window.localStorage.getItem('setcart') )
      
    
       console.log('indw',JSON.stringify(this.objTwo))

}
showCart=false
goCartHandler(){

this.showCart=true
}
hideCartHandler(){
    this.showCart=false
}

outCartchildHandler(event){
    event.preventDefault();

    const removeName=event.detail.msgName
   console.log('outCartchild',event.detail.msgName)
   

   this.objTwo.filter(re=>{
    console.log('rmechild',re.car)
    if(re.car===event.detail.msgName){
        console.log('re',removeName)
        
      if(re.count-->=0){  
        re.Total-=re.cost;     
        this.objOne.filter(r=>{
            console.log('obj2',JSON.stringify(r.car))
            if(re.car===r.car){
               
                const ind=this.objOne.indexOf(r.car)
                this.objOne.splice(ind,1)
                console.log('obj3',JSON.stringify(this.objOne))
            }
        })
      }
        if(re.count===0){
            console.log('out')
            var inde = this.objTwo.findIndex(ele=>{
                return ele.car===removeName;
             })
             if(inde!==-1){
                this.objTwo.splice(inde, 1)
             }
            
                var indO = this.objOne.findIndex(element=>{
                    return element.car===removeName;
                 })
                 if(indO!==-1){
                    this.objOne.splice(indO, 1)
                 }
            
          
        }
    }
   })


 
 window.localStorage.setItem('setcart',JSON.stringify(this.objTwo))
this.objTwo=JSON.parse(window.localStorage.getItem('setcart') )
}


}

