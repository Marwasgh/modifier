import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service'
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  image: any;
  category!: Categorie;
  categories: Categorie []=[];
  constructor(private cs: ProduitService, public formBuilder: FormBuilder, private cats: CategorieService ,private router :Router)
  { 
  }
  productForm: Product = {
    _id: '',
    nom: '',
    categorie: this.category,
    description: '',
    prix: 0,        
    image: ''
  };

  ngOnInit(): void {
    this.listcategories()
  }
  loadImage(img: any) {
    this.image = img.target.files[0];
    console.log(this.image);
  }
  addPro() {
    this.cs.addProduit(this.productForm,this.image).subscribe(
      (data) => {
     
          console.log(data);
         alert('Produit enregistrée avec succès!');  
          this.router.navigate(['/admin']);
          //this.listProduct();
        },
        err => console.log(err.toString()))
  }

  listcategories() {
    this.cats.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}