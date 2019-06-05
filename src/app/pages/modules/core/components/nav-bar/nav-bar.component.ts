import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'bsp-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit() {
  }
  public logOut() {
    localStorage.removeItem('bspAdminToken');
    this.router.navigate(['/login']);
  }

  public get isDashboard() {
    return this.location.isCurrentPathEqualTo('/polizas');
  }

}
