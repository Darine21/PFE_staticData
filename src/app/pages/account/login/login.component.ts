import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
//import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({}); // Initialisation manquante ici
  selectedRole: string = '';
  submitted = false;
  errorMessages = [];
  constructor(
    private accountServices: AccountService,
    //private sharedService:SharedService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.initializeFrom();
  }

  initializeFrom() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],

    });
  }
  login() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.loginForm.valid) {
      this.accountServices.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/static']);

        },
        error: error => {
          if (error.error.Errors) {
            this.errorMessages = error.error.Errors;
          }
          console.log(error);
        }



      })
    }


  }
}
