import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { MenuComponent } from './menu/menu.component';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { ManterComponent } from './cliente/manter/manter.component';


@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    CadastroComponent,
    ManterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
