import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessages = [];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (user) => {
          // Supposons que 'role' est une propriété de l'objet utilisateur
          console.log(user.role);
          this.router.navigate(['/static']);
        },
        error: (error) => {
          console.log(error);
          if (error.error.Errors) {
            this.errorMessages = error.error.Errors;
          } else if (error.error.Message) {
            this.errorMessages.push(error.error.Message);
          } else {
            this.errorMessages.push("An unknown error occurred.");
          }
        }
      });
    }
  }
}
