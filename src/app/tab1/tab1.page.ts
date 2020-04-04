import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FormGroup, FormBuilder} from '@angular/forms';

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
 
  //currentDiseases: any = [];
  myForm: FormGroup;
  // Form state
  loading = false;
  success = false;
  //public diseases: Observable<any[]>;
  //public diseaseInfo: any[];

  public goalList: any[];
  public loadedGoalList: any[];
 

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router
  ) {    


   }
   ngOnInit() {
    
    //this.myForm.valueChanges.subscribe(console.log);
    //const collection: AngularFirestoreCollection<Item> = this.afs.collection('disease_info');
    //this.diseases = this.afs.collection('disease_info').valueChanges();
    this.afs.collection('disease_info').valueChanges().subscribe(goalList => { this.goalList = goalList; this.loadedGoalList = goalList;})
    //this.diseaseInfo = this.goalList
  }
 
  initializeItems(): void{
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
  }  
  

/*
  search(params?: any) {
    
    if (!params) {
      return this.diseases;
    }
    //convert 
    
    return this.diseaseInfo.filter((disease) => {
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

   // return this.diseases.map(diseases => diseases.filter(d => d.name === params ))
    
  }
  
 
   getDiseases(ev) {
     
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentDiseases = [];
      return;
    }
    this.currentDiseases = this.search({
      name: val
    });
    
  }*/
   
 
}

