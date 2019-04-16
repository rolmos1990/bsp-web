import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[appCustomValidator]',
})
export class CustomValidatorDirective {

    /**
     * Validate that the FormControl has this structure "Example@domain.com".
     * @param control FormControl to evaluate.
     */
    static customEmailValidator(control: AbstractControl): ValidationErrors {
        // tslint:disable-next-line:max-line-length
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value && !emailRegexp.test(control.value)) {
            return { invalidemail: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static dateValidator(control: AbstractControl): ValidationErrors {
        const date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (control.value && !date.test(control.value)) {
            return { invalidDate: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static documentValidator(control: AbstractControl): ValidationErrors {
        const document = /^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i;
        if (control.value && !document.test(control.value)) {
            return { invalidDocument: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static cellphoneValidator(control: AbstractControl): ValidationErrors {
        const cellphone = /^\+507\d{7,8}$/;
        if (control.value && !cellphone.test(control.value)) {
            return { invalidcellphone: true };
        }
    }

    /**
     * Validate that the FormControl has one or more name. 
     * @param control FormControl to evaluate.
     */
    static namesValidator(control: AbstractControl): ValidationErrors {
        const name = /(^[ÁÉÍÓÚñÑóáéíúA-z\s]{2,50}$)|((^[ÁÉÍÓÚñÑóáéíúA-z\s]{2,25})[-][ÁÉÍÓÚñÑóáéíúA-z\s]{2,25}$)|((^[ÁÉÍÓÚñÑóáéíúA-z\s]{2,25}) [ÁÉÍÓÚñÑóáéíúA-z\s]{2,25}$)/;
        if (control.value && !name.test(control.value)) {
            return { invalidname: true };
        }
    }

    /**
     * Validate that the FormControl has two name. 
     * @param control FormControl to evaluate.
     */
    static cvvValidator(control: AbstractControl): ValidationErrors {
        const cvv = /^[0-9]{3,4}$/;
        if (control.value && !cvv.test(control.value)) {
            return { invalidcvv: true };
        }
    }

    /**
     * Validate that the FormControl has two name. 
     * @param control FormControl to evaluate.
     */
    static creditCardValidator(control: AbstractControl): ValidationErrors {
        const card = /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11}/g;
        if (control.value && !card.test(control.value)) {
            return { invalidcard: true };
        }
    }

    /**
     * Validate that the FormControl has two name. 
     * @param control FormControl to evaluate.
     */
    static fullNameValidator(control: AbstractControl): ValidationErrors {
        const name = /((^[A-z\s]{2,25}) [A-z\s]{2,25}$)/;
        if (control.value && !name.test(control.value)) {
            return { invalidname: true };
        }
    }

}
