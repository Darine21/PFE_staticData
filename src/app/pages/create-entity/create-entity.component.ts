import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/leaflet.markercluster';
//import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements AfterViewInit {
  map: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Créez un groupe de marqueurs
    const markers = L.markerClusterGroup();

    // Ajoutez des marqueurs à partir de données (par exemple, des adresses)
    const addresses = [
      { lat: 51.5, lng: -0.09, title: 'Adresse 1' },
      { lat: 51.51, lng: -0.1, title: 'Adresse 2' }
      // Ajoutez d'autres adresses ici
    ];

    addresses.forEach(address => {
      const marker = L.marker([address.lat, address.lng]);
      marker.bindPopup(address.title);
      markers.addLayer(marker);
    });

    // Ajoutez le groupe de marqueurs à la carte
    this.map.addLayer(markers);
  }
  create(form: NgForm) {
    const formData = form.value;
    const name = formData.name;
    console.log("name", name);
 



    // Vous pouvez également effectuer d'autres opérations avec ces valeurs, comme les envoyer à un serveur pour traitement
  }

}
