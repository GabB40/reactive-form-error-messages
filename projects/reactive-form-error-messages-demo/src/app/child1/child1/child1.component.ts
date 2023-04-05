import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ErrorMessage, ReactiveFormErrorMessagesRegex, ReactiveFormErrorMessagesService } from 'reactive-form-error-messages';
import { smallerThan10, smallerThan30 } from '../../validators';
import { initialState } from '../store';
import { updateData } from './../store/child1.actions';
import { selectChild1Data } from './../store/child1.selectors';


@Component({
  templateUrl: './child1.component.html',
  providers: [ReactiveFormErrorMessagesService] // IMPORTANT : singleton of service at component level !
})
export class Child1Component implements OnInit {

  formChild1!: FormGroup;
  formData$ = this.store.select(selectChild1Data);
  maxTodos = 3;
  hasMaxTodosError: boolean = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private reactiveFormErrorMessagesService: ReactiveFormErrorMessagesService
  ) { }

  ngOnInit(): void {
    this.formChild1 = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern(ReactiveFormErrorMessagesRegex.ALNUM)]],
      version: ['', [Validators.required, smallerThan10(), smallerThan30(), Validators.min(5), Validators.max(99), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      todos: this.formBuilder.array(
        [],
        [Validators.maxLength(this.maxTodos)]
      )
    },
    { updateOn: 'submit'}
    );

    const customValidators: ErrorMessage[] = [
      { validatorName: 'smallerThan10', message: 'It\'s smaller than 10' },
      { validatorName: 'smallerThan30', message: 'It\'s smaller than 30' }
    ];

    this.reactiveFormErrorMessagesService.setConfig({
      formGroup: this.formChild1,
      customValidators,
      messagesCountLimit: 3,
      errorMessages: this.customErrorMessages,
      // thisValidatorOnly: 'smallerThan30',
    });
  }

  get todos(): FormArray {
    return this.formChild1.controls['todos'] as FormArray;
  }

  onAddTodo() {
    if (this.todos.length < this.maxTodos) {
      this.todos.push(
        this.formBuilder.group({
          todo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          priority: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
        })
      );
    } else this.hasMaxTodosError = true;
  }

  onRemoveTodo(todoIndex: number) {
    this.todos.removeAt(todoIndex);
    this.hasMaxTodosError = false;
  }

  onSubmit() {
    if (this.formChild1.valid)
      this.store.dispatch(updateData({ ...initialState, ...this.formChild1.value }));
    // ESSENTIAL line code when use reactive-form-error-messages on submit only
    else this.reactiveFormErrorMessagesService.emitValueChanges(this.formChild1);
  }

  private get customErrorMessages() {
    return [
      {
        validatorName: 'required',
        message: `{{label}} est obligatoire`
      },
      {
        validatorName: 'minlength',
        message: `{{label}} doit avoir au minimum
          {{requiredLength}} caractères
          (Actuellement {{actualLength}} caractères)`
      },
      {
        validatorName: 'maxlength',
        message: `{{label}} doit avoir au maximum
          {{requiredLength}} caractères 
          (Actuellement {{actualLength}} caractères)`
      },
      {
        validatorName: 'min',
        message: `{{label}} doit être égal ou supérieur à {{min}}`
      },
      {
        validatorName: 'max',
        message: `{{label}} doit être égal ou inférieur à {{max}}`
      },
      {
        validatorName: 'email',
        message: `Format de mail invalide`
      },
      {
        validatorName: 'pattern',
        message: 'Ne répond pas au format {{requiredPattern}}'
      }
    ];
  }

}
