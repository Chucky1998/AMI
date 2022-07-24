import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clothes } from '../clothes';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  idsFavorites: any;
  clothesFavorites: Array<Clothes> = [];

  constructor(private router: Router, public fser: FireserviceService) { }




  ngOnInit() {


    this.fser.getUserInfo().subscribe(data=> {

      this.idsFavorites = data.payload.data()["favorites"],
      
      console.log("idsFavorites: "+this.idsFavorites);

      this.fser.getCloathsById(this.idsFavorites).subscribe(data=> {
        this.clothesFavorites = data.map(e => {
          return {
            id : e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            description: e.payload.doc.data()['description'],
            condiction: e.payload.doc.data()['condiction'],
            numberBids: e.payload.doc.data()['numberBids'],
            expirationDate: e.payload.doc.data()['expirationDate'],
            price: e.payload.doc.data()['price'],
            startingPrice: e.payload.doc.data()['startingPrice'],
            size: e.payload.doc.data()['size'],
            brand: e.payload.doc.data()['brand'],
            creatorId: e.payload.doc.data()['creatorId'],
            bitters: e.payload.doc.data()['bitters'],
            image: e.payload.doc.data()['image'],
            category: e.payload.doc.data()['category'],
          };
  
        }
        
        );
      });
       
      })}
       
     
 



  goHome(){
    this.router.navigate(["/homepage"]);
 
}


addProduct(){
  this.router.navigate(["/addproduct"]);

}

debug(){
  console.log(this.clothesFavorites);
}


goPageProduct(id: string){
  console.log(id);
  this.router.navigate(["/product",{id}]);
 
}

}
