import { Component,OnInit  } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  user = new User();

  erreur=0;
  err : number = 0;
  message : string ="login ou mot de passe erronés..";

  constructor(private authService : AuthService,
    private router: Router) { }

ngOnInit(): void {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(["/"]);
  }
}
  onLoggedin() { 
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
          this.router.navigate(["/"]);
        },
        error: (err: any) => {
        this.err = 1; 
        if (err.error.errorCause=="disabled")
               this.message = "L'utilisateur est désactivé !";
        }
        });
  }

}
