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

    // Ajoutez un marqueur à la carte
    const marker = L.marker([51.5, -0.09]).addTo(this.map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  }
   formDataList: Entity[] = [];
  create(form: NgForm) {
    const storedData = localStorage.getItem('entity');
    if (storedData) {
      this.formDataList = JSON.parse(storedData);
    }
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
    
    this.formDataList.push(formData);
    this.formDataList.forEach(item => {
      item.dateCreated = new Date()
    });
    console.log("list", this.formDataList);
    localStorage.setItem('entity', JSON.stringify(this.formDataList));

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
  delete(i: number) {


    this.valideService.DeleteEntity(this.formDataList[i]).subscribe({
      next: (response) => {
        console.log("Response from API:", response);
        this.toastr.success('Entity deleted successfully!', 'Success');
      },
      error: (error) => {
        this.formDataList.splice(i, 1);
        localStorage.setItem('entity', JSON.stringify(this.formDataList));
        console.error("Error deleting entity:", error);
        this.toastr.error('Failed to delete entity!', 'Error');
      }
    });
  }
}
