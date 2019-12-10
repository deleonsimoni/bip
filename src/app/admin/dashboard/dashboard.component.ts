import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../resources/services/admin/cliente.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  clientes: number;

  constructor(private authService: AuthService, private clienteService: ClienteService) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.listar(data.user);
    });
  }

  listar(user){
    let enterprise = user._id;
    this.clienteService.listaClientes(enterprise)
    .subscribe(data => {
       this.clientes = data.length;
    });
  }
}