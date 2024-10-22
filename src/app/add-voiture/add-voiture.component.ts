import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { Marque } from '../model/marque.model';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html',
  styleUrl: './add-voiture.component.css'
})
export class AddVoitureComponent implements OnInit {

  marques!:Marque[];
  newIdMarque!:number;
  newMarque!:Marque;
  newVoiture=new Voiture();
  constructor(private voitureService: VoitureService,private router:Router) { }
  ngOnInit():void{
    this.voitureService.listeMarques().subscribe(marqs =>{
      console.log(marqs);
      this.marques=marqs._embedded.marques;
    });
  }

  addVoiture(){
    this.newVoiture.marque=this.marques.find(marq =>marq.idMarque == this.newIdMarque)!;
    this.voitureService.ajouterVoiture(this.newVoiture).subscribe(voit =>{
      console.log(voit);
      this.router.navigate(['/']);
    });
   /* this.newMarque =this.voitureService.consulterMarque(this.newIdMarque);
    this.newVoiture.marque=this.newMarque;
    this.voitureService.ajouterVoiture(this.newVoiture);
    this.router.navigate(['voitures']);*/  
  }
  

}
