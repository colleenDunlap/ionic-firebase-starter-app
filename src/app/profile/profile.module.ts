import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Profile } from './profile';
import { ProfileResolver } from './profile.resolver';

  
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: Profile,
    resolve: {
      data: ProfileResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Profile],
  providers: [
    ProfileResolver
  ]
})
export class ProfileTabModule {
  
}
