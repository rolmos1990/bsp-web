import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bsp-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  public titles: Object;
  public icons: boolean;
  public left_items: any;
  public right_items: any;
  public isLoading: boolean;
  public paymentFailed: boolean;
  public message: string;
  public _router:any;
  @Input() requestId: string;
  @Input() insured: any;
  @Input() insurance: any;
  @Input() paymentInformation: any;
  

  constructor(router: ActivatedRoute) { 
    this._router = router;
  }

  ngOnInit() {
    this.isLoading = true;
    if(!this.paymentInformation){
      //redirect to home...
      this._router.navigate([`/`]);
    }
    if(this.paymentInformation.status === "ACCEPT"){

        if(this.insurance.type == "accidentes-personales")
        {
          this.icons = true;
          
          this.titles = {
            'coverageTitle': 'El seguro que acabas de comprar cuenta con:',
            'coverageSubtitle': 'En caso de algún accidente:',
            'sinisterTitle': 'En caso de muerte accidental'
          };

          this.left_items = [
            "Gastos médicos",
            "Servicio de emergencias y urgencias médicas",
            "Asistencia en viajes en el extranjero",
            "Invalidez permanente (total y parcial)"
          ];

          this.right_items = [
            "Adelanto de gastos funerarios",
            "Doble indemnización por muerte accidental por accidente específico"
          ];

        }
        else{
          this.icons = false;
          //cancer
          this.titles = {
            'coverageTitle': 'El seguro que acabas de comprar cuenta con:',
            'coverageSubtitle': '',
            'sinisterTitle': ''
          };

          this.left_items = [
            "Flexibilidad en la entrega del monto asegurado, sin tener que asociarlo a gastos médicos.",
            "Consigue tu protección rápidamente estés donde estés."
          ];

          this.right_items = [
            "Paga cómodamente en pequeñas cuotas con tu tarjeta de crédito o por transferencia bancaria. Como sea más fácil para tí.",
            "Siempre estarás protegido, porque cada año renovamos la protección contra Cáncer automáticamente."
          ];
        }
    }
    else{

      if(["DECLINE","REVIEW","ERROR","CANCEL"].includes(this.paymentInformation.status)){
        this.paymentFailed = true;
        this.message = this.paymentInformation.message || "Error al obtener información del pago";
      }
      else{
        this.paymentFailed = true;
        this.message = this.paymentInformation.message || "No conseguimos información del pago";
      }
    }
  }

  public doPayment() {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.paymentInformation['processingUrl'])   
    
    const arrayObj = this.paymentInformation;
   
   const _items = Object.entries(arrayObj).map((e) => { 
    if(e[0] !== "processingUrl" && e[0] !== "status" && e[0] !== "message" && e[0] !== "id"){
      const value = (typeof e[1] == "string")?e[1]:e[1].toString();
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", e[0]);
      hiddenField.setAttribute("value", value );
      form.appendChild(hiddenField);
      }
    });

    document.body.appendChild(form);
    form.submit();
  }

}
