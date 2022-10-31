import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CapacitorGoogleMaps} from "@capacitor-community/capacitor-googlemaps-native";
import {environment} from "../../../environments/environment";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapView: ElementRef;

  constructor(private navigation: NavigationService) {
    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey
    });
  }

  ionViewDidEnter() {
    // this.createMap();
  }

  // createMap() {
  //   const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
  //   console.log('boundingRect', boundingRect);
  //
  //   CapacitorGoogleMaps.create({
  //     width: Math.round(boundingRect.width),
  //     height: Math.round(boundingRect.height),
  //     x: Math.round(boundingRect.x),
  //     y: Math.round(boundingRect.y),
  //     zoom: 5
  //     // liteMode?: bolean;
  //   })
  //
  // }

  ngOnInit() {
  }

}
