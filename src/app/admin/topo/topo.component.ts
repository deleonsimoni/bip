import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  usuario: any;

  constructor() { }

  ngOnInit() {
    this.usuario = (<any>window).user;
  }
}