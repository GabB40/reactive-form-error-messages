import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormErrorMessagesComponent } from 'reactive-form-error-messages';
import { DirectivesModule } from './../directives/directives.module';
import { Child1Component } from './child1/child1.component';


@NgModule({
  declarations: [
    Child1Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormErrorMessagesComponent,
    DirectivesModule
  ]
})
export class Child1Module { }
