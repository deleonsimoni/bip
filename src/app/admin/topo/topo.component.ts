import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  usuario = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.usuario = data.user;
    });
  }

  logout() {
    this.authService.signOut();
    window.location.assign("/");
  }
}