import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [RouterModule, MatButtonModule],
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {}
