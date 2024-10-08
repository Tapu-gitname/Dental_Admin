import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private service: AuthService) {}
  logout(){
    this.service.logout()
    this.service.logoutAndClearSession()
  }
}
