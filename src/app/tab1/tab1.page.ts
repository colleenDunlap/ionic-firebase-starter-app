import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
 
  currentDiseases: any = [];

  diseases = [
    {
      "name": "Disease",
      "symptoms": "fever",
      "preventative":"avoid drinking untreated water"
    },
    {
      "name": "Disease2",
      "symptoms": "fever",
      "preventative":"avoid drinking untreated water"
    },
    {
      "name": "Disease3",
      "symptoms": "fever",
      "preventative":"avoid drinking untreated water"
    }
  ];

 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {    


   }

 

  query(params?: any) {
    if (!params) {
      return this.diseases;
    }
 
    return this.diseases.filter((disease) => {
      for (let key in params) {
        let field = disease[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return disease;
        } else if (field == params[key]) {
          return disease;
        }
      }
      return null;
    });
  }
   getDiseases(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentDiseases = [];
      return;
    }
    this.currentDiseases = this.query({
      name: val
    });
  }
 
  // add this in to expand on diseases later
  openDisease(ev) {
    /*
    this.navCtrl.push('DiseaseDetailPage', {
      disease: disease
    });
    */
  }
  
  
 
}

