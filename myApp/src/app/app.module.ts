import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SETTINGS } from '@angular/fire/compat/firestore';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { firebaseApp$ } from '@angular/fire/app';



initializeApp(environment.firebase);


export const firebaseConfig = {
  apiKey: "AIzaSyD8COnwQG4ckY4y3p1bDxdhIzrbTbo-Ejs",
  authDomain: "lab6-f448f.firebaseapp.com",
  projectId: "lab6-f448f",
  storageBucket: "lab6-f448f.appspot.com",
  messagingSenderId: "129909121633",
  appId: "1:129909121633:web:514cdb0d5462bbda398020",
  measurementId: "G-6FSTJXMJGG",
  vapidKey: "BHGbakHg7LQ7Q1WXXgbeiBLs465ofNpds2F-mT2wFRsJT-3ifuCQIjUqLmGmSrHGILWF8Ual6vY9cvRONG68TcY"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule, 
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: SETTINGS, useValue: {} }],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
