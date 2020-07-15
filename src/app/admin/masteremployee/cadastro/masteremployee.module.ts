import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MasterEmployeeComponent } from './masteremployee.component';
import { CarService } from './carservice';

import {PickListModule} from 'primeng/picklist';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PickListModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [ MasterEmployeeComponent ],
  bootstrap:    [ MasterEmployeeComponent ],
  providers: [CarService]
})

export class MasterEmployeeModule { }
