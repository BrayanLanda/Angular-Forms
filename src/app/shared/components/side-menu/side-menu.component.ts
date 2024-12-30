import { Component } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styles: ``,
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos', route: './reactive/basic' },
    { title: 'Dinamicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth/sign-up' },

  ];
}
