import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatDialogModule],
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent {

}
