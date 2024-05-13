import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/static', title: 'Static Data', icon: 'ni-bullet-list-67 text-green', class: '' },
  { path: '/ details/: id', title: '', icon: '', class: '' },
  { path: '/valide', title: 'validation Data', icon: 'fa fa-check text-green', class: '' },
  { path: '/share', title: 'share Data', icon: 'fa fa-check text-green', class: '' },
  { path: '/complaint', title: '', icon: '', class: '' },
  { path: '/rejected', title: '', icon: '', class: '' },
  { path: '/card-val', title: '', icon: '', class: '' },
  { path: '/card-share', title: '', icon: '', class: '' },
  {
    path: '/create-entity', title: '', icon: '', class: '' }
]


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }          
}
