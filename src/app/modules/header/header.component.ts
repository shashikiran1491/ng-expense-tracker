import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { AddTransactionComponent } from "../add-transaction/add-transaction.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule]
})
export class HeaderComponent {
    
  token: string = 'token';
  constructor(private dialog: MatDialog, private router: Router) {}

  logout() {
    sessionStorage.removeItem(this.token);
    this.router.navigate(['/login']);
  }
}
