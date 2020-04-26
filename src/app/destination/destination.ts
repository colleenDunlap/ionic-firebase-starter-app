import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import{ NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.html',
  styleUrls: ['./destination.scss'],
})
export class Destination implements OnInit{
  latuser
  longuser
  currentCountries: any = [];
  countries = [
    {
      "name": "Afghanistan",
      "flag": "assets\\png250px\\af.png",
      "lat": 33.9,
      "long": 67.7
    },
    {
      "name": "Albania",
      "flag": "assets\\png250px\\al.png"
    },
    {
      "name": "Algeria",
      "flag": "assets\\png250px\\ag.png"
    },
    {
      "name": "Andorra",
      "flag": "assets\\png250px\\an.png"
    },
    {
      "name": "Angola",
      "flag": "assets\\png250px\\ao.png"
    },
    {
      "name": "Zimbabwe",
      "flag": "assets\\png250px\\zw.png",
      "lat": -19.0,
      "long": 29.2
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //public zone: NgZone,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController
  ) {    
    
   }

   
  ngOnInit(): void {
  
    this.doGeo()
  }

  
  doGeo(){
    
   return  this.geolocation.getCurrentPosition().then((resp) => {
    localStorage.setItem("lat", JSON.stringify(resp.coords.latitude));
    localStorage.setItem("long", JSON.stringify(resp.coords.longitude));
   });
  }
  useCurrentLocation(ev){
    localStorage.setItem("useCurrentLocationFlag", JSON.stringify(1))
    this.router.navigateByUrl('/app/tabs/tab1');
  }
  startApp(ev) {
    //this.doGeo();
    localStorage.setItem("useCurrentLocationFlag", JSON.stringify(0))
    console.log(ev)
    console.log(ev.target)
    console.log(ev.target.data);
    let countryName = ev.target.data
    let iCountry = 0
    console.log(this.countries.length)
    if(ev.toElement.localName == "img"){
      console.log("Image was clicked")
      console.log(ev.target.currentSrc.length)
      let pathLength = ev.target.currentSrc.length
      let countryImgPath = ev.target.currentSrc.substr(pathLength-6, pathLength)
      console.log(countryImgPath)
      while (iCountry<this.countries.length){
        let jsonCountryLength = this.countries[iCountry].flag.length
        if(this.countries[iCountry].flag.substr(jsonCountryLength-6, jsonCountryLength)==countryImgPath){
          console.log(this.countries[iCountry].lat)
          console.log(this.countries[iCountry].long)
          localStorage.setItem("currCountryLat", JSON.stringify(this.countries[iCountry].lat));
          localStorage.setItem("currCountryLong", JSON.stringify(this.countries[iCountry].long));
        }
        iCountry++
      }
      

    }
    else{
      console.log("Text was clicked")
      while (iCountry<this.countries.length){
        if(this.countries[iCountry].name==ev.target.textContent){
          console.log(this.countries[iCountry].lat)
          console.log(this.countries[iCountry].long)
          localStorage.setItem("currCountryLat", JSON.stringify(this.countries[iCountry].lat));
          localStorage.setItem("currCountryLong", JSON.stringify(this.countries[iCountry].long));
        }
        iCountry++
      }
  }

    this.router.navigateByUrl('/app/tabs/tab1');
  }

  query(params?: any) {
    if (!params) {
      return this.countries;
    }

    return this.countries.filter((country) => {
      for (let key in params) {
        let field = country[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return country;
        } else if (field == params[key]) {
          return country;
        }
      }
      return null;
    });
  }


  /* query for all countries that match the search*/
  getCountries(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentCountries = [];
      return;
    }
    this.currentCountries = this.query({
      name: val
    });
  }

 

  

}

