import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../resources/services/admin/cliente.service';
import { AuthService } from '../../auth/auth.service';
import { EmpresaService } from '../../resources/services/admin/empresa.service';
import { EmployeeService } from '../../resources/services/admin/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalClients;
  public totalEmployees;
  public totalCompany;
  public totalDevices = 0;
  public totalInventary = 0;



  constructor(private authService: AuthService,
    private clienteService: ClienteService,
    private empresaService: EmpresaService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.listar(data.user);
    });
  }

  listar(user) {
    let userId = user._id;

    this.clienteService.totalClients(userId)
      .subscribe(data => {
        this.totalClients = data;
      });

    this.empresaService.totalCompany(userId)
      .subscribe(data => {
        this.totalCompany = data;
      });

    this.employeeService.totalEmployees(userId)
      .subscribe(data => {
        this.totalEmployees = data;
      });


  }
}