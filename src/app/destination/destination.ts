import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    },
    {
      "name": "Albania",
    },
    {
      "name": "Algeria",
    },
    {
      "name": "Andorra",
    },
    {
      "name": "Angola",
    },
    {
      "name": "Zimbabwe",
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //public zone: NgZone,
    public geolocation: Geolocation
  ) {    
    
   }

   
  ngOnInit(): void {
    this.doGeo()
  }

  
  doGeo(){
  this.geolocation.getCurrentPosition().then((resp) => {
     console.log(resp.coords.latitude)
     console.log(resp.coords.longitude)
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

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    //this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menu.enable(true);
  } 

}

