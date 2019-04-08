import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bsp-show-thanks',
  templateUrl: './show.thanks.general.html',
  styleUrls: ['./show.thanks.general.scss'],
})
export class ShowThanksGeneral implements OnInit{
  @ViewChild('content') private content;
  constructor(private modalService: NgbModal) {
    
  }

  ngOnInit(){
    this.open(this.content);
   }

  open(content) {
    this.modalService.open(content, { size: 'lg' , centered: true});
  }
 
  /*closeModal(){
      if (!this.modalRef) {
        return;
      }
   
      this.modalRef.hide();
      this.modalRef = null;
  }*/
}