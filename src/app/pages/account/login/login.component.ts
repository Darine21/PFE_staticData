import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../../components/NavBar.service';
import { DataService } from '../../static/data.service';
import { LocalService } from '../../admin-local/local.service';

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
    private formBuilder: FormBuilder, private router: Router,
    private navbar: NavbarService,
    private dataservice: DataService,
    private local: LocalService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
     entity: [''] 
    });
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.loginForm.valid) {
      const entityValue = this.loginForm.get('entity').value;
      console.log("Value of entity:", entityValue);
      this.local.changeEntity(entityValue);
      this.accountService.login(this.loginForm.value).subscribe({
        next: (user) => {
          // Supposons que 'role' est une propriété de l'objet utilisateur
          console.log(user.role);
          this.dataservice.updateUserRole(user.role);
          this.navbar.changeRole(user.role);  // Envoyer le rôle via le service
          if (user.role == "AdminGlobal") {
            this.router.navigate(['/static']);
          } else if (user.role == "CheckerGlobal") {
            this.router.navigate(['/valide']);
          } else if (user.role == "AdminLocal") {
            this.router.navigate(['/local-user']);
            const entityValue = this.loginForm.get('entity').value;
            console.log("Value of entity:", entityValue);
            this.local.changeEntity(entityValue);


          } else if (user.role == "CheckerLocal") {
            this.router.navigate(['/Valid-SSD']);
            const entityValue1 = this.loginForm.get('entity').value;
            console.log("Value of entity:", entityValue1);
            this.local.changeEntity1(entityValue1);

          } else {
            this.router.navigate(['/create-entity']);

          }
          const entityValue = this.loginForm.get('entity').value;
          console.log("Value of entity:", entityValue);
          this.local.changeEntity(entityValue);

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
