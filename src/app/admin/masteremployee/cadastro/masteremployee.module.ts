import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PickListModule} from 'primeng/picklist';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PickListModule,
    HttpClientModule,
    FormsModule
  ]

})

export class MasterEmployeeModule { }
