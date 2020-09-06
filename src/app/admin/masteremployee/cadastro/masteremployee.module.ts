import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterEmployeeService } from '../../../resources/services/admin/masteremployee.service';
import { MasterEmployeeComponent } from './masteremployee.component';

import {PickListModule} from 'primeng/picklist';

@NgModule({
  declarations: [ MasterEmployeeComponent ],
  imports: [
    NgModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PickListModule
  ],
  bootstrap:    [ MasterEmployeeComponent ],
  providers: [MasterEmployeeService]
})

export class MasterEmployeeModule { }
