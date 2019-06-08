import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ADropdownsModule } from '@acaprojects/ngx-dropdown';

import { AppComponent } from './app.component';
import { ADynamicFormModule } from 'projects/library/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ADynamicFormModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ADropdownsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
