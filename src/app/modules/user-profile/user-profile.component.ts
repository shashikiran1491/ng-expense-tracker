import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth-service';
import { UserDetails } from 'src/app/model/user-details';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user: UserDetails | null = null;
  userInitial?: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe({
      next: (response: UserDetails) => {
        if (response) {
          this.user = response;
          this.userInitial = this.user.firstName.charAt(0).toUpperCase();
        }
      },
      error: err => console.error('Error loading user data:', err)
    });
  }

}
