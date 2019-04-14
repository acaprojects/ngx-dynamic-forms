import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '@acaprojects/ngx-dropdown';

import { AppComponent } from './app.component';
import { DynamicFormsModule } from '../../lib/src/public_api';
import { TestFieldComponent } from './text-field.component';

@NgModule({
  declarations: [
    AppComponent,
    TestFieldComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [],
  entryComponents: [TestFieldComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
