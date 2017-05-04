import { Component, ViewChild, AfterViewInit, Directive } from "@angular/core";
import { NgForm, FormControl, NG_VALIDATORS } from "@angular/forms";

const phoneValidator = ( c: FormControl ) => {

    if ( c.value == null || String( c.value ).length === 0 ) {
        return null;
    }
    const phonePattern = "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$";
    const re           = new RegExp( phonePattern );

    if ( re.test( c.value ) ) {
        return null;
    } else {
        return {
            phone: true,
        };
    }
};

@Directive( {
    selector : "input[type=tel][ngModel]",
    providers: [
        { provide: NG_VALIDATORS, useValue: phoneValidator, multi: true },
    ],
} )
export class PhoneValidatorDirective {
}

@Component( {
    selector: "main",
    // template: `
    //     <router-outlet></router-outlet>
    // `,
    template: `
<form novalidate>
<fieldset ngModelGroup="personName">
<div>
    <label for="first-name-input">First Name:</label>
        <input type="text" id="first-name-input" name="firstNameFirst" [(ngModel)]="person.firstName" required>
        <span>First Name is required.</span>
</div>
<div>
    <label for="last-name-input">Last Name:</label>
        <input type="text" id="last-name-input" name="lastNameFirst" [(ngModel)]="person.lastName" required>
        <span>Last Name is required.</span>
</div>
</fieldset>
<fieldset ngModelGroup="contactDetails">
    <div>
            <label for="email-name-input">Email:</label>
        <input #emailInput="ngModel" type="email" id="email-name-input" name="emailInput" [(ngModel)]="person.email" email required>
        <span *ngIf="emailInput.invalid">
            <span *ngIf="emailInput.errors.required">Email is required.</span>
            <span *ngIf="!emailInput.errors.required && emailInput.errors.email">Email is invalid.</span>
        </span>
    </div>
    
        <div>
            <label for="phone-input">Phone:</label>
        <input #phoneInput="ngModel" type="tel" id="phone-input" name="phoneInput" [(ngModel)]="person.phone">
        <span>Phone is invalid.</span>
    </div>
</fieldset>
<button (click)="savePerson()">Save Person</button>
</form>
`,
    styles  : [
        "input.ng-invalid.ng-touched:not(:focus) { border: 1px solid red;}",
        "input ~ span { display: none;}",
        "input.ng-invalid.ng-touched ~ span { display: inline;}",
    ],
} )
export class AppComponent implements AfterViewInit {

    @ViewChild( NgForm )
    public personForm: NgForm;

    public person = {
        firstName: "",
        lastName : "",
    };

    public ngAfterViewInit() {
        console.log( this.personForm );
    }

    public savePerson() {
        console.log( this.personForm );
    }
}
