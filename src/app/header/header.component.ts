import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};
  areaAdministrativa: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  esconderMenu() {
    const target: HTMLElement = document.getElementById("accordionSidebar");
    target.classList.toggle('d-none');
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/auth/login');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }
}