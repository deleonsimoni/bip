import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../resources/services/admin/employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidator } from '../../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { UtilService } from "../../../services/util.service";

@Component({
  selector: 'app-registeremployee',
  templateUrl: './registeremployee.component.html',
  styleUrls: ['./registeremployee.component.scss']
})
export class RegisteremployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeSelected: any;
  empresas: [any];
  address: any[];
  clients: any[];

  userType: Array<{ id: number, nome: string}> = [
    { id: 2, nome: 'Sócio'},
    { id: 3, nome: 'Gerente'},
    { id: 4, nome: 'Empregado'}
  ];

  exibirComboEmpresa = false;
  exibirComboCliente = false;

  private innerValue: FormGroup;
  private changed = new Array<(value: FormGroup) => void>();

  constructor(private fb: FormBuilder, private utilService: UtilService, private employeeService: EmployeeService, private toastr: ToastrService,
    private router: Router) {
    this.employeeSelected = this.router.getCurrentNavigation().extras.state;
  }


  ngOnInit() {
    console.log('It list the data of the employee. ');

    this.employeeForm = this.fb.group({
      fullname: ['', [Validators.required]],
      _id: [''],
      email: ['', [Validators.email]],
      cpf: ['', [CustomValidator.isValidCpf]],
      idcompany: [''],
      idclient: [''],
      idaddress: [''],
      loginId: [''],
      userTypeAccess:[''],
      numberAddress: ['', [Validators.required]],
      complementAddress: [''],
      phones: this.fb.group({
        main: ['', [Validators.required]],
        secundary: [''],
      }),
      address: this.fb.group({
        street: [''],
        complement: [''],
        number: [''],
        zip: [''],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
      })

    });

    if (this.employeeSelected) {
      this.employeeForm.patchValue(
        this.employeeSelected
      );
      this.listAddress();
    }
    this.listarEmpresa();
    this.listClients();
    if (this.employeeForm.get('idcompany').value.trim() != '') {
      this.exibirComboEmpresa = true;
      
    }
    else if (this.employeeForm.get('idclient').value.trim() != '') {
      this.exibirComboCliente = true;
    }
  }

  get teams(): FormGroup {
    return this.innerValue;
  }

  set teams(address: FormGroup) {

    this.teams = address;
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  get addresses(): FormGroup {
    return this.fb.group({
      street: "",
      complement: "",
      number: "",
      zip: "",
      city: "",
      district: "",
      state: "",
      country: ""
    });
  }
  
  listUserType() {
    console.log("It list the matrix client");
   // this.clienteService.listarClientesMatriz().subscribe(
  // (data) => {
    //    console.log("It list the matrix client: ", data);
      //  this.typeClient = data;
     // },
     // (err) => {
      //  this.toastr.error("Problemas ao consultar a lista de empresa. " + err.error.msg, "Erro: ");
     // }
    //);
  }

  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn) => {
          this.employeeForm.patchValue({
            address: {
              street: cepReturn.street,
              zip: cepReturn.cep,
              district: cepReturn.neighborhood,
              city: cepReturn.city,
              state: cepReturn.state,
              country: "Brasil",
            },
          });
      },
      () => {
        this.employeeForm.patchValue({
          address: {
            street: '',
            zip: '',
            district: '',
            city: '',
            state: '',
            country: '',
          },
        });
      });
  }


  changeType(userType) {
    console.log(" Value of the variable ", userType);
  }

  register() {
    event.preventDefault();

    if (!this.employeeForm.valid) return;

    if (this.employeeSelected) {
      this.employeeService.update(this.employeeForm.value)
        .subscribe(() => {
          this.toastr.success('Funcionário atualizado com sucesso.');
          this.router.navigate(['/admin/supportemployee']);
        }, err => {
          this.toastr.error('Problema ao atualizar o funcionário.' + err.error.msg, 'Erro: ');
        });
    } else {
      let enterprise = (<any>window).user._id;
      this.employeeService.register(this.employeeForm.value, enterprise)
        .subscribe(() => {
          this.toastr.success('Funcionário cadastrado com sucesso.');
          this.router.navigate(['/admin/supportemployee']);
        }, err => {
          this.toastr.error('Problema ao cadastrar o funcionário. ', 'Erro: ');
        });
    }
  }

  return() {
    this.router.navigate(['/admin/supportemployee']);
  }

  listarEmpresa() {
    console.log('Listar Empresa');
    let userId = (<any>window).user._id;
    this.employeeService.listaEmpresas(userId)
      .subscribe(data => {
        console.log('Listar Empresa: ', data);
        this.empresas = data;
      }, err => {
        this.toastr.error('Problemas ao consultar a lista de empresa. ' + err.error.msg, 'Erro: ');
      });
  }

  listClients() {
    console.log('This is method List clients. ');
    let userId = (<any>window).user._id;
    console.log('This is value of the user. ' + userId);
    this.employeeService.listClients(userId)
      .subscribe(data => {
        console.log('It list Clients: ', data);
        this.clients = data;
      }, err => {
        this.toastr.error('Problemas ao consultar a lista de empresa. ' + err.error.msg, 'Erro: ');
      });
  }

  listAddress() {
    console.log('It list address. It entrance in the method. ');
    let Address: any = this.employeeForm.get('idaddress').value;
    console.log('Value of the field. ' + Address);
    this.employeeService.listAddress(Address)
      .subscribe(data => {
        console.log('It list address: ', data);
        this.address = data;

        console.log('It list address: ', this.address);
        // itera graciosamente através de chave-valor (key-value)
        for (var [key, value] of Object.entries(this.address)) {
          console.log('Chave ' + key + ' Valor ' + value);
        }

        // Ou, usando array extras
        Object.entries(this.address).forEach(([key, value]) => {
          console.log('Chave1 ' + key + ' Valor1 ' + value); // "a 5", "b 7", "c 9"     
        });
        // loop over values
        for (let value of Object.values(data)) {
          console.log('Valor ' + value); // John, then 30
        }
        var resultArray = Object.keys(data).map(function (personNamedIndex) {
          let person = data[personNamedIndex];
          // do something with person
          console.log('person ' + person);
          return person;
        });
        console.log('resultArray ' + resultArray);
        let arr = [];
        Object.keys(data).map(function (key) {
          arr.push({ [key]: data[key] })
          console.log('arr ' + arr);
          return arr;
        });
        let array = [];
        for (let key in arr) {
          if (arr.hasOwnProperty(key)) {
            console.log('teste ' + array.push(arr[key]));
          }
        }
      }, err => {
        this.toastr.error('Problemas ao consultar a lista de endereço. ', 'Erro: ');
      });
  }


}
