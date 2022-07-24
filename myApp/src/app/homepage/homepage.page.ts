import { Component, OnInit } from '@angular/core';
import { FireauthserviceService } from '../fireauthservice.service';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Clothes } from '../clothes';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  clothesTshirt: Array<Clothes> = [];
  clothesJacket: Array<Clothes> = [];
  clothes: Array<Clothes> = [];
  public searchInput: String = '';
  public searchResult: Array<any> = [];
  public toggle: Boolean = false;
  public selectedInput: any = {};
  public deals: Boolean =false;

  constructor(public navCtrl:NavController,public fser: FireserviceService, private router: Router, private fauth: FireauthserviceService) {
    
  }

  

  ngOnInit() {
    

    this.fser.getCloatsByCategory("T-shirts").subscribe(data => {
      this.clothesTshirt = data.map(e => {
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
      });
    });

    this.fser.getCloatsByCategory("Jackets").subscribe(data => {
      this.clothesJacket = data.map(e => {
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
      });
    });

    //console.log(this.clothes);
    this.fser.getCloathsOrderPrice().subscribe(data => {
      this.clothes = data.map(e => {
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
      });
    });
   
   
  }



  debug(id: string){
    console.log(id);
    this.router.navigate(["/product",{id}]);
   
  }

  goFav(){
    this.router.navigate(["/favorites"]);
  }

  addProduct(){
      this.router.navigate(["/addproduct"]);
   
  }

  close(){
    console.log("close")
  }




  fetchSeries(value: String) {
   
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.clothes.filter(function (series) {
      //return series.name.toLowerCase().startsWith(value.toLowerCase())
      return series.title.toLowerCase().includes(value.toLowerCase());
    });
    this.toggle = false;
    console.log(value);
    
  }

  showDetails(series) {
    /*this.selectedInput = series;
    this.toggle = true;
    this.searchInput = series.title;*/
    let id=series.id;
    this.router.navigate(["/product",{id}])
    this.searchResult= [];
    //console.log(series.id);

  }

  goDeals(){
    this.deals=true;
    console.log(this.deals);
    
  }

  goCategories(){
    this.deals=false;
    console.log(this.deals);
  }

  logout(){
    this.fauth.doLogout()
    .then(res => {
    this.router.navigate(["/login"]);
    }, err => {
    console.log(err);
    })
  }
}
