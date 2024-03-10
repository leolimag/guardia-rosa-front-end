import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('map')mapRef!: ElementRef;
  map: GoogleMap | undefined;
  searchQuery: string = '';
  watchId: string | undefined;

  constructor() { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.createMap();
    this.watchPosition();
  }

  async createMap(){
    let latitude = localStorage.getItem("latitude");
    let longitude = localStorage.getItem("longitude");

    if (latitude == null || longitude == null) {
      const coordinates = await Geolocation.getCurrentPosition();
      localStorage.setItem("latitude", coordinates.coords.latitude.toString())
      localStorage.setItem("longitude", coordinates.coords.longitude.toString())

      latitude = coordinates.coords.latitude.toString();
      longitude = coordinates.coords.longitude.toString();
    }

    this.map = await GoogleMap.create({
      id: "map",
      apiKey: "AIzaSyB-jtJ7a43c7qNSpcaWuBuCvXV3FntqUUY",
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: Number(latitude),
          lng: Number(longitude),
        },
        zoom: 15,
      }
    });
    this.addMarkers();
  }

  async watchPosition() {
    const watchOptions = { enableHighAccuracy: true };
    this.watchId = await Geolocation.watchPosition(watchOptions, async (position, err) => {
      if (this.map && position && !err) {
        const { latitude, longitude } = position.coords;

        const newPosition = {
          lat: latitude,
          lng: longitude,
        };

        await this.map?.enableClustering();
        await this.map?.addMarker({
          coordinate: newPosition,
          title: 'Sua localização atual',
          snippet: 'Você está aqui',
        });
      } else {
        console.error('Erro ao assistir a posição:', err);
      }
    });
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -23.96144327822541,
          lng: -46.33103998435254,
        },
        title: "Delegacia da Mulher",
        snippet: "Delegacia da Mulher",
      },
    ];
    await this.map?.addMarkers(markers);
  }
}


