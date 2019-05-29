import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.login.html',
  styleUrls: ['./show.login.scss']
})
export class ShowComponent implements OnInit {

  closeResult: string;
  myForm: FormGroup;

  constructor(private modalService: NgbModal, public fb: FormBuilder, private userService: UserService,
     private router: Router, private _toastr: NotifierService,) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required],],
      password: ['', [Validators.required],]
    });
  }

  ngOnInit() {
  }

  get f() { return this.myForm.controls; }

  signIn(content) {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.userService.logIn(this.f.username.value, this.f.password.value).subscribe(
        response => {
          if (response) {
            this._toastr.notify('success', 'Inicio de sesión éxitoso. Se redirigirá al dashboard de polizas.');
            setTimeout(() => {
              this.router.navigateByUrl('/polizas');
            }, 3000);
          } else { //El usuario no está registrado
            const modalRef = this.modalService.open(content);
          }
        }, error => {
          this._toastr.notify('error', 'Error al conectarse al sistema. Intente en unos minutos.');
          console.log(error);
        }
      );
    } else {
      this._toastr.notify('error', 'Faltan campos por completar. Por favor, revise y vuelva a enviar el formulario.');
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' , centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
