import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.login.html',
  styleUrls: ['./show.login.scss']
})
export class ShowComponent implements OnInit {

  public closeResult: string;
  public myForm: FormGroup;
  public loading: boolean = false;
  public firtsTime: boolean = false;

  constructor(private modalService: NgbModal, public fb: FormBuilder, private userService: UserService,
    private router: Router, private _toastr: NotifierService, ) {
  }

  ngOnInit() {
    this.initform();
  }
  public initform() {
    this.myForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required],]
    });
  }
  public initformFirtsTime() {
    this.myForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required],],
      passwordConfirmed: ['', [Validators.required],],
    });
  }
  public payloadCretaeUser() {
    return {
      'email': this.myForm.value.username,
      'type': 'admin',
      'password': this.myForm.value.password,
    }
  }
  public logIn(content: any) {
    if (this.firtsTime) {
      if (this.myForm.value.passwordConfirmed !== this.myForm.value.password) {
        this._toastr.notify('error', 'La contraseña debe ser igual a su verificación');
      } else {
        if (this.myForm.valid) {
          this.loading = true;
          this.userService.createUser(this.payloadCretaeUser()).subscribe(
            response => {
              if (response) {
                this._toastr.notify('success', 'Usuario creado stisfactoriamente.');
                this.firtsTime = false;
                this.loading = false;
              }
            }, error => {
              this.loading = false;
              this._toastr.notify('error', 'Ha ocurrido un error creando al usuario');
            }
          );
        } else {
          this._toastr.notify('error', 'Faltan campos por completar o el fomato no es correcto. Por favor, revise y vuelva a enviar el formulario.');
        }
      }
    } else {
      if (this.myForm.valid) {
        this.loading = true;
        let request = this.myForm.value;
        this.userService.logIn(request.username, request.password).subscribe(
          response => {
            if (response) {
              this._toastr.notify('success', 'Inicio de sesión éxitoso. Se redirigirá al dashboard de polizas.');
              setTimeout(() => {
                this.loading = false;
                localStorage.setItem('bspAdminToken', response.result.user.id)
                this.router.navigateByUrl('/polizas');
              }, 3000);
            } else { //El usuario no está registrado
              this.loading = false;
              const modalRef = this.modalService.open(content);
            }
          }, error => {
            this.loading = false;
            const modalRef = this.modalService.open(content);
            //this._toastr.notify('error', error.error.message);
            console.log(error);
          }
        );
      } else {
        this._toastr.notify('error', 'Faltan campos por completar o el fomato no es correcto. Por favor, revise y vuelva a enviar el formulario.');
      }
    }
  }

  private open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  public firtsTimeForm() {
    if (this.firtsTime) {
      this.initform();
    } else {
      this.initformFirtsTime();
    }
    this.firtsTime = !this.firtsTime;
  }

}
