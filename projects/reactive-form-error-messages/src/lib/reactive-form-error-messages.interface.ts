import { FormGroup } from "@angular/forms";
import { PatternMessages } from './reactive-form-error-messages.regex';

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
  patternMessages?: PatternMessages[];
  debounceTime?: number;
  errorMessages?: ErrorMessage[];
}