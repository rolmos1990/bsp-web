import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
export class ShowPolicies implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onNavigate(url: string = null) {
    if (url) {
      window.open(url, "_blank")
    }
  }

  public backToRRHH() {
    this._router.navigate(['/candidatos/rrhh']);
  }

}
