import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map
  markers: 
  L.Marker[] = [ // Aca van todos los marcadores de las obras realizadas
   // Estudio
    L.marker([-31.419951, -64.188383])
    .bindPopup('<h3>Arq|Web Studio</h3><img src="https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg" height="150px" width="150px"/><br> <a href="https://www.google.com" target="_blank">WEB</a>.')
    .openPopup()
    .bindTooltip("Arq|Web Studio").openTooltip(),
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
    this.map = L.map('map', {
      center: [-31.962004888385188, -64.53908812883606],
      minZoom: 5,
      maxZoom: 17,
      keyboard: true,
      keyboardPanDelta: 200,
      wheelPxPerZoomLevel: 40,
      
    });
    L.tileLayer(baseMapURl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

  }
  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }
}