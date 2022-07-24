import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { FireauthserviceService } from '../fireauthservice.service';
import { FireserviceService } from '../fireservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  errorMessage: string = '';
  public validations_form: FormGroup;
  showPsw:boolean=false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength', message: 'Password must be at least 5 characters long.' }
 ]
  };
  constructor(
    public fser: FireserviceService,
    private authService: FireauthserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
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
  goRegisterPage() {
    this.router.navigate(["/register"]);
  }

  showpass(){
    
    this.showPsw=!this.showPsw;
  }

}
