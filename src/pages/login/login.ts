import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IUser } from "../../../users";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userJsonUrl:string ='assets/users.json';
  users:Array<IUser> = [];
  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private http:HttpClient) {
    this.menu.swipeEnable(false);
    this.loadData();
  }
  loadData(){
    let data :Observable<any>;
    data = this.http.get(this.userJsonUrl);
    data.subscribe( result =>{
      this.users = result;
    } )
  }
  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login(username :string,pass:string) 
  {
    let j:number = 0
    // console.log(username)
    // console.log(pass)
    // console.log("Login")
    // // const username:HTMLElement = document.getElementById("username")
    // // const password:HTMLElement = document.getElementById("password")
    // console.log(this.users)
    if(username === "" || pass === "")
    {
      let forgot = this.forgotCtrl.create({
        title: 'Empty fields',
        message: 
        `Please insert your information.<br/>
         if you are not registred yet click on register now.
        `,
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Ok');
            }
          },
          {
            text: 'Register now',
            handler: data => {
              console.log('Ok');
              this.nav.setRoot(RegisterPage);
            }
          }
        ]
      }); 
      forgot.present();
    }
    else{
      
    for(let user of this.users)
    {
      if(user.email === username )
        {
        if(user.password  === pass)
          {
            j =1
            break;
          }  
        } 
     }
      if(j==0){
         let forgot = this.forgotCtrl.create({
          title: 'Password or Email is wrong',
          message: "Please verify your adress mail and password.",
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                console.log('Ok');
              }
            }
          ]
        });
        forgot.present();
      } else{
        console.log("Home")
        this.nav.setRoot(HomePage);
      }
    }    
  }
    
  verifyLogin(){
    
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
