import { FormGroup } from "@angular/forms";
import { PatternMessage } from './reactive-form-error-messages.regex';

export interface ErrorMessage {
  validatorName: string;
  message: string;
}

export interface ReactiveFormErrorMessagesConfig {
  formGroup: FormGroup | null;
  messagesCountLimit?: number;
  exclude?: string | string[];
  thisValidatorOnly?: string | null;
  customValidators?: ErrorMessage[];
  patternMessages?: PatternMessage[];
  debounceTime?: number;
  errorMessages?: ErrorMessage[];
}