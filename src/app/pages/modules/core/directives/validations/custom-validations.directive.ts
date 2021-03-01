import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import * as moment from 'moment';

@Directive({
    selector: '[appCustomValidator]',
})
export class CustomValidatorDirective {


    /**
 * Validate that the FormControl has this structure "+507 xxxx xxxx".
 * @param control FormControl to evaluate.
 */
    static RegularNumbersPositive(control: AbstractControl): ValidationErrors {
        const number = /^(0|[1-9]\d*)$/;
        if (control.value && !number.test(control.value)) {
            return { invalidText: true };
        }
    }

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
     * Validate that the FormControl has this structure "00-00-0000 and less than 70 years".
     * @param control FormControl to evaluate.
     */
    static dateValidator(control: AbstractControl): ValidationErrors {
        const date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        const _date = moment(control.value);
        const moreThanToday = _date.isAfter(moment.now(), 'day');
        if (control.value && (!date.test(control.value) || moreThanToday)) {
            return { invalidDate: true };
        }
    }

    /**
     * Validate the creditcard with spaces includes (Visa, Mastercard)
     * @param control FormControl to evaluate.
     */
    static creditCardValidatorWithSpaces(control: AbstractControl): ValidationErrors {
      const card = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/g;
      if (control.value) {
        const value = control.value.replace("/s\s/g","");
        if(!card.test(value)) {
          return {invalidcard: true};
        }
      }
    }

    /**
     * Validate that the FormControl has this structure "00/00 and is not expiry".
     * @param control FormControl to evaluate.
     * @return Object|void
     */
    static dateExpiryValidator(control: AbstractControl): ValidationErrors {
      const date = /^(0[1-9]|1[0-2])\/?(([0-9]{4}|[0-9]{2})$)/;
      const _date = moment('31/' + control.value, 'DD/MM/YY');
      const lessThanToday = _date.isBefore(moment.now());
      if (control.value && (!date.test(control.value) || lessThanToday)) {
        return { invalidDate: true };
      }
    }


     /**
     * Validate that the FormControl has this structure "00-00-0000 and less than 70 years".
     * @param control FormControl to evaluate.
     */
    static tooOld(control: AbstractControl): ValidationErrors {
        const _date = moment(control.value);
        const itsTooOld = _date.isBefore(moment().subtract(70, 'years'));
        if (itsTooOld) {
            return { tooOld: true };
        }
    }

         /**
     * Validate that the FormControl has this structure "00-00-0000 and less than 70 years".
     * @param control FormControl to evaluate.
     */
    static tooOld65(control: AbstractControl): ValidationErrors {
        const _date = moment(control.value);
        const itsTooOld = _date.isBefore(moment().subtract(65, 'years'));
        if (itsTooOld) {
            return { tooOld: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static regularText(control: AbstractControl): ValidationErrors {
        const text = /((^[ÁÉÍÓÚñÑóáéíúA-z\s\,\.]{2,50})$)/g;
        if (control.value && !text.test(control.value)) {
            return { invalidText: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static shortDocumentValidator(control: AbstractControl): ValidationErrors {
        const document = /^(PE|N|E|([1-9]{1,2}))$/i;
        const document2 = /^[1-9]{1,2}PI|^[1-9]{1,2}AV$/i;
        if (!document.test(control.value) && !document2.test(control.value) && control.value) {
            return { invalidDocument: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static documentValidator(control: AbstractControl): ValidationErrors {
        const passport = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/g;
        const document = /^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i;
        if (!document.test(control.value) && !passport.test(control.value) && control.value) {
            return { invalidDocument: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static cellphoneValidator(control: AbstractControl): ValidationErrors {
        const cellphone = /^[6]{1}\d{7}$/;
        const cellphone2 = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
        const letters = /[a-z]/gi;
        if(control.value && letters.test(control.value)){
            return { invalidcellphone: true };
        }
        if (control.value && (!cellphone.test(control.value) && !cellphone2.test(control.value))) {
            return { invalidcellphone: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static localphoneValidator(control: AbstractControl): ValidationErrors {
        const cellphone = /^[2-3]{1}\d{6}$/;
        const cellphone2 = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
        const letters = /[a-z]/gi;
        if(control.value && letters.test(control.value)){
            return { invalidcellphone: true };
        }
        if (control.value && (!cellphone.test(control.value) && !cellphone2.test(control.value)) ) {
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
        const name = /((^[ÁÉÍÓÚñÑóáéíúA-z\s]{2,25}) [ÁÉÍÓÚñÑóáéíúA-z\s]{2,25}$)/;
        if (control.value && !name.test(control.value)) {
            return { invalidname: true };
        }
    }

    /**
 * Validate that the FormControl has this structure "Example@domain.com".
 * @param control FormControl to evaluate.
 */
    static customFileValidator(control: AbstractControl): ValidationErrors {
        try {
            if (control.value && control.value !== null) {
                const filePath = control.value + "";
                const _ext = filePath.toLowerCase().split('.').pop();
                const allowedTypes = ["jpg", "jpeg", "png", "pdf"];
                if (!allowedTypes.includes(_ext)) {
                    return { invaliddocumentFile: true };
                }
            }
        } catch (e) {
            return { invaliddocumentFile: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "Example@domain.com".
     * @param control FormControl to evaluate.
     */
    static customFilePDFValidator(control: AbstractControl): ValidationErrors {
        try {
            if (control.value && control.value !== null) {
                const filePath = control.value + "";
                const _ext = filePath.toLowerCase().split('.').pop();
                const allowedTypes = ["pdf"];
                if (!allowedTypes.includes(_ext)) {
                    return { invaliddocumentFile: true };
                }
            }
        } catch (e) {
            return { invaliddocumentFile: true };
        }
    }

        /**
     * Validate that the FormControl has two name.
     * @param control FormControl to evaluate.
     */
    static urlValidator(control: AbstractControl): ValidationErrors {
        let urlToCheck = control.value;
        if((control.value && control.value !== null) && (!control.value.startsWith("http://") && !control.value.startsWith("https://"))){
            urlToCheck = "http://" + control.value;
        }
        const url = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (control.value && !url.test(urlToCheck)) {
            return { invalidname: true };
        }
    }

    /**
     * Validate least one space for sentence
     * @param control FormControl to evaluate.
     */
    static leastOneSpace(control: AbstractControl): ValidationErrors {
      let value = control.value;
      if(value) {
      var matches = value.match(/\b[^\d\s]+\b/g);
        if (!(matches && matches.length >= 2)) {
          return { leastOneSpace: true };
        }
      }
    }

}
