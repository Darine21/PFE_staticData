import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { Entity } from '../models/Entity';
import { ValidService } from '../validation/validation.service';
import { ToastrService } from 'ngx-toastr';
//import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements AfterViewInit {
  map: any;

  constructor(private valideService: ValidService, private toastr: ToastrService) { }

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
   formDataList: Entity[] = [];
  create(form: NgForm) {
    const formData = form.value;
    const name = formData.name;
    console.log("name", name);
    const address = formData.address;
    console.log("address", address);
    const descreption = formData.descreption;
    console.log("descreption", descreption);
    const status = formData.status;
    console.log("status", status);
    const responsable = formData.responsible;
    console.log("responsable", responsable);
    const phoneNumber = formData.phoneNumber;
    const phoneNumberString: string = formData.phoneNumber.toString();
    console.log("nummm", phoneNumberString)
    console.log("num", phoneNumber);
    formData.forEach(item => {
      item.DateCreated = new Date();
    });
    this.formDataList.push(formData);
    console.log("list", this.formDataList);
    const entity: Entity = {
      name: formData.name,
      address: formData.address,
      description: formData.descreption,
      status: formData.status, // Assurez-vous de donner le statut approprié
      dateCreated: new Date(), // Ajoutez la date de création actuelle
      numTel: formData.phoneNumber,
      Responsible: formData.responsable
    };

    this.valideService.Addition(entity).subscribe({
      next: (response) => {

        console.log("Response from API:", response);

        this.toastr.success('Entity added successfully!', 'Success');
      },
      error: (error) => {

        console.error("Error adding entity:", error);

        this.toastr.error('Failed to add entity!', 'Error');
      }
    });
    form.resetForm();
    // Vous pouvez également effectuer d'autres opérations avec ces valeurs, comme les envoyer à un serveur pour traitement
  }

}
