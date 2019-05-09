import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
export class ShowPolicies implements OnInit {
  public modalRef: BsModalRef;
  public isLoading: boolean = true;
  public isFiltering: boolean = false;
  public listUser: Array<any> = [];
  public achievements: string = '';
  public timeOut: any = null;
  public searchBarContent = '';

  constructor() { }

  ngOnInit() {
  }

  public refresh() {
    this.getUsers();
  }

  openModal(template: TemplateRef<any>, user: any) {
    this.achievements = user.achievements;
    this.modalRef = this.modalService.show(
      template,
      { class: 'modal-dialog-centered' }
    );
  }


  public searchOnKey(value: string) {
    clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      this.searchBarContent = value;
      this.isFiltering = true;
      this.getUsers();
    }, 1500);
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.structureXLSX(this.listUser), 'Lista_de_candidatos');
  }

  public showDetail(id: string) {
    this._route.navigate(['/insurance-detail/' + id]);
  }

}
