import { Component, OnInit } from '@angular/core';
import { Clothes } from '../clothes';
import { FireauthserviceService } from '../fireauthservice.service';
import { FireserviceService } from '../fireservice.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  valuefromuserTitle:any;
  valuefromuserBrand:any;
  valuefromuserDescription:any;
  valuefromuserSize:any;
  valuefromuserCondiction:any;
  valuefromuserCategory:any;
  valuefromuserPrice:any;
  valuefromuserDuration:any;
  cloth:any;
  ListProductForm:FormGroup;
  downloadURL: Observable<string>;
  fb:any;
  photo: string;
  


  constructor(public fser: FireserviceService, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {

    //this.photo ="../../assets/icon/cloth3.png";
    console.log("FB"+this.fb)

    this.ListProductForm = new FormGroup({

      form1 : new FormControl('', [
        Validators.required,
      ]),
      form2 : new FormControl('', [
        Validators.required,
      ]),
      form3 : new FormControl('', [
        Validators.required,
      ]),
      form4 : new FormControl('', [
        Validators.required,
      ]),
      form5 : new FormControl('', [
        Validators.required,
      ]),
      form6 : new FormControl('', [
        Validators.required,
      ]),
      form7 : new FormControl('', [
        Validators.required,
      ]),
      form8 : new FormControl('', [
        Validators.required,
      ]),
      
    });
  }

  listProduct(){
    console.log(this.valuefromuserTitle);
    console.log(this.valuefromuserBrand);
    console.log(this.valuefromuserDescription);
    console.log(this.valuefromuserSize);
    console.log(this.valuefromuserCondiction);
    console.log(this.valuefromuserCategory);
    console.log(this.valuefromuserPrice);
    console.log(this.valuefromuserDuration);

    let user=this.fser.getUserId();
    console.log(user)

    this.cloth = {
      
      title: this.valuefromuserTitle,
      description: this.valuefromuserDescription,
      condiction: this.valuefromuserCondiction,
      numberBids: 0,
      expirationDate: "",
      price: this.valuefromuserPrice,
      startingPrice: this.valuefromuserPrice,
      size: this.valuefromuserSize,
      brand: this.valuefromuserBrand,
      creatorId: user,
      bitters: [],
      image: this.fb,
      category: this.valuefromuserCategory
    }

    this.fser.createProduct(this.cloth);
  }

  goHome(){
    this.router.navigate(["/homepage"]);
 
}

goFav(){
  this.router.navigate(["/favorites"]);
}

onFileSelected(event) {
  const n = Date.now();
  const file = event.target.files[0];
  const filePath = `Clothes/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`Clothes/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          console.log("url1: "+this.fb);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log("url1: "+url);
      }
    });
}

}
