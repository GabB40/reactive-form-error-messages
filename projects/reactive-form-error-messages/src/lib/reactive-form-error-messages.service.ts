import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormErrorMessagesConfig } from './reactive-form-error-messages.interface';

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

}
