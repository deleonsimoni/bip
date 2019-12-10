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

  inventarioForm: FormGroup;
  clienteSelecionado: any;
  inventarioSelecionado: any;

  constructor(private fb: FormBuilder, private inventarioService: InventarioService, private toastr: ToastrService,
    private router: Router) {
      this.inventarioSelecionado = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.inventarioForm = this.fb.group({
      userCreate: [(<any>window).user._id],
      cliente: ['', [Validators.required]],
      collectors: this.fb.group({
        user: ['', [Validators.required]],
        collector: ['', [Validators.required]]
      }),
      
    });
  }
}