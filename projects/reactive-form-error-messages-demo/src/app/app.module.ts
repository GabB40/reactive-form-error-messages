import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appFeatureKey, appReducer } from './store/index';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Child1Module } from './child1/child1.module';
import { Child2Module } from './child2/child2.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature(appFeatureKey, appReducer),
    Child1Module,
    Child2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
