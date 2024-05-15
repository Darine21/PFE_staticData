import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { Entity } from '../models/Entity';
import { ValidService } from '../validation/validation.service';
import { ToastrService } from 'ngx-toastr';
import { DialogEComponent } from './dialog-e/dialog-e.component'
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../static/data.service';

//import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements AfterViewInit  {
  map: any;
 
  constructor(private valideService: ValidService, private toastr: ToastrService, private dialog: MatDialog, private dataservice: DataService) { }

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
    console.log("form", formData);
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
    const phoneNum = formData.phoneNumber;
   
    
    console.log("num", phoneNum);
    
    this.formDataList.push(formData);
  
    console.log("list", this.formDataList);
    const currentDate = new Date();

    // Obtention de l'année, du mois et du jour
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Les mois sont indexés à partir de 0
    const day = ('0' + currentDate.getDate()).slice(-2);

    // Obtention de l'heure, des minutes et des secondes
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes());


    // Construction de la chaîne de date au format souhaité (par exemple: 'YYYY-MM-DD HH:MM:SS')
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    this.formDataList.forEach(item => {
      item.dateCreated = formattedDateTime;
    });
    localStorage.setItem('entity', JSON.stringify(this.formDataList));

    const entity: Entity = {
        name: formData.name,
        address: formData.address,
        descreption: formData.descreption,
        status: formData.status,
        dateCreated: formattedDateTime,
      phoneNumber: phoneNum,
        responsible: formData.responsible,
       
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
    this.dataservice.updateFormDataList1(this.formDataList);
  }
  delete(i: number) {

    console.log("sss", this.formDataList[i]);
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
  
  openDialog(i: number): void {
    // Calculate position based on the event coordinates
  
    const item = i;
    console.log("dataaa", item);
    this.dataservice.setSelectedItemID(item)

      const dialogRef = this.dialog.open(DialogEComponent, {
        width: '500px',
        
        data: item,
   
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

        }
      });

    }
  
}
