import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FormGroup, FormBuilder} from '@angular/forms';
import*as diseasesJson from '../../../src//diseases.json';

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
 
  myForm: FormGroup;
  // Form state
  loading = false;
  success = false;

  public diseases = diseasesJson;
  public filteredDiseases = [];
 

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {    


   }
  ngOnInit(): void {
    console.log(diseasesJson);
  }
 
  query(params?: any) {
    if (!params) {
      return this.diseases;
    }

    return this.diseases.filter((country) => {
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
      this.filteredDiseases = [];
      return;
    }
    this.filteredDiseases = this.query({
      name: val
    });
  }



  /*initializeItems(): void{
    this.goalList = this.loadedGoalList;
  }


  filterList(evt){
    this.initializeItems();

    const searchTerm = evt.srcElement.value;
    console.log(searchTerm);//debugging
    if(!searchTerm){
      return this.goalList;
    }
    
    this.goalList = this.goalList.filter(currentGoal =>{
      if(currentGoal.name && searchTerm){
        if(currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase())> -1)
        {
          console.log(this.goalList);
          return true;
          
        }
        return false;
      }
      
    })
  } */ 
   
 
}

