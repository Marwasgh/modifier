import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie';
import { Product } from 'src/app/models/product';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {
  products: Product[] = [];
  categories: Categorie[] = [];
  productImage!: any;
  categorie!: Categorie;
  currentProduit = new Product();

 constructor(private router :Router,private produitService: ProduitService ,private cs : CategorieService , private route: ActivatedRoute) { }
     
 produitForm: Product = {
      _id: '',
      nom: '',
      description: '',
      categorie : this.categorie,
      prix: 0,   
      image: ''
    };

    message = '';

  ngOnInit(): void {
    this.message = '';
    this.listCategories();
    this.getProductByID(this.route.snapshot.params.id);
  }

  updateProduit(): void {
    this.produitService.updateProduct(this.produitForm._id, this.produitForm)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.router.navigate(['/admin']);
        },
        error => {
          console.log(error);
        });
  }
  listCategories() {
    this.cs.getCategories().subscribe(
      (data) => {
        this.categories= data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadImage(img: any) {
    this.productImage = img.target.files[0];
    console.log(this.productImage);
   
}
  getProductByID(id: String): void {
    this.produitService.get(id)
      .subscribe(
        data => {
          this.produitForm = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
 

}


 

  
  
   
  
 

