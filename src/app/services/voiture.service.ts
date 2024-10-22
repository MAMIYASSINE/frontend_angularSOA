import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Marque } from '../model/marque.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MarqueWrapped } from '../model/MarqueWrapped';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};
@Injectable({
  providedIn: 'root'
})

export class VoitureService {

  apiURL: string = 'http://localhost:8081/voitures/api';
  apiURLMarque: string ='http://localhost:8081/voitures/marque';
  marques!:Marque[];
  voitures: Voiture[];
  voiture!: Voiture;
  constructor(private http:HttpClient,
    private authService : AuthService) {
    // Initialisation des marques
    /*this.marques = [
      {
        idMarque: 1,
        nomMarque: "Toyota",
        descriptionMarque: "Marque japonaise réputée pour sa fiabilité."
      },
      {
        idMarque: 2,
        nomMarque: "Tesla",
        descriptionMarque: "Marque américaine spécialisée dans les voitures électriques."
      },
      {
        idMarque: 3,
        nomMarque: "BMW",
        descriptionMarque: "Constructeur allemand connu pour ses voitures de luxe."
      }
    ];*/

    // Initialisation des voitures avec association des marques
    this.voitures = [
      {
        idVoiture: 1,
        nomVoiture: "Toyota Corolla",
        nbPortes: 4,
        puissance: 120,
        type: "Berline",
        prixVoiture: 15000.5,
        dateCreationVoiture: new Date("03/05/2015"),
        marque: {
          idMarque: 1,
          nomMarque: "Toyota",
          descriptionMarque: "Marque japonaise réputée pour sa fiabilité."
        }  // Toyota
      },
      {
        idVoiture: 2,
        nomVoiture: "Tesla Model S",
        nbPortes: 4,
        puissance: 670,
        type: "Électrique",
        prixVoiture: 75000.75,
        dateCreationVoiture: new Date("08/14/2020"),
        marque: {
          idMarque: 2,
          nomMarque: "Tesla",
          descriptionMarque: "Marque américaine spécialisée dans les voitures électriques."
        }  // Tesla
      },
      {
        idVoiture: 3,
        nomVoiture: "BMW X5",
        nbPortes: 5,
        puissance: 300,
        type: "SUV",
        prixVoiture: 60000.9,
        dateCreationVoiture: new Date("10/22/2018"),
        marque: {
          idMarque: 3,
          nomMarque: "BMW",
          descriptionMarque: "Constructeur allemand connu pour ses voitures de luxe."
        }  // BMW
      }
    ];
  }
  listeVoitures(): Observable<Voiture[]> {
    
    return this.http.get<Voiture[]>(this.apiURL+"/all"); 
  }


  ajouterVoiture(voit: Voiture):Observable<Voiture> {
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
      return this.http.post<Voiture>(this.apiURL+"/addvoiture",voit);
  }
  supprimerVoiture(id : number) {
    //supprimer le produit prod du tableau produits 

    const url = `${this.apiURL}/delvoiture/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
      return this.http.delete(url);
  }
  consulterVoiture(id: number): Observable<Voiture> {
    const url = `${this.apiURL}/getbyid/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
      return this.http.get<Voiture>(url);
    /*this.voiture = this.voitures.find(v => v.idVoiture == id)!; 
    return this.voiture;*/
  }
  updateVoiture(v: Voiture):Observable<Voiture> {
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
      return this.http.put<Voiture>(this.apiURL+"/updatevoiture",v);
  }
  trierVoitures(){
    this.voitures=this.voitures.sort((n1,n2)=>{

      if(n1.idVoiture!>n2.idVoiture!){
        return 1;
      }
      if (n1.idVoiture!<n2.idVoiture!){
        return -1;
      }
      return 0;
    });
  }


  listeMarques():Observable<MarqueWrapped>{
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
    return this.http.get<MarqueWrapped>(this.apiURLMarque);
  }

  consulterMarque(id:number):Marque{
    return this.marques.find(maq =>maq.idMarque ==id)!;
  }

  rechercheParMarque(idMarq: number):Observable<Voiture[]>{
    const url = `${this.apiURL}/voituresmarque/${idMarq}`;
    return this.http.get<Voiture[]>(url);
  }



  rechercherParNom(nom: string):Observable< Voiture[]> 
  { 
    const url = `${this.apiURL}/voitsByName/${nom}`; 
    return this.http.get<Voiture[]>(url); 
  }
  ajouterMarque( marq: Marque):Observable<Marque>
  { 
    return this.http.post<Marque>(this.apiURLMarque, marq, httpOptions); 
  }
  supprimerMarque(id:number){
    const url = `${this.apiURLMarque}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
