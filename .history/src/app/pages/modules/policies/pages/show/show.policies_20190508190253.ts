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
