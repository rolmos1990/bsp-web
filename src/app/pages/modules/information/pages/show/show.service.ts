import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ShowService {

    public stepCredit = false;

    @Output() changeToCreditCard: EventEmitter<boolean> = new EventEmitter();

    changeCreditCard(status) {
        this.stepCredit = status;
        if (this.stepCredit) {
            this.changeToCreditCard.emit(true);
        }
    }
}
