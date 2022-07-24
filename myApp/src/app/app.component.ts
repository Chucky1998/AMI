import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import {  OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FireserviceService } from './fireservice.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  statusBar: any;
  title = 'af-notification';
  message:any = null;
  constructor(private router: Router, 
    public afAuth: AngularFireAuth, 
    public platform: Platform,
    public fser: FireserviceService,
    //private splashScreen: SplashScreen
    ) {}

    ngOnInit(): void {
      this.requestPermission();
      this.listen();
    }

  initializeApp() { 
    this.platform.ready().then(() => { 
      this.afAuth.user.subscribe(user => { 
        if(user){ 
          this.router.navigate(["/home"]); 
        } else { 
          this.router.navigate(["/login"]); 
        } 
        }, err => { 
          this.router.navigate(["/login"]); 
        }, () => { 
          //this.splashScreen.hide(); 
      }) 
      this.statusBar.styleDefault(); 
    }); 
  } 
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           localStorage.setItem("token",currentToken);
          
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
