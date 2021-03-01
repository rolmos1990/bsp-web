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
  @Input() requestId: any;
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
    const PROVIDER_STATUS = {
      ACCEPTED2 : "ACCEPT",
      ACCEPTED : "SUCCESSFUL",
      DECLINE: "DENIED"
    };

    if(this.paymentInformation.status === PROVIDER_STATUS.ACCEPTED || this.paymentInformation.status === PROVIDER_STATUS.ACCEPTED2){

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
            "Atención sin exámenes médicos previos.",
            "Indemnización al presentar el diagnóstico sin necesidad de asociarlo a gastos médicos.",
            "Consigue tu protección rápidamente estés donde estés."
          ];

          this.right_items = [

            "Paga cómodamente en pequeñas cuotas con tu tarjeta de crédito.",
            "La indemnización que ofrecemos es adicional a la de cualquier otra póliza que puedas disponer."
          ];
        }
    }
    else{
      if(this.paymentInformation.status === PROVIDER_STATUS.DECLINE){
        this.paymentFailed = true;
        this.message = this.paymentInformation.message || "Su pago ha sido rechazado";
      }
      else if(["DECLINE","REVIEW","ERROR","CANCEL"].includes(this.paymentInformation.status)){
        this.paymentFailed = true;
        this.message = this.paymentInformation.message || "Error al obtener información del pago";
      }
      else{
        this.paymentFailed = true;
        this.message = this.paymentInformation.message || "No conseguimos información del pago";
      }
    }
  }
  public doPayment(){
    if(this.paymentInformation['reference_number']) {
      this._router.navigate([`/pago/${this.paymentInformation['reference_number']}`]);
    }
  }

  //TODO -- old version for CyberSource (normal flow).
  public _doPayment() {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.paymentInformation['processingUrl'])

    const arrayObj = this.paymentInformation || [];

    const _items = Object.entries(arrayObj).map((e) => {
      if (e[0] !== "processingUrl" && e[0] !== "status" && e[0] !== "message" && e[0] !== "id" && e[0] !== "merchant_defined_data" && e[0]!== "req_merchant_defined_data") {
        const value = ((typeof e[1] == "string") ? e[1] : e[1] + "");
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", e[0]);
        hiddenField.setAttribute("value", value);
        form.appendChild(hiddenField);
      }
      if (e[0] === 'merchant_defined_data' || e[0] === 'req_merchant_defined_data') {
        Object.values(e[1]).map((_e, index) => {

          const value = ((typeof _e == "string") ? _e : _e + "");
          const incrementIndex = parseInt(index.toFixed(0));

          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          const name_field = e[0];
          hiddenField.setAttribute("name", name_field + (incrementIndex + 1));
          hiddenField.setAttribute("value", value);
          form.appendChild(hiddenField);

        });
      }
    });

    document.body.appendChild(form);
    form.submit();
  }

}
