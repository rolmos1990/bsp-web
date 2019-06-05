// tslint:disable: indent
// tslint:disable: component-selector
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../../core/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'm-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
	public form: FormGroup;
	public loading = false;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private _toastr: NotifierService,
		private modalService: NgbModal,
	) {
		this.initForm();
	}

	private initForm() {
		this.form = this.formBuilder.group({
			userEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
		});
	}

	submit(content: any) {
		if (this.form.valid) {
			this.loading = true;
			this.userService.passwordRecoveryEmail(this.form.value).subscribe(
				response => {
					if (response.result.successful) {
						this.loading = false;
						this._toastr.notify('success', 'Su correo ha sido enviado satisfactoriamente, revise su bandeja de entrada.');
						this.router.navigate(['/login']);
					} else {
						this.loading = false;
						const modalRef = this.modalService.open(content);
					}
				}, error => {
					this.loading = false;
					const modalRef = this.modalService.open(content);
				}
			);
		} else {
			this._toastr.notify('error', 'Ingrese un correo valido (example@banesco.com).');
		}
	}
	private open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
		}, (reason) => {
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
}
