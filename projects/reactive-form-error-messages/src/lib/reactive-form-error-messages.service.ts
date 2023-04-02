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

  getConfig(): ReactiveFormErrorMessagesConfig {
    return this.config;
  }

  /**
   * @param config
   */
  setConfig(config: ReactiveFormErrorMessagesConfig): void {
    this.config = { ...this.config, ...config };
  }

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

  getErrorMessages(label: string, formControlErrors: ValidationErrors | null | undefined): ErrorMessage[] {
    const defaultErrorMessages = [
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
        message: `${label} must be greater than ${formControlErrors?.['min']?.['min']}`
      },
      {
        validatorName: 'max',
        message: `${label} must be lower than ${formControlErrors?.['max']?.['max']}`
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

    if (this.config.errorMessages) {
      for (const errMsg of defaultErrorMessages) {
        const match = this.config.errorMessages.find(configErrMsg => configErrMsg.validatorName === errMsg.validatorName);
        if (match) errMsg.message = (match.message.replaceAll('{{label}}', label));
      }
    }
    return defaultErrorMessages;
  }

  private getPatternMessage(requiredPattern: string | RegExp): string {
    return [...<[]>this.config.patternMessages, ...ReactiveFormErrorMessagesRegex.PATTERN_MESSAGES]
      .find(p => p.pattern == requiredPattern)?.message ?? `Invalid format (required pattern /${requiredPattern}/)`;
  }

}
