// tslint:disable: indent
// tslint:disable: component-selector
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'm-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
	public form: FormGroup;
	public loading = false;
	public loadingPage = true;
	public successful = false;
	public user: any;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private _activatedRoute: ActivatedRoute,
		private userService: UserService,
		private _toastr: NotifierService,
		private modalService: NgbModal,
	) {
		this.validateToken(this._activatedRoute.snapshot.paramMap.get('tokenId'));
	}

	private initForm() {
		this.form = this.formBuilder.group({
			userId: new FormControl(this.user.id),
			guid: new FormControl(this._activatedRoute.snapshot.paramMap.get('tokenId')),
			password: new FormControl('', Validators.compose([Validators.required])),
			passwordConfirmed: new FormControl(''),
		});
	}

	private validateToken(tokenId: string) {
		this.userService.validateGuid({ guid: tokenId }).subscribe(
			response => {
				this.successful = response.result.successful;
				this.user = response.result.user;
				if (this.user) {
					this.initForm();
				}
				this.loadingPage = false;
			},
			error => {
				this.loadingPage = false;
			}
		);
	}

	validateFormControl(form: FormGroup, key: string, error: string) {
		return form.get(key).hasError(error) && form.get(key).touched;
	}

	submit(content: any) {
		if (this.form.valid) {
			this.loading = true;
			this.userService.updatePassword(this.form.value).subscribe(
				response => {
					this._toastr.notify('success', 'Su contraseña ha sido cambiada satisfactoriamente.');
					this.router.navigate(['/login']);
				}, error => {
					this.loading = false;
					const modalRef = this.modalService.open(content);
				}
			);
		} else {
			this._toastr.notify('error', 'Ingrese una contraseña y su verificación');
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
