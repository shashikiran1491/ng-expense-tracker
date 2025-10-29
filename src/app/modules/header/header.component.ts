import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { AddTransactionComponent } from "../add-transaction/add-transaction.component";
import { MonthYearService } from 'src/app/service/month-year-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule]
})
export class HeaderComponent {
    
  token: string = 'token';
  constructor(private dialog: MatDialog, private router: Router,
    private monthYearService: MonthYearService
  ) {}

  logout() {
    sessionStorage.removeItem(this.token);
    this.monthYearService.resetToCurrentMonthYear();
    this.router.navigate(['/login']);
  }
}
