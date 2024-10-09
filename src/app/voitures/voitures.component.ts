import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent implements OnInit {
  voitures?: Voiture[];
  constructor( private voitureService :VoitureService,public authService: AuthService) {
    //this.voitures=voitureService.listeVoitures();
  }
  ngOnInit(): void {
    this.chargerVoitures();
  }
  chargerVoitures(){
    this.voitureService.listeVoitures().subscribe(voits =>{
      console.log(voits);
      this.voitures=voits;
    })
  }
 
  supprimerVoiture(v: Voiture){
    //console.log(v);
    let conf = confirm("Etes-vous sûr ?");
     if (conf){

      this.voitureService.supprimerVoiture(v.idVoiture).subscribe(()=>{
      console.log("voiture supprimé");
      this.chargerVoitures();
    });
     }
  }
}
