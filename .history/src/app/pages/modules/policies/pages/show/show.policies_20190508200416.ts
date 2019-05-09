import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ShowPolicies implements OnInit {
  filter = new FormControl('');
  page = 2;
  pageSize = 4;

  constructor() { }

  ngOnInit() {
  }

}
