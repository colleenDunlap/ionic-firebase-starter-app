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
 
  myForm: FormGroup;
  // Form state
  loading = false;
  success = false;

  public goalList: any[];
  public loadedGoalList: any[];
 

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router
  ) {    


   }
   ngOnInit() {
    this.afs.collection('disease_info').valueChanges().subscribe(goalList => { this.goalList = goalList; this.loadedGoalList = goalList;})
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
   
 
}

