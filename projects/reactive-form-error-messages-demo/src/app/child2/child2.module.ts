import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormErrorMessagesComponent } from 'reactive-form-error-messages';
import { DirectivesModule } from './../directives/directives.module';

import { Child2Component } from './child2/child2.component';


@NgModule({
  declarations: [
    Child2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormErrorMessagesComponent,
    DirectivesModule
  ]
})
export class Child2Module { }
