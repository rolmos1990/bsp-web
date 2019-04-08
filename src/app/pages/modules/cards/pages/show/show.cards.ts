import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'bsp-cards',
  templateUrl: './show.cards.html',
  styleUrls: ['./show.cards.scss']
})
export class ShowCards implements OnInit{

constructor(private route: Router) {
}

datosUsuario(){
}

  ngOnInit(){}
}
