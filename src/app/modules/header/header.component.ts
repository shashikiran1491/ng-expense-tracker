import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MonthYearService } from 'src/app/service/month-year-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SocialAuthService } from '@abacritt/angularx-social-login';

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
    private monthYearService: MonthYearService,
    private authService: SocialAuthService
  ) { }

  logout() {
    this.authService.signOut().finally(() => {
      sessionStorage.removeItem('token');
      this.monthYearService.resetToCurrentMonthYear();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  onProfile() {
    throw new Error('Method not implemented.');
  }
}
