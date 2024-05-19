import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarService } from '../NavBar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  reason: any[];
  name: string = '';
  reasonData: string;
  reasons: string[] = [];
  status: string = '';
  notif: any[] = [];
  Status: any[] = [];
  
  constructor(location: Location, private element: ElementRef, private router: Router, private navbarService: NavbarService) {
    this.location = location;
  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.navbarService.reason$.subscribe(reason => {
      this.reasons = reason;
      console.log('Raisons mises à jour dans le composant Navbar :', this.reasons);
      this.notif.push(this.reasons);
     
      console.log('Raisons mises à jour dans le composant Navbar :', this.notif);
  
    });
    this.navbarService.getReasons().subscribe(reasons => {
      this.reasons = reasons; 
      
      console.log('Raisons mises à jour dans le composant Navbar :', this.reasons);
    });
     
    this.navbarService.currentName.subscribe(name=> {
      this.name = name;
      // Utilisez la raison mise à jour ici, par exemple, pour afficher une notification dans la barre de navigation
      console.log('Name mise à jour dans la barre de navigation:', this.name);
    });
    this.navbarService.currentstatus.subscribe(status=> {
      this.status = status;
      this.Status.push(status);
      console.log("Status of ", this.Status)
      // Utilisez la raison mise à jour ici, par exemple, pour afficher une notification dans la barre de navigation
      console.log('Status mise à jour dans la barre de navigation:', this.status);
    });
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
