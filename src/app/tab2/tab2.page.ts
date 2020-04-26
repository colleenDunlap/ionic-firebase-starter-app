import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Destination} from '../destination/destination'

import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('webmap') mapEl: ElementRef;
  lat4map :any;
  long4map :any;

  constructor( public platform: Platform, public destination: Destination) {}


  async loadMap(lat, long, mapID) {

    

      // Reference: https://ionicframework.com/docs/api/platform/Platform/#ready
      //await this.platform.ready();

      // Load the ArcGIS API for JavaScript modules
      
      loadModules(['esri/views/MapView', 'esri/WebMap'])
  .then(([MapView, WebMap]) => {
    // then we load a web map from an id
    var webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: mapID
      }
    });
    // and we show that map in a container w/ id #viewDiv
    var view = new MapView({
      map: webmap,
      container: 'viewDiv',
      center: [long, lat], //not super accurate because of integer rounding
      zoom: 8
    });
  })
  .catch(err => {
    // handle any errors
    console.error(err);
  });
  }

  ngOnInit() {
      console.log("Tab 2 Wisdom")
      let useUserLatLong = Number(localStorage.getItem("useCurrentLocationFlag"))
      let mapID = '1baf4909d86642f5882af51f64c70210'
      if(useUserLatLong==0){
        this.lat4map = localStorage.getItem("currCountryLat")
        this.long4map = localStorage.getItem("currCountryLong")
        mapID = 'ba0e075b770a4e27914c9c94e24d265b'
      }
      else{
        this.lat4map = localStorage.getItem("lat")
        this.long4map = localStorage.getItem("long")
      }
      console.log(Number(this.lat4map))
      console.log(Number(this.long4map))
      this.loadMap(parseInt(this.lat4map), parseInt(this.long4map), mapID);
  }
}
