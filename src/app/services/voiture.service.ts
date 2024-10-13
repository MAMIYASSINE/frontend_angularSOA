import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Marque } from '../model/marque.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MarqueWrapped } from '../model/MarqueWrapped';
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
  constructor(private http:HttpClient) {
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
    return this.http.get<Voiture[]>(this.apiURL); 
  }
  /*listeVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.apiURL).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la récupération des voitures', error);
        return throwError(error); // gérer l'erreur de manière appropriée
      })
    );
  }*/
  
  ajouterVoiture(voit: Voiture):Observable<Voiture> {
    return this.http.post<Voiture>(this.apiURL,voit,httpOptions);
  }
  supprimerVoiture(id : number) {
    //supprimer le produit prod du tableau produits 

    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);


       /* const index = this.voitures.indexOf(v, 0);
    if (index > -1) {
      this.voitures.splice(index, 1);
    }*/
    //ou Bien 
    /* this.produits.forEach((cur, index) => { if(prod.idProduit === cur.idProduit) { this.produits.splice(index, 1); } }); */
  }
  consulterVoiture(id: number): Observable<Voiture> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Voiture>(url);
    /*this.voiture = this.voitures.find(v => v.idVoiture == id)!; 
    return this.voiture;*/
  }
  updateVoiture(v: Voiture):Observable<Voiture> {

    return this.http.put<Voiture>(this.apiURL,v,httpOptions);
   /* this.supprimerVoiture(v.idVoiture);
    this.ajouterVoiture(v);
    this.trierVoitures();*/
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
