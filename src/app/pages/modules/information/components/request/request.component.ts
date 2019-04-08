import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  model;

  @Input() forma: FormGroup;

constructor(private modalService: NgbModal) {

}

guardar(){
  console.log(this.forma.value);
}

open(content) {
  this.modalService.open(content, {centered: true});
}

ngOnInit() {
}

  customClass: string = 'customClass';
  isFirstOpen: boolean = true;
}
