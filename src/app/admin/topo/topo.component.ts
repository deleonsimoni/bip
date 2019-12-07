import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  usuario = {};

  constructor() { }

  ngOnInit() {
    if ((<any>window).user)
      this.usuario = (<any>window).user;
  }
}