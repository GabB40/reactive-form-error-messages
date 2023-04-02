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
    });

    const customValidators: ErrorMessage[] = [
      { validatorName: 'smallerThan10', message: 'It\'s smaller than 10' },
      { validatorName: 'smallerThan30', message: 'It\'s smaller than 30' },
      { validatorName: 'required', message: 'You\'re a fucking genious !' } // eg: overwrite of a default error message
    ];

    this.reactiveFormErrorMessagesService.setConfig({
      formGroup: this.formChild1,
      customValidators,
      messagesCountLimit: 1,
      // thisValidatorOnly: 'smallerThan30'
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
    else this.reactiveFormErrorMessagesService.emitValueChanges(this.formChild1);
  }

}
