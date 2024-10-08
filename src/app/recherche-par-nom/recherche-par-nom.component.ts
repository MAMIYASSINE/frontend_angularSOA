import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {

  nomVoiture! : string;
  voitures!: Voiture[];
  allVoitures!: Voiture[];
  searchTerm!: string;
  constructor(private voitureService : VoitureService) { }
  ngOnInit(): void {
    this.voitureService.listeVoitures().subscribe(voits => {
      console.log(voits);
      this.voitures = voits;
      });
      
  }
  rechercherVoits(){
    this.voitureService.rechercherParNom(this.nomVoiture).
    subscribe(voits => {
      console.log(voits);
      this.voitures=voits;});
  }
  onKeyUp(filterText : string)
  { this.voitures = this.allVoitures.filter(item => item.nomVoiture.toLowerCase().includes(filterText)); 
  }
}
