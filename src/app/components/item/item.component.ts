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
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  itemDetails = signal<ListItem | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getItemDetails(params.name);
    });
  }

  private getItemDetails(name: string) {
    this.dataService.getListItem(name).subscribe((value: ListItem) => {
      // check if item  exists
      if (value) {
        this.itemDetails.set(value);
      } else {
        // otherwise return to list page
        this.router.navigate(['/list']);
      }
    });
  }
}
