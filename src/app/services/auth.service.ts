import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"yassine","password":"123","roles":['USER']} ];
                   */
private helper = new JwtHelperService();

public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];
apiURL: string = 'http://localhost:8082/users'; 
token!:string;

  constructor(private router : Router,private http : HttpClient) {
    /*this.loadToken();
    this.isloggedIn = this.isLoggedIn();*/ // Définir isloggedIn lors de l'initialisation
   }

  /*isLoggedIn(): boolean {
  const token = localStorage.getItem('access_token');  // Récupérer le token
  return !!token && !this.helper.isTokenExpired(token);
}*/
isLoggedIn(): boolean {
  const token = localStorage.getItem('jwt');
  return !!token && !this.helper.isTokenExpired(token);
}



  login(user : User) { 
    return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'}); 
  } 
  saveToken(jwt:string){ 
    localStorage.setItem('jwt',jwt); 
    this.token = jwt; 
    this.isloggedIn = true;
    this.decodeJWT(); 
  }

  getToken():string {
    return this.token;
  }

  decodeJWT()
  {   
    if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    console.log("roles: "+this.roles);
    this.loggedUser = decodedToken.sub;
  }
  loadToken() { 
    this.token = localStorage.getItem('jwt')!; 
    if (this.token) {
      this.decodeJWT(); 
    }
  }
  /*loadToken() { 
    if (typeof window !== 'undefined') { // Vérification si l'environnement est côté navigateur
      this.token = localStorage.getItem('jwt')!;
      if (this.token) {
        this.decodeJWT();
      }
    }
  }*/

 /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  isAdmin():Boolean{
    /*if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >-1) ;*/
    if (!this.roles) 
        return false; 
    return this.roles.indexOf('ADMIN') >=0;
  }
  logout() {
    this.loggedUser = undefined!; 
    this.roles = undefined!; 
    this.token= undefined!; 
    this.isloggedIn = false; localStorage.removeItem('jwt'); 
    this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean { 
    return this.helper.isTokenExpired(this.token); 
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  
 /* getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }*/
  
}
