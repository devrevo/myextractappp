import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { File } from '@ionic-native/file/ngx';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../../../users";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  userJsonUrl: string = 'assets/users.json'
  users: Array<IUser> = []
  user = <IUser>{
    fullname: "",
    email: "",
    password: ""
  }


  constructor(public nav: NavController, private http: HttpClient, public forgotCtrl: AlertController, private file: File) {
    let data: Observable<any>;
    data = this.http.get<any>(this.userJsonUrl);
    data.subscribe(result => { this.users = result })
  }
  // register and go to home page
  register(name: string, email: string, pass: string) {
    if (name === "" || email === "" || pass === "") {
      let forgot = this.forgotCtrl.create({
        title: 'Attention',
        message:
          `An error had occured.<br/>
         Please make sure you entered all your informations.
        `,
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
    }
    else {
      this.user.fullname = pass
      this.user.email = email
      this.user.password = pass
      this.users.push(this.user)
      let json = JSON.stringify(this.users)
      console.log(json)

      if (this.userJsonUrl == undefined || this.userJsonUrl == '') {
        console.log('error')
      } else {
        if (this.file) 
        {
          let url = 'C:User/Revo/Documents/Angular/MyExtractApp/src'
          console.log(this.userJsonUrl);
          this.file.writeFile(this.file.dataDirectory,"users.json","Hello world",{replace:true}).then(done =>alert('ok') ).catch(err => alert('ok') )
          //this.file.readAsDataURL('filesystem:http://localhost:8100/assets',"users.json").then(doen => console.log('ok')).catch(err => console.log('err'))
          // this.file.ch(url,'/assets').then(e => console.log('file exist')).catch((err)=> console.log('file doesnt exist'))
          // this.file.removeFile(url,"users.json")
          // console.log('File deleted')
          //  this.file.writeFile(this.userJsonUrl,"users.json",json)
          //  console.log('File created')
        }
        // fs.writeFile('users.json',json,(err)=>{
        // if(err){
        //   console.log(err)
        //   return;
        // }
        // console.log('file created')

        let forgot = this.forgotCtrl.create({
          title: 'Registred',
          message:
            `Thank You!<br/>
              You are all set please log in to our app.
              `,
          buttons: [
            {
              text: 'Login Now',
              handler: data => {
                console.log('Ok');
                this.nav.setRoot(LoginPage);
              }
            }
          ]
        });
        forgot.present();
        // }
      }
    }

  }
  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }

}
