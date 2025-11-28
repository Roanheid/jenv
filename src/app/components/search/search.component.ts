import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-search',
  imports: [MatInputModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private readonly dataService = inject(DataService);

  searchForm = new FormGroup({
    find: new FormControl(''),
  });

  ngOnInit() {
    this.searchForm.get('find')?.valueChanges.subscribe((change) => {
      // update highlighted text value
      this.dataService.highlightedText.set(change ?? '');
    });
  }
}
