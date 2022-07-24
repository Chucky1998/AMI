import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clothes } from '../clothes';
import { FireserviceService } from '../fireservice.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  id: string;
  sub: any;
  myControl: FormControl;
  cloth: Clothes;
  valuefromuser:any;
  BidForm:FormGroup;
  hideBol:boolean;
  priceMin: number;
  priceError : boolean;
  userId: any;
  favorite: boolean;
  userInfo: any;
  productTab: boolean;
  bitters:any;



  constructor(private route: ActivatedRoute, public fser: FireserviceService, private router: Router, private alertCtrl:AlertController) {
    this.cloth = {
      id: "teste",
      title: "teste",
      description: "teste",
      condiction: "teste",
      numberBids: 0,
      expirationDate: "teste",
      price: 0,
      startingPrice: 0,
      size: "teste",
      brand: "teste",
      creatorId: "teste",
      bitters: "teste",
      image: "teste",
      category: "teste"
    }

    this.hideBol=true;
    this.priceError=false;
    this.userId=this.fser.getUserId();
    this.favorite=false;
    this.productTab=true;
    this.userInfo={
      photo:"../../assets/icon/user-default.png"
    }
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("product id "+this.id);
    });

    /*
    this.fser.getCloath(this.id).subscribe(data => {
      this.cloth = {
        id: data.payload.id,
        title: "teste",
        description: "teste",
        condiction: "teste",
        numberBids: 0,
        expirationDate: "teste",
        price: 0,
        startingPrice: 0,
        size: "teste",
        brand: "teste",
        creatorId: "teste",
        bitters: "teste",
        image: "teste",
        category: "teste"
      }
    });*/

    this.fser.getCloath(this.id).subscribe(data=>
      //console.log(data.payload.data()["title"])
      this.cloth = {
        id: data.payload.id,
        title: data.payload.data()["title"],
        description: data.payload.data()["description"],
        condiction: data.payload.data()["condiction"],
        numberBids: data.payload.data()["numberBids"],
        expirationDate: data.payload.data()["expirationDate"],
        price: data.payload.data()["price"],
        startingPrice: data.payload.data()["startingPrice"],
        size: data.payload.data()["size"],
        brand: data.payload.data()["brand"],
        creatorId: data.payload.data()["creatorId"],
        bitters: data.payload.data()["bitters"],
        image: data.payload.data()["image"],
        category: data.payload.data()["title"]
      }
      );  
      
      this.BidForm = new FormGroup({
        bid : new FormControl('', [
          Validators.required,
          //Validators.min(this.cloth.price),
          Validators.max(999),
        ])
      });

      this.fser.getUserInfo().subscribe(data=> {

        this.userInfo = {
          email: data.payload.data()["email"],
          favorites: data.payload.data()["favorites"],
          name: data.payload.data()["name"],
          photo: data.payload.data()["photo"]
        }
        console.log("user info name: "+this.userInfo.name);
        console.log("user info info: "+this.userInfo.photo);
        this.favorite=false;
        this.userInfo.favorites.forEach(element => {
         
          if (element == this.id){
            console.log("fav");
            this.favorite=true;
          }
        });
       });  


       this.fser.getCloath(this.id).subscribe(data => {
       this.bitters = data.payload.data()["bitters"];
        

       });

       
    
  }

  placeBid(){
    console.log(this.valuefromuser);
    
    let bitterMap={
      key:this.userId,
      price:this.valuefromuser,
      name:this.userInfo.name,
      photo:this.userInfo.photo

    }
   
    this.fser.updateBitter(this.id,bitterMap);
  }

 async showAlert(){
  
    const alert = await this.alertCtrl.create({
      cssClass:'my-custom-class',
      header: 'Confirm bid?',
      message: "<ion-list> <ion-item><p><strong>Minimal bid amount:&nbsp;&nbsp;</strong>"+this.priceMin+"€</p></ion-item>"+
                          "<ion-item><p><strong>Your bid amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>"+this.valuefromuser+"€</p></ion-item>"+
                          "<ion-item><p><strong>Current bits number: </strong>"+this.cloth.numberBids+"</p></ion-item>"+
               "</ion-list>",
      buttons:[
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah)=>{
            console.log("Confirm Cancel: blah")
          }
        },{
          text: 'Yes',
          cssClass: 'confirm',
          handler: ()=>{
            console.log("Confirm OK: Okay")
            this.placeBid();
          }
        }
      ]

    })
    await alert.present();
  }

  hide(){
    this.hideBol=!this.hideBol;
    console.log(this.hideBol);
  }

  show(){
    this.hideBol=false;
    console.log(this.hideBol);
  }

  showVal(){
  
    this.priceMin=this.cloth.price+1;
    //console.log(this.priceMin);
    if (this.priceMin > this.valuefromuser){
      this.priceError=true;
    }else{
      this.priceError=false;
    }

    if(this.valuefromuser == null){
      this.priceError=false;
    }

  }

  changeFav(){
    if(this.favorite){
      console.log("remove fav");
      this.favorite=false;
      this.fser.removeUserFavorite(this.id)
      this.fser.removeUserFavoriteCloth(this.id);
    }
    else{
      console.log("add fav");
      this.favorite=true;
      this.fser.addUserFavorite(this.id)
      this.fser.addUserFavoriteCloth(this.id);
    }
    
  }

  goProduct(){
    console.log("prod")
    this.productTab=true;
  }
  goHistory(){
    console.log("hist")
    this.productTab=false;
  }



}
