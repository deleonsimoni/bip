import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { ConfirmDialogService } from '../../../resources/modal/confirm/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supportemployee',
  templateUrl: './supportemployee.component.html',
  styleUrls: ['./supportemployee.component.scss']
})
export class SupportemployeeComponent implements OnInit {

  employees: [any];

  constructor(private employeeService: EmployeeService, private modalConfirm: ConfirmDialogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.list();
  }

  deletarEmployee(idEmployee) {
    this.modalConfirm.confirm('Deletar', 'Confirma a deleção?')
      .then(() =>
        this.employeeService.deleteEmployee(idEmployee)
          .subscribe(data => {
            this.list();
            this.toastr.success('Funcionário excluído com sucesso');
          }, err => {
            this.toastr.error('Problema ao excluir o funcionário. ' + err.keyValue.msg, 'Erro: ');
          })
      )
  }

  list() {
    let enterprise = (<any>window).user._id;
    this.employeeService.listEmployees(enterprise)
      .subscribe(data => {
        this.employees = data;
      }, err => {
        this.toastr.error('Problema ao consultar o funcionário. ' + err.error.msg, 'Erro: ');
      });
  }

}
