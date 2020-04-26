import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
    console.log("Tab3PARTYYYY")
    let mapID = '2d82612424d245e8add370a2d319a780'
    let maplat = localStorage.getItem("lat")
    let maplong = localStorage.getItem("long")
    this.loadMap(parseInt(maplat), parseInt(maplong), mapID);
}

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

}
