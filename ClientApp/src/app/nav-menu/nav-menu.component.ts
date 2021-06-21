import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isExpanded = false;
  public isAuthenticated: boolean;

  constructor(
    private oktaService: OktaAuthService
  ) {
    this.oktaService.$authenticationState.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  public collapse() {
    this.isExpanded = false;
  }

  public toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public logout() {
    this.oktaService.signOut();
  }
}
