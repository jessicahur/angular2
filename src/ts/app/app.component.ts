import { Component, ViewChild, AfterViewInit, Directive } from "@angular/core";
import { NgForm, FormControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS, FormGroup, AbstractControl } from "@angular/forms";
import { Http } from "@angular/http";

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

const preferredContactMethodValidator = ( g: FormGroup ) => {

    if ( ! g.controls.preferredContactMethodSelect ) { // make sure that this box is present
        return;
    }

    switch ( g.controls.preferredContactMethodSelect.value ) {
        case "EMAIL":
            if ( g.controls.emailInput.value == null || String( g.controls.emailInput.value.length === 0 ) ) {
                return {
                    preferredContactMethod: "EMAIL",
                };
            }
        case "PHONE":
            if ( g.controls.emailInput.value == null || String( g.controls.emailInput.value.length === 0 ) ) {
                return {
                    preferredContactMethod: "PHONE",
                };
            }
            break;
    }

    return null;
};

@Directive( {
    selector : "[ngModelGroup][preferred-contact-required]",
    providers: [
        { provide: NG_VALIDATORS, useValue: preferredContactMethodValidator, multi: true },
    ],
} )
export class SelectValidatorDirective {
}

const productSerialNumberValidatorFactory = ( http: Http ) => {
    return ( c: AbstractControl ) => {
        return new Promise( ( resolve, reject ) => {
            http.get( `http://localhost:3010/products/${encodeURIComponent( c.value )}` )
                .subscribe( () => resolve( null ), () => resolve( { productSerialNumber: true } ) );
        } );

    };
};

// Serial Number Validation
@Directive( {
    selector : "input[validate-serial-number]",
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useFactory: productSerialNumberValidatorFactory, deps: [ Http ], multi: true },
    ],
} )
export class ProductSerialNumberValidatorDirective {
}


// Start Component
@Component( {
    selector: "main",
    // template: `
    //     <router-outlet></router-outlet>
    // `,
    template: `
<form novalidate>
    <details *ngIf="personForm.invalid">
        <summary>There are errors in the person form.</summary>
        <span *ngIf="personForm.controls.contactDetails.errors && 
        personForm.controls.contactDetails.errors.preferredContactMethod === 'EMAIL'">
        Please specify an email for your primary contact method
        </span>
        
        <span *ngIf="personForm.controls.contactDetails.errors && 
        personForm.controls.contactDetails.errors.preferredContactMethod === 'PHONE'">
        Please specify a phone number for your primary contact method
        </span>
    </details>
    
    <div>
        <label for="product-serial-number-text">Product Serial Number</label>
        <input type="text" id="product-serial-number-text" 
        [(ngModel)]="person.serialNumber" name="serialNumberInput"
        validate-serial-number required>
        <span class="valid-message">Validated</span>
        <span>Error</span>
    </div>

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
<fieldset ngModelGroup="contactDetails" preferred-contact-required>
    <div>
            <label for="email-name-input">Email:</label>
        <input #emailInput="ngModel" type="email" id="email-name-input" name="emailInput" [(ngModel)]="person.email" email>
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
    <div class="center-me">
        <label for="preferred-contact-method-select">
            Preferred Contact Method:
        </label>
        <select id="preferred-contact-method-select"
        [(ngModel)]="preferredContactMethod" 
        name="preferredContactMethodSelect" size="4" required>
            <option *ngFor="let contactMethod of contactMethods" [value]="contactMethod.code">
                {{contactMethod.caption}}
            </option>
        </select>
        <span>This is required.</span>
    </div>
</fieldset>
    <div class="center-me">
        <label for="comments-textarea">Comment:</label>
        <textarea id="comments-textarea" [(ngModel)]="person.comments" name="commentsTextarea"></textarea>
    </div>

<button (click)="savePerson()">Save Person</button>
</form>
`,
    styles  : [
        `input.ng-invalid.ng-touched:not(:focus),
        select.ng-invalid.ng-touched:not(:focus) { 
            border: 1px solid red;
        }`,
        `input.ng-invalid.ng-touched ~ span:not(.valid-message), 
        select.ng-invalid.ng-touched ~ span:not(.valid-message) { 
            display: inline;
        }`,
        "input.ng-valid.ng-touched ~ span.valid-message { display: inline;}",
        "input ~ span, select ~ span { display: none;}",
        // "select { vertical-align: middle;}",
        ".center-me { display: flex; align-items:middle;}",
    ],
} )
export class AppComponent implements AfterViewInit {

    @ViewChild( NgForm )
    public personForm: NgForm;

    public person = {
        firstName: "",
        lastName : "",
    };

    public contactMethods = [
        { code: "EMAIL", caption: "Email" },
        { code: "PHONE", caption: "Phone" },
    ];

    public ngAfterViewInit() {
        console.log( this.personForm );
    }

    public savePerson() {
        console.log( this.personForm );
    }
}
