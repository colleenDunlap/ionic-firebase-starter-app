import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.html',
  styleUrls: ['./destination.scss'],
})
export class Destination{

  currentCountries: any = [];
  countries = [
    {
      "name": "Afghanistan",
      "price": "$1"
    },
    {
      "name": "Albania",
      "price": "$1"
    },
    {
      "name": "Algeria",
      "price": "$1"
    },
    {
      "name": "Andorra",
      "price": "$1"
    },
    {
      "name": "Angola",
      "price": "$1"
    },
    {
      "name": "Zimbabwe",
      "price": "$1"
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {    

    
   }

  startApp() {
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

