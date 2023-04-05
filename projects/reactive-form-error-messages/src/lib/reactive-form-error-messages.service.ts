import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ErrorMessage, ReactiveFormErrorMessagesConfig } from './reactive-form-error-messages.interface';
import { ReactiveFormErrorMessagesRegex } from './reactive-form-error-messages.regex';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormErrorMessagesService {

  private config: ReactiveFormErrorMessagesConfig = {
    formGroup: null,
    messagesCountLimit: 0,
    exclude: [],
    thisValidatorOnly: null,
    customValidators: [],
    patternMessages: [],
    debounceTime: 300,
  };

  /**
   * For internal purposes
   * @returns {ReactiveFormErrorMessagesConfig} The reactive-form-error-messages config 
   */
  getConfig(): ReactiveFormErrorMessagesConfig {
    return this.config;
  }

  /**
   * @param {ReactiveFormErrorMessagesConfig} config - The reactive-form-error-messages config
   * @param {FormGroup} config.formGroup - The Angular Reactive formGroup for which handle error messages
   * @param {number} [config.messagesCountLimit=All] - Max number of messages to display (default = all)
   * @param {(string|string[])} [config.exclude=[]] - Error(s) to not display
   * @param {(string|null)} [config.thisValidatorOnly=null] - Display only this error
   * @param {ErrorMessage[]} [config.customValidators=[]] - Add custom validators
   * @param {patternMessage[]} [config.patternMessages=[]] - Add Angular Validators.Patterns and associeted messages
   * @param {number} [config.debounceTime=300] - Set time before displaying error messages
   * @param {ErrorMessage[]} [config.errorMessages=undefined] - Overwrite defaults error messages
   * @param {boolean} [config.displayOnEmitValueChanges=false] - Display error messages only when emitValueChanges(formGroup: FormGroup) is called
   * @returns {void}
   */
  setConfig(config: ReactiveFormErrorMessagesConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * For internal purposes - (INCOMMING) Can be use to display error messages on form submit
   * @param {FormGroup} formGroup - The Angular Reactive formGroup for which handle error messages 
   */
  emitValueChanges(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes('controls')) {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.emitValueChanges(formGroupChild);
        }
        (<EventEmitter<any>>control.valueChanges).emit(control.value);
      }
    }
  }

  /**
   * For internal purposes
   * @param {string} label 
   * @param {(ValidationErrors|null|undefined)} formControlErrors 
   * @returns {ErrorMessage[]} Return reactive-form-error-messages error messages
   */
  getErrorMessages(label: string, formControlErrors: ValidationErrors | null | undefined): ErrorMessage[] {
    const defaultErrorMessages: ErrorMessage[] = [
      {
        validatorName: 'required',
        message: `${label} is required`
      },
      {
        validatorName: 'minlength',
        message: `${label} must have at least
          ${formControlErrors?.['minlength']?.['requiredLength']} characters
          (currently ${formControlErrors?.['minlength']?.['actualLength']} characters)`
      },
      {
        validatorName: 'maxlength',
        message: `${label} must have at most
          ${formControlErrors?.['maxlength']?.['requiredLength']} characters 
          (currently ${formControlErrors?.['maxlength']?.['actualLength']} characters)`
      },
      {
        validatorName: 'min',
        message: `${label} must be greater than ${formControlErrors?.['min']?.['min'] - 1}`
      },
      {
        validatorName: 'max',
        message: `${label} must be lower than ${formControlErrors?.['max']?.['max'] + 1}`
      },
      {
        validatorName: 'email',
        message: `Invalid email format`
      },
      {
        validatorName: 'pattern',
        message: this.getPatternMessage(formControlErrors?.['pattern']?.['requiredPattern'])
      }
    ];

    return this.setCustomErrorMessages(label, defaultErrorMessages, formControlErrors);
  }

  private getPatternMessage(requiredPattern: string | RegExp): string {
    return [...<[]>this.config.patternMessages, ...ReactiveFormErrorMessagesRegex.PATTERN_MESSAGES]
      .find(p => p.pattern == requiredPattern)?.message ?? `Invalid format (required pattern /${requiredPattern}/)`;
  }

  private setCustomErrorMessages(label: string, defaultErrorMessages: ErrorMessage[], formControlErrors: ValidationErrors | null | undefined): ErrorMessage[] {
    if (this.config.errorMessages) {
      for (const errMsg of defaultErrorMessages) {
        const match = this.config.errorMessages.find(configErrMsg => configErrMsg.validatorName === errMsg.validatorName);
        if (match) {
          // replace label
          let message = (match.message.replaceAll('{{label}}', label));
          // replace all properties from formControl.errors
          if (formControlErrors !== null) {
            for (const error in formControlErrors) {
              if (errMsg.validatorName === error && Object.keys(error).length) {
                for (const typeError in formControlErrors[error]) {
                  message = (message.replace(`{{${typeError}}}`, formControlErrors[error][typeError]));
                }
              }
            }
          }
          errMsg.message = message;
        }
      }
    }
    return defaultErrorMessages;
  }
}
