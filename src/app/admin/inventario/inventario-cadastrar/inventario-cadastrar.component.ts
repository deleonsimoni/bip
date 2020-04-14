import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from '../../../resources/services/admin/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InventarioService } from '../../../resources/services/admin/inventario.service';

@Component({
  selector: 'app-inventario-cadastrar',
  templateUrl: './inventario-cadastrar.component.html',
  styleUrls: ['./inventario-cadastrar.component.scss']
})
export class InventarioCadastrarComponent implements OnInit {

  inventaryForm: FormGroup;
  inventarySelected: any;


  constructor(private fb: FormBuilder, private inventarioService: InventarioService, private toastr: ToastrService,
    private router: Router) {
    this.inventarySelected = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {

    this.inventaryForm = this.fb.group({
      fullname: ['', [Validators.required]],
      _id: [''],
      observations: [''],
    });


    if (this.inventarySelected) {
      this.inventaryForm.patchValue(
        this.inventarySelected
      );
    }
  }

  register() {
    event.preventDefault();

    if (!this.inventaryForm.valid) return;

    if (this.inventarySelected) {
      this.inventarioService.update(this.inventaryForm.value)
        .subscribe(() => {
          this.toastr.success('Inventário atualizado com sucesso');
          this.router.navigate(['/admin/inventariolista']);
        }, err => {
          this.toastr.error('' + err, 'Erro: ');
        });
    } else {
      this.inventarioService.register(this.inventaryForm.value)
        .subscribe(() => {
          this.toastr.success('Inventário criado com sucesso. Agora você pode complementar com as informações');
          this.router.navigate(['/admin/inventariolista']);
        }, err => {
          this.toastr.error('Email já cadastrado ', 'Erro: ');
        });
    }
  }

  return() {
    this.router.navigate(['/admin/inventariolista']);
  }









}