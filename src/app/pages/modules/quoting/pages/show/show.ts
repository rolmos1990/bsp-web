import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']
})


export class ShowComponent implements OnInit {

forma: FormGroup;
public ocupaciones = ['Administración de empresas', 'Contaduría', 'Ingeniería Industrial', 'Mercadotecnia', 'Relaciones Internacionales', 'Ingeniero en sistemas'];

constructor(
  public fb: FormBuilder, private _userService: UserService, private _router: Router) {
  this.forma = this.fb.group({
    document: ['', Validators.compose([Validators.required, Validators.minLength(11)]) ],
    occupationId: ['', Validators.compose([Validators.required, Validators.minLength(5) ]) ],
    age: ['', Validators.compose([Validators.required, Validators.maxLength(2),Validators.min(18),Validators.max(69)]) ],
    email: ['', Validators.compose([Validators.required, Validators.email ]) ]
  });
}

ngOnInit() { 
}

submit(){
  if (this.forma.valid){
    this._userService.createUser(this.forma.value).subscribe(
      response => {
        this._router.navigate(['coverage',response.result.user.id]);
        console.log(response);
      }, error => {
        console.error(error);
      }
    );
  }
}


  selectEvent(item) {
  }

  onChangeSearch(val: string) {
  }

  onFocused(e){
  }

  flag1: boolean = true;
  flag2: boolean = false;
  flag3: boolean = false;
  flag4: boolean = false;

  public hide1():void{
    this.flag1 = false;
    this.flag2 = true;
  }

  public hide2():void{
    this.flag2 = false;
    this.flag3 = true;
  }

  public hide3():void{
    this.flag3 = false;
    this.flag4 = true;
  }

  atras2():void{
    this.flag2 = false;
    this.flag1 = true;
  }

  atras3():void{
    this.flag3 = false;
    this.flag2 = true;
  }

  atras4():void{
    this.flag4 = false;
    this.flag3 = true;
  }

}
