import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { MenuComponent } from './menu/menu.component';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { ManterComponent } from './cliente/manter/manter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopoComponent } from './topo/topo.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    CadastroComponent,
    ManterComponent,
    DashboardComponent,
    TopoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}