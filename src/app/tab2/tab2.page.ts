import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('webmap') mapEl: ElementRef;

  constructor( public platform: Platform) {}


  async getGeo() {

    

      // Reference: https://ionicframework.com/docs/api/platform/Platform/#ready
      //await this.platform.ready();

      // Load the ArcGIS API for JavaScript modules
      
      loadModules(['esri/views/MapView', 'esri/WebMap'])
  .then(([MapView, WebMap]) => {
    // then we load a web map from an id
    var webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: '56a5b473d0854ca9ae4be9138b1f0371'
      }
    });
    // and we show that map in a container w/ id #viewDiv
    var view = new MapView({
      map: webmap,
      container: 'viewDiv'
    });
  })
  .catch(err => {
    // handle any errors
    console.error(err);
  });
  }

  ngOnInit() {
      this.getGeo();
  }
}
