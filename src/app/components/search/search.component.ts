import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-search',
  imports: [MatInputModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private readonly dataService = inject(DataService);

  searchForm = new FormGroup({
    find: new FormControl(''),
  });

  constructor() {
    this.searchForm.get('find')?.valueChanges.subscribe((change) => {
      this.dataService.highlightedText.set(change ?? '');
    });
  }
}
