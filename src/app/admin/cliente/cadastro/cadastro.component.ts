import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../../../resources/services/admin/cliente.service";
import { EmployeeService } from "../../../resources/services/admin/employee.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CustomValidator } from "../../../resources/custom-validator";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { any } from "joi";
import { UtilService } from "../../../services/util.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  clienteForm: FormGroup;
  clienteSelecionado: any;
  empresas: any[];
  clients: any[];
  address: any[];
  typeClient: any[];
  Type: any = ["Matriz", "Filial", "Coligada", "Conglomerado"];

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private employeeService: EmployeeService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.clienteSelecionado = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      fullnameclient: ["", [Validators.required]],
      cnpj: ["", [CustomValidator.isValidCnpj]],
      cpf: ["", [CustomValidator.isValidCpf]],
      email: ["", [Validators.email]],
      typeName: ["", [Validators.required]],
      _id: ["", []],
      idaddress: [""],
      matrixEnterprise: [""],
      idcompany: [""],
      numberAddress: ['', [Validators.required]],
      complementAddress: [''],
      phones: this.fb.group({
        main: ["", [Validators.required]],
        secundary: [""],
      }),
      address: this.fb.group({
        street: [""],
        zip: [""],
        district: [""],
        city: [""],
        state: [""],
        country: [""],
      }),
    });

    if (this.clienteSelecionado) {
      this.clienteForm.patchValue(this.clienteSelecionado);
      console.log("List all the address.");
      this.listAddress();
    }
    this.listar();
    this.listarClientesMatriz();
  }

  changeType(typeBranch) {
    //let objLimparComobo: any[];
    console.log(" Value of the variable ", typeBranch);
    if (typeBranch.target.value == "2: Filial") {
      this.clienteForm.get("matrixEnterprise").enable();
      this.listarClientesMatriz();
    } else {
      //this.typeClient = objLimparComobo;
      this.clienteForm.get("matrixEnterprise").reset();
      this.clienteForm.get("matrixEnterprise").disable();
    }
  }

  onChanges() {
    this.clienteForm.get("typeName").valueChanges.subscribe((selectedCountry) => {
      if (selectedCountry != "2: Filial") {
        // this.clienteForm.get('state').reset();
        this.clienteForm.get("matrixEnterprise").disable();
      } else {
        this.clienteForm.get("matrixEnterprise").enable();
      }
    });
  }

  listarClientesMatriz() {
    console.log("It list the matrix client");
    this.clienteService.listarClientesMatriz().subscribe(
      (data) => {
        console.log("It list the matrix client: ", data);
        this.typeClient = data;
      },
      (err) => {
        this.toastr.error("Problemas ao consultar a lista de empresa. " + err.error.msg, "Erro: ");
      }
    );
  }

  changeMatrix(matrixEnterprise) {
    console.log(" Value of the variable ", matrixEnterprise);
  }

  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn) => {
          this.clienteForm.patchValue({
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
        this.clienteForm.patchValue({
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

  cadastrar() {
    event.preventDefault();

    if (!this.clienteForm.valid) return;

    if (this.clienteSelecionado) {
      this.clienteService.update(this.clienteForm.value).subscribe(
        () => {
          this.toastr.success("Cliente atualizado com sucesso.");
          this.router.navigate(["/admin/clientemanter"]);
        },
        (err) => {
          this.toastr.error("Problema ao atualizar o cliente. " + err.keyValue.msg, "Erro: ");
        }
      );
    } else {
      let enterprise = (<any>window).user._id;
      this.clienteService.register(this.clienteForm.value, enterprise).subscribe(
        () => {
          this.toastr.success("Cliente cadastrado com sucesso.");
          this.router.navigate(["/admin/clientemanter"]);
        },
        (err) => {
          this.toastr.error("Problema ao cadastrar o cliente. " + err.keyValue.msg, "Erro: ");
        }
      );
    }
  }

  listAddress() {
    console.log("It list address. It entrance in the method. ");
    let Address: any = this.clienteForm.get("idaddress").value;
    console.log("Value of the field. " + Address);
    this.employeeService.listAddress(Address).subscribe(
      (data) => {
        console.log("It list address: ", data);
        this.address = data;
      },
      (err) => {
        this.toastr.error("Problemas ao consultar a lista de endereço. ", "Erro: ");
      }
    );
  }

  listar() {
    console.log("Listar Empresa");
    let userId = (<any>window).user._id;
    this.employeeService.listaEmpresas(userId).subscribe(
      (data) => {
        console.log("Listar Empresa: ", data);
        this.empresas = data;
      },
      (err) => {
        this.toastr.error("Problemas ao consultar a lista de empresa. " + err.error.msg, "Erro: ");
      }
    );
  }

  voltar() {
    this.router.navigate(["/admin/clientemanter"]);
  }
}
