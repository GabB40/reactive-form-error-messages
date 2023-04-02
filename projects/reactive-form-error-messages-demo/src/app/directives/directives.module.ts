import { NgModule } from '@angular/core';
import { BindFormDataDirective } from './bind-form-data.directive';



@NgModule({
  declarations: [BindFormDataDirective],
  exports: [BindFormDataDirective]
})
export class DirectivesModule { }
