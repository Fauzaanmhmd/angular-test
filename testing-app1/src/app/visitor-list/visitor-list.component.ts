import { Component, OnInit } from '@angular/core';
import { VisitorListService } from './visitor.list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  filteredProducts: any[] = [];
  searchQuery: string = '';
  products: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  displayedColumns: string[] = ['name', 'description', 'price', 'address', 'createdDate', 'customerName', 'size', 'delete'];  // Add delete column

  constructor(private productService: VisitorListService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch product data';
      }
    );
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        (product.customerName && product.customerName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (product.name && product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }

  deleteProduct(product: any): void {
    const productId = product._id;
    const index = this.products.indexOf(product);
    if (index >= 0) {
      if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.products.splice(index, 1);
            this.filteredProducts = [...this.products];
            alert('Produk berhasil dihapus');
          }
        );
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
