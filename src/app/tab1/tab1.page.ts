import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

interface Item{
  name: "Disease",
  symptoms: "fever",
  prevention:"avoid drinking untreated water"
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
 
  currentDiseases: any = [];
  myForm: FormGroup;
  // Form state
  loading = false;
  success = false;
  public diseases: Observable<any[]>;
 // public diseases = [];

  /*diseases = [
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
*/
  
 

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router
  ) {    


   }
   ngOnInit() {
    
    //this.myForm.valueChanges.subscribe(console.log);
    const collection: AngularFirestoreCollection<Item> = this.afs.collection('disease_info');
    this.diseases = this.afs.collection('disease_info').valueChanges();
  }
 

  query(params?: any) {
    /*
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
    */
  }
  
 
   getDiseases(ev) {
     /*
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentDiseases = [];
      return;
    }
    this.currentDiseases = this.query({
      name: val
    });
    */
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

