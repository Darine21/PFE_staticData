import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../NavBar.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



export const ADMIN_ROUTES: RouteInfo[] = [
  { path: '/static', title: 'Static Data', icon: 'ni-bullet-list-67 text-green', class: '' },
  { path: '/ details/: id', title: '', icon: '', class: '' },

  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green" , class: '' },
  

]
export const AdminC: RouteInfo[] = [
  { path: '/valide', title: 'Validation Data', icon: 'fa fa-check text-green', class: '' },

  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green", class: '' },


]
export const AdminLC: RouteInfo[] = [
  { path: '/Valid-SSD', title: 'Validation SSD', icon: 'fa fa-check text-green', class: '' },

  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green", class: '' },
  

]
export const AdminL: RouteInfo[] = [
  {
    path: '/local-user', title: `  Specific Data`, icon: 'ni-bullet-list-67 text-green', class: ''
  },

  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green", class: '' },

]
export const AdminE: RouteInfo[] = [
  {
    path: '/create-entity', title: ' Creation Entity', icon: 'fas fa-cube text-green', class: ''
  },

  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green", class: '' },

]

export const ROUTES: RouteInfo[] = [
  { path: '/static', title: 'Static Data', icon: 'ni-bullet-list-67 text-green', class: '' },
  { path: '/ details/: id', title: '', icon: '', class: '' },
  { path: '/valide', title: 'Validation Data', icon: 'fa fa-check text-green', class: '' },
  {
    path: '/create-entity', title: ' Creation Entity', icon: 'fas fa-cube text-green', class: ''
  },
  {
    path: '/local-user', title: ' Specific Data', icon: 'ni-bullet-list-67 text-green', class: ''
  },
  { path: '/Profil', title: ' Profile', icon: "fa fa-user text-green", class: '' },

]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
    userRole: string;

  constructor(private router: Router, private navbar: NavbarService) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });

    this.navbar.currentRole.subscribe(role => {
      this.userRole = role;
      console.log(this.userRole);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      if (this.userRole === 'AdminGlobal') {
        this.menuItems = ADMIN_ROUTES;
      } else if (this.userRole === 'CheckerGlobal') {
        this.menuItems = AdminC;

      } else if (this.userRole === 'AdminLocal') {
        this.menuItems = AdminL;
      } else if (this.userRole == 'CheckerLocal') {
        this.menuItems = AdminLC;
      } else if (this.userRole = 'AdminEntity') {
        this.menuItems = AdminE;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
