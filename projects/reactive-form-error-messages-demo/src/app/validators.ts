import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function smallerThan30(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    return value < 30 ? { smallerThan30: true } : null;
  };
}

export function smallerThan10(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    return value < 10 ? { smallerThan10: true } : null;
  };
}