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

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  apiURL: string = 'http://localhost:8082/users';
  token!: string;
  public regitredUser : User = new User();

  constructor(private router: Router, private http: HttpClient) {
  }

  setRegistredUser(user: User) { 
    this.regitredUser = user; 
  } 
  getRegistredUser() { 
    return this.regitredUser; 
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token && !this.helper.isTokenExpired(token);
  }



  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    console.log("roles: " + this.roles);
    this.loggedUser = decodedToken.sub;
  }
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.decodeJWT();
    }
  }

  isAdmin(): Boolean {
    /*if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >-1) ;*/
    if (!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') >-1);
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false; 
    localStorage.removeItem('jwt');
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

  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
  }
  validateEmail(code : string){ 
    return this.http.get<User>(this.apiURL+'/verifyEmail/'+code); 
  }

}
