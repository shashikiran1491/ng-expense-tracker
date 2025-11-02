import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MonthYearService } from 'src/app/service/month-year-service';
import {MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class HeaderComponent {

  loggedInUser: string = 'shashikiran1490@gmail.com';
  userInitial: string = 'S';
  token: string = 'token';

  constructor(private dialog: MatDialog, private router: Router,
    private monthYearService: MonthYearService
  ) { }

  logout() {
    sessionStorage.removeItem(this.token);
    this.monthYearService.resetToCurrentMonthYear();
    this.router.navigate(['/login']);
  }

  onProfile() {
    throw new Error('Method not implemented.');
  }
}
