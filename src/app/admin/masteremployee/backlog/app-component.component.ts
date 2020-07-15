import { MasterEmployeeService } from '../../../resources/services/admin/masteremployee.service';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Pais } from './pais';
import { Cidade } from './cidade';

@Component({
    selector: 'app-component',
    templateUrl: './masteremployee.component.html',
    providers: [MasterEmployeeService]
})
export class AppComponent {
    paises: Pais[];
    cidades: Cidade[];

    constructor(private _dataService: MasterEmployeeService) {
        this.paises = this._dataService.getPaises();
    }
}