# reactive-form-error-message
Lib for handling the display of Angular Reactive Forms Error Messages.
Angular compatibility  : **v15+**

## Installation: 
`npm install @gabb40/reactive-form-error-messages`

## Simple Use
[See demo project](https://github.com/GabB40/reactive-form-error-messages)

1. Import **ReactiveFormErrorMessagesComponent** into your NgModule
`@NgModule({
  imports: [..., ReactiveFormsModule, ...]
})`
2. In **each of** yours components, provide **ReactiveFormErrorMessagesService**
`@Component({
  ...,
  providers: [ReactiveFormErrorMessagesService] 
})`
3. Inject **ReactiveFormErrorMessagesService** into your component
`constructor(..., private reactiveFormErrorMessagesService: ReactiveFormErrorMessagesService) { }`
4. Set config (you need at least to pass the concerned FormGroup)
`this.reactiveFormErrorMessagesService.setConfig({ formGroup: this.componentFormGroup, ...otherOptions});`
5. Set HTML at desired place. Eg : 
`<label for="name">Name</label>`
`<input type="text" id="name" name="name" formControlName="name">`
`<reactive-form-error-messages formCtrlName="name" label="(optional) A different label than 'Name' (auto uppercase first letter)" />`
