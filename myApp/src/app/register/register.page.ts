import { Component, OnInit } from '@angular/core'; 
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FireauthserviceService } from '../fireauthservice.service';
import { FireserviceService } from '../fireservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup; 
  errorMessage: string = ''; 
  successMessage: string = '';
  showPsw:boolean=false;
  downloadURL: Observable<string>;
  fb:any;
  photo: string;
  

  validation_messages = { 
    'email': [ 
      { type: 'required', message: 'Email is required.' }, 
      { type: 'pattern', message: 'Enter a valid email.' } 
    ], 
    'name': [ 
      { type: 'required', message: 'Email is required.' }, 
      { type: 'minlength', message: 'Name must be at least 4 characters long.' } 
    ], 
    'password': [ 
      { type: 'required', message: 'Password is required.' }, 
      { type: 'minlength', message: 'Password must be at least 6 characters long.' } 
    ] 
  };
  
  
  constructor( 
    public fser: FireserviceService,
    private authService: FireauthserviceService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private storage: AngularFireStorage) { }
    
    
  ngOnInit() { 
    this.photo ="../../assets/icon/user-default.png";
   
    this.validations_form = this.formBuilder.group({ 
      email: new FormControl('', Validators.compose([ 
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
      ])), 
      name: new FormControl('', Validators.compose([ 
        Validators.required, 
        Validators.minLength(4) 
      ])), 
      password: new FormControl('', Validators.compose([ 
        Validators.minLength(6), 
        Validators.required 
      ])), 
     }); 

     console.log(this.showPsw);
  }
  
  
  tryRegister(value){ 

    this.authService.doRegister(value) .then(res => { 
      console.log(res); 
      this.errorMessage = ""; 
      this.successMessage = "Your account has been created. Please log in."; 

      if (this.fb == undefined){
    
        this.fser.createUser(value.email,value.name,"https://firebasestorage.googleapis.com/v0/b/lab6-f448f.appspot.com/o/Users%2F1658213032128?alt=media&token=0a8a3cf9-7ca2-4b7c-867b-88bb645cc040");
      }else{
        this.fser.createUser(value.email,value.name,this.fb);
      }
      this.tryLogin(value);

    }, err => { 
      console.log(err); 
      this.errorMessage = err.message; 
      this.successMessage = ""; 
    }) 
  }
 
 
  goLoginPage(){ 
    this.router.navigate(["/login"]); 
  }

  showpass(){
    
    this.showPsw=!this.showPsw;
    console.log(this.showPsw);
  }

  onFileSelected(event) {


    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `Users/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Users/${n}`, file);
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

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(["/homepage"]);
        let token=localStorage.getItem("token");
        console.log("token: "+token);
        this.fser.updateUserToken(token);
      }, err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }


}
