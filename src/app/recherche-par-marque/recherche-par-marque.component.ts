import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: ``
})
export class RechercheParMarqueComponent implements OnInit {
  voitures! : Voiture[]; 
  IdMarque! : number; 
  marques! : Marque[];
  constructor(private voitureService:VoitureService){}
  ngOnInit(): void {
    this.voitureService.listeMarques().subscribe(marqs =>{
      this.marques=marqs._embedded.marques;
      console.log(marqs);
    })
  }
  onChange() {
    this.voitureService.rechercheParMarque(this.IdMarque).subscribe(voits => {this.voitures=voits});
  }

}
