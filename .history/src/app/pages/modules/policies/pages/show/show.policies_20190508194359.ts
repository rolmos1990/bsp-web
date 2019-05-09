import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
export class ShowPolicies implements OnInit {
  filter = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
