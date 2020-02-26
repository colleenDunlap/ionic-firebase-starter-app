import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  @ViewChild('map') mapEl: ElementRef;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public platform: Platform
  ) { }
  async getGeo() {

    // Reference: https://ionicframework.com/docs/api/platform/Platform/#ready
    await this.platform.ready();

    // Load the ArcGIS API for JavaScript modules
    const [Map, MapView]:any = await loadModules([
        'esri/Map',
        'esri/views/MapView'
    ])
        .catch(err => {
            console.error('ArcGIS: ', err);
        });

    console.log('Starting up ArcGIS map');

    let map = new Map({
        basemap: 'hybrid'
    });

    // Inflate and display the map
    let mapView = new MapView({
        // create the map view at the DOM element in this component
        container: this.mapEl.nativeElement,
        center: [-12.287, -37.114],
        zoom: 1,
        map: map
    });
}
  ngOnInit() {
    this.getGeo();
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

}
