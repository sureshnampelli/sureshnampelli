import { LightningElement } from 'lwc';

export default class CurrentLocation extends LightningElement {
    lstMarkers = [];
    zoomlevel = "1";
 
latOne
longOne
DistanceBetween
    handleClick(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                // Get the Latitude and Longitude from Geolocation API
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                const lon1 = longitude*Math.PI / 180;
                const lon2 = 79.611360*Math.PI / 180;
                const lat1 =latitude*Math.PI / 180;
                const lat2 =17.974510*Math.PI / 180;
               console.log(lat1,lat2,lon1,lon2)
               // Haversine formula 
               var dlon = lon2-lon1; 
               var dlat = lat2-lat1;
               console.log(dlat,dlon)
               var a = Math.pow(Math.sin(dlat / 2), 2)
                   + Math.cos(lat1) * Math.cos(lat2)
                   * Math.pow(Math.sin(dlon / 2),2);
                 console.log(a)
               var c = 2 * Math.asin(Math.sqrt(a));
               console.log('c',c)
               // Radius of earth in kilometers. Use 3956 
               // for miles
               var r = 6371;
               
               // calculate the result
               this.DistanceBetween=c*r;
                this.latOne=latitude
                this.longOne=longitude
                console.log('logoo',latitude,longitude)
                // Add Latitude and Longitude to the markers list.
                this.lstMarkers = [{
                    location : {
                        Latitude: latitude,
                        Longitude : longitude
                    },
                    
                    title : 'You are here'
                }];
                this.zoomlevel = "4";
                console.log('mapa', JSON.stringify(this.lstMarkers))
            });
    console.log('maparr', JSON.stringify(this.lstMarkers))
        }
    

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
console.log(this.lstMarkers[0].location.Longitude)

}

latiMain=''
longMain=''
lstMarkersOne=[]

handleClickOne(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

        // Get the Latitude and Longitude from Geolocation API
           var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
           
            console.log('logoo',latitude,longitude)
            // Add Latitude and Longitude to the markers list.
            const lon1 = longitude*Math.PI / 180;
            const lon2 = 79.611360*Math.PI / 180;
            const lat1 =latitude*Math.PI / 180;
            const lat2 =17.974510*Math.PI / 180;
           console.log(lat1,lat2,lon1,lon2)
           // Haversine formula 
           var dlon = lon2-lon1; 
           var dlat = lat2-lat1;
           console.log(dlat,dlon)
           var a = Math.pow(Math.sin(dlat / 2), 2)
               + Math.cos(lat1) * Math.cos(lat2)
               * Math.pow(Math.sin(dlon / 2),2);
             console.log(a)
           var c = 2 * Math.asin(Math.sqrt(a));
           console.log('c',c)
           // Radius of earth in kilometers. Use 3956 
           // for miles
           var r = 6371;
           
           // calculate the result
           this.DistanceBetween=c*r;

                    this.lstMarkersOne.push({"location":{"Latitude":17.974510,"Longitude":79.611360},"title":"You are here"},{"location":{"Latitude":latitude,"Longitude":longitude},"title":"Apex Hospital"})
            console.log('arr',JSON.stringify(this.lstMarkersOne))
        window.localStorage.setItem('local',JSON.stringify(this.lstMarkersOne))
        this.lstMarkersOne=JSON.parse(window.localStorage.getItem('local'));
            this.zoomlevel = "4";
        });

    }


// The math module contains a function
// named toRadians which converts from
// degrees to radians.


}
    }
