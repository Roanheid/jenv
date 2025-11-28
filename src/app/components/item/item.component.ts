import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListItem } from '../../services/data/data.interace';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-item',
  imports: [RouterModule, MatButtonModule],
  standalone: true,
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  itemDetails = signal<ListItem | null>(null);

  ngOnInit(): void {
    // get item details based on page name
    this.route.params.subscribe((params) => {
      this.getItemDetails(params.name);
    });
  }

  private getItemDetails(name: string) {
    // get single list item by name
    this.dataService.getListItem(name).subscribe((value: ListItem) => {
      // check if item exists
      if (value) {
        this.itemDetails.set(value);
      } else {
        // otherwise return to list page
        this.router.navigate(['/list']);
      }
    });
  }
}
