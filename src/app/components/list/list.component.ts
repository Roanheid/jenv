import { Component, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ListItem } from '../../services/data.interace';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly dataService = inject(DataService);

  items = signal<ListItem[]>([]);

  constructor() {
    this.dataService.getListItems().subscribe((items: ListItem[]) => {
      this.items.set(items);
    });
  }
}
