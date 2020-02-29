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
      loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/WebMap"
        ])
      .then(function ([WebMap, MapView, SceneView]) {
        
        var webmap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
              id: 'f2e9b762544945f390ca4ac3671cfa72'
            }
          });
        
        const viewOptions = {
          container: "viewDiv",
          map: webmap,
          //center: [-101.17, 21.78],
          //zoom: 8
        };
      
        // 2D:
        var view = new MapView(viewOptions);
      
        // 3D:
        //var view = new SceneView(viewOptions);
      });
  }

  ngOnInit() {
      this.getGeo();
  }
}
