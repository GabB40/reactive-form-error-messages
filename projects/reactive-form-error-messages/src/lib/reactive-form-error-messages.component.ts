import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ErrorMessage, ReactiveFormErrorMessagesConfig } from './reactive-form-error-messages.interface';
import { PatternMessage } from './reactive-form-error-messages.regex';
import { ReactiveFormErrorMessagesService } from './reactive-form-error-messages.service';



@Component({
  standalone: true,
  selector: 'reactive-form-error-messages',
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let errorMessage of errorMessages$ | async; index as i">
      <ng-container *ngIf="!messagesCountLimit || i < messagesCountLimit">
        <div class="reactive-form-error-message">{{ errorMessage.message }}</div>
      </ng-container>
    </ng-container>
  `
})
export class ReactiveFormErrorMessagesComponent implements OnInit {
  /** Mandatory inputs */
  @Input() formCtrlName!: string;

  /** Optionals inputs */
  @Input() label!: string;
  @Input() formArrIndex: number | null = null;
  @Input() formArrName: string | null = null;
  @Input() messagesCountLimit?: number;
  @Input() exclude?: string | string[];
  @Input() thisValidatorOnly?: string | null;
  @Input() debounceTime?: number;
  @Input() patternMessages?: PatternMessage[];

  private config!: ReactiveFormErrorMessagesConfig;
  private formControl!: AbstractControl | null;

  errorMessages$!: Observable<ErrorMessage[]> | null;

  constructor(private reactiveFormErrorMessagesService: ReactiveFormErrorMessagesService) { }

  ngOnInit(): void {
    this.setConfig();
    this.setFormControl();
    this.label = this.label ?? this.formCtrlName[0].toUpperCase() + this.formCtrlName.slice(1);
    this.errorMessages$ = this.setErrors();
  }

  setConfig() {
    this.config = this.reactiveFormErrorMessagesService.getConfig();
    this.messagesCountLimit = this.messagesCountLimit ?? this.config.messagesCountLimit;
    this.exclude = this.exclude ?? this.config.exclude;
    this.thisValidatorOnly = this.thisValidatorOnly ?? this.config.thisValidatorOnly;
    this.debounceTime = this.debounceTime ?? this.config.debounceTime;
    this.patternMessages = this.patternMessages ?? this.config.patternMessages;
  }

  setFormControl(): void {
    if (this.formArrName) {
      if (this.formArrIndex === null) {
        console.error('Input formArrName is defined but formArrIndex isn\'t !');
        return;
      }
      const formArray = this.config.formGroup?.controls[this.formArrName] as FormArray;
      this.formControl = formArray.controls[this.formArrIndex].get(this.formCtrlName);
    } else {
      this.formControl = this.config.formGroup?.controls[this.formCtrlName] ?? null;
    }
  }

  setErrors(): Observable<ErrorMessage[]> | null {
    return this.formControl?.valueChanges.pipe(
      debounceTime(this.debounceTime ?? 0),
      distinctUntilChanged(),
      map(_ => this.getErrors())
    ) ?? null;
  }

  getErrors(): ErrorMessage[] {
    let errorMessages: ErrorMessage[] = this.reactiveFormErrorMessagesService.getErrorMessages(this.label, this.formControl?.errors);

    // handle thisValidatorOnly
    if (this.thisValidatorOnly) {
      errorMessages = errorMessages.filter((err: ErrorMessage) => err.validatorName.toLowerCase() === this.thisValidatorOnly?.toLowerCase());
      this.config.customValidators = this.config.customValidators?.filter((err: ErrorMessage) => err.validatorName.toLowerCase() === this.thisValidatorOnly?.toLowerCase());
    }

    // handle exclude
    if (this.exclude?.length) {
      errorMessages = this.excludedValidatorsHandler(errorMessages);
      this.config.customValidators = this.excludedValidatorsHandler(this.config.customValidators ?? null) ?? [];
    }

    // allow to overwrite a default message using customValidators
    const reducedErrorMessages = errorMessages.reduce((acc: ErrorMessage[], curr: ErrorMessage) => {
      if (!acc.some((err: ErrorMessage) => err.validatorName === curr.validatorName)) acc.push(curr);
      return acc;
    }, [...<[]>this.config.customValidators]);

    return this.formControl?.errors ? reducedErrorMessages.filter((err: ErrorMessage) => this.formControl?.errors?.hasOwnProperty(err.validatorName)) : [];
  }

  excludedValidatorsHandler(errorArray: ErrorMessage[] | null): ErrorMessage[] | [] {
    return errorArray?.filter(err => {
      if (Array.isArray(this.exclude)) {
        return !this.exclude.map(v => v.toLowerCase()).includes(err.validatorName.toLowerCase());
      }
      return this.exclude?.toLowerCase() !== err.validatorName.toLowerCase();
    }) ?? [];
  }

}
