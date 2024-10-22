import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'MesVoitures_2';

  constructor(public authService: AuthService,
    private router :Router){}
    ngOnInit() {
      this.authService.loadToken();
      if (this.authService.getToken()==null || 
          this.authService.isTokenExpired())
            this.router.navigate(['/login']);
  
    }
    /*ngOnInit(): void {
      this.authService.loadToken(); // Charger le token depuis le localStorage
  
      // Vérifier si le token est invalide ou expiré
      if (!this.authService.getToken() || this.authService.isTokenExpired()) {
        this.authService.isloggedIn = false; // Mettre à jour l'état de connexion
        this.router.navigate(['/login']); // Rediriger vers la page de login
      } else {
        this.authService.isloggedIn = true; // L'utilisateur est connecté
      }
    }*/
  
    onLogout(){
      this.authService.logout();
    }
}
