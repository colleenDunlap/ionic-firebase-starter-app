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

  currentCountries: any = [];
  countries = [
    {
      "name": "Afghanistan",
      "flag": "assets\\png250px\\af.png"
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
      "flag": "assets\\png250px\\zw.png"
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
  this.geolocation.getCurrentPosition().then((resp) => {
     console.log(resp.coords.latitude)
     console.log(resp.coords.longitude)
     let options: NativeGeocoderOptions = {
       useLocale: true,
       maxResults: 5
     }
     this.geocoder.reverseGeocode(resp.coords.latitude,resp.coords.longitude, options)
     .then(
       (result:NativeGeocoderResult[])=> document.querySelector('#currentUserLocation').innerHTML = result[0].countryName
     )
     .catch((error:any)=> console.log(error));
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
   });
  }

  startApp() {
    //this.doGeo();
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

  geolocate(){
    /*
    let options = {enableHighAccuracy:true};
    this.geolocation.getCurrentPosition(options).then((
      position:Geoposition) => {
          this.getCurrentCountry(position, options);  
        }).catch((err) =>{
            alert(err);
       })
       */
  }

 /* getCurrentCountry(pos, options){
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude, options).then((res: NativeGeocoderResult[]) =>console.log(JSON.stringify(res[0])))
    .catch((error: any) => console.log(error));
    
  }*/


  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    //this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menu.enable(true);
  } 

}

