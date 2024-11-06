import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  constructor(private router: Router) { }
  navigateProductsPage(name: string) {
    this.router.navigate(['/search'],
      {
        queryParams: { value: name }
      });

  }
}
