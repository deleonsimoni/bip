import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { MenuComponent } from './menu/menu.component';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { ManterComponent } from './cliente/manter/manter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopoComponent } from './topo/topo.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { OwlModule } from 'ngx-owl-carousel';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InventarioCadastrarComponent } from './inventario/inventario-cadastrar/inventario-cadastrar.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';
import { EmpresaManterComponent } from './empresa/empresa-manter/empresa-manter.component'

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule
} from "@angular/material";
import { ManterfuncionarioComponent } from './funcionario/manterfuncionario/manterfuncionario.component';
import { CadastrofuncionarioComponent } from './funcionario/cadastrofuncionario/cadastrofuncionario.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    CadastroComponent,
    ManterComponent,
    DashboardComponent,
    TopoComponent,
    InventarioCadastrarComponent,
    ListarInventarioComponent,
    EmpresaManterComponent,
    ManterfuncionarioComponent,
    CadastrofuncionarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(options),
    FormsModule, ReactiveFormsModule,
    OwlModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    OnlyAdminUsersGuard
  ]
})
export class AdminModule { }