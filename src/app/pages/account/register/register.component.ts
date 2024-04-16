import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
//import { SharedService } from '../../shared/shared.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({}); // Initialisation manquante ici
  selectedRole: string = '';
  submitted = false;
  errorMessages = [];
  registrationSuccess = false;
  showEntitiesField: boolean = false;
  constructor(
    private accountServices: AccountService,
    // private sharedService:SharedService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.initializeFrom();
  }

  initializeFrom() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      role: ['', Validators.required],
      entity: ['', Validators.required],
    });

  }

  onRoleChange() {
    const roleValue = this.registerForm.get('role')?.value;
    if (roleValue === 'AdminLMaker' || roleValue === 'Lchecker') {
      this.showEntitiesField = true;
    } else {
      this.showEntitiesField = true;
      // Reset the value of the entity field if it's hidden
      this.registerForm.get('entity')?.setValue('');
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  register() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.registerForm.valid) {
      // Vérifier si le champ des entités est requis en fonction du rôle sélectionné
      const entityControl = this.registerForm.get('entity');
      if (this.showEntitiesField && entityControl) {
        const entityValue = entityControl.value;
        if (!entityValue || entityValue.trim() === '') {
          // Si le champ des entités est requis mais vide, ne pas soumettre le formulaire
          return;
        }
      }

      this.accountServices.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.registrationSuccess = true;
          //this.sharedService.showNotification(true , response.valueOf.title, response.value.message);
          //this.router.navigate(['/account/login']);
          console.log(response);

        },
        error: error => {
          if (error.error.Errors) {
            this.errorMessages = error.error.Errors;
          }
          console.log(error);
        },



      })
    }

    console.log(this.registerForm.value)

    console.log("Post")
  }
}
