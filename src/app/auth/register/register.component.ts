import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidator } from '../../resources/custom-validator';
import { ToastrService } from 'ngx-toastr';
//import { NgModel } from '@angular/forms';
import { UtilService } from "../../services/util.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  address: any[];
  numberAddress: any;
  complementAddress: any;
 

  constructor(private fb: FormBuilder, private utilService: UtilService, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    console.log('It list the data of the user 1. ');

    this.userForm = this.fb.group({
      cpf: ['', [CustomValidator.isValidCpf]],
      numberAddress: ['', [Validators.required]],
      complementAddress: [''],
      email: ['', [Validators.email, Validators.required]],
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
      master: this.fb.group({
        fullname: ['', [Validators.required]]
      }),
      phones: this.fb.group({
        main: ['', [Validators.required]],
        secundary: [''],
      }),
      address: this.fb.group({
        street: [''],
        zip: [''],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
      })
    });
    console.log('It list the data of the user 2. ');
  }

  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn) => {
          this.userForm.patchValue({
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
        this.userForm.patchValue({
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

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  /*  userForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required]),
      main: new FormControl('', [Validators.required]),
      secundary: new FormControl(''),
      street: new FormControl(''),
      complement: new FormControl(''),
      number: new FormControl(''),
      zip: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
    }) */

  get fullname(): any { return this.userForm.get('fullname'); }
  get email(): any { return this.userForm.get('email'); }
  get password(): any { return this.userForm.get('password'); }
  get repeatPassword(): any { return this.userForm.get('repeatPassword'); }

  findEmail(): any {
    console.log("It find email. It entrance in the method. ");
    let idEmail: any = this.userForm.get("email").value;
    console.log("Value of the field. " + idEmail);
    this.authService.findEmail(idEmail).subscribe(
      (data) => {
        console.log("It find data: ", data);
        if (!data.objUser){
            this.register();
         }
         else {
            this.toastr.warning('Este e-mail encontra-se cadastrado.');
         }
      },
      (err) => {
          this.toastr.error("Problemas ao consultar e-mail. ", "Erro: ");
        
      }
      
    );
   }

  register() {
    console.log("This method is register 11");
    event.preventDefault();
    if (!this.userForm.valid) return;
    console.log("This method is register 2 ");
    // this.userForm.controls['numberAddress'].setValue(this.numberAddress);
    // this.userForm.controls['complementAddress'].setValue(this.complementAddress);
    //let enterprise = (<any>window).user._id;
    this.authService.register(this.userForm.value)
        .subscribe(() => {
          console.log("This method is register 3 ");
          this.toastr.success('Funcionário cadastrado com sucesso.');
          this.router.navigate(['']);
        }, err => {
          this.toastr.error('Problema ao cadastrar o usuário. ', 'Erro: ');
     });
     // }
     // else {
      //  this.toastr.success('Este e-mail encontra-se cadastrado.');
      //}
  }
}
