import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { VoitureService } from '../services/voiture.service';
import { Voiture } from '../model/voiture.model';
import { Marque } from '../model/marque.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styles: ``
})
export class UpdateVoitureComponent implements OnInit{

  marques!:Marque[];
  updatedMarqueId! : number;
  currentVoiture = new Voiture();
  myImage! : string;
  uploadedImage!: File; 
  isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,private router :Router,private voitureService :VoitureService){}
  ngOnInit():void {

    this.voitureService.listeMarques().subscribe(marqs =>{
      console.log(marqs);
      this.marques=marqs._embedded.marques;
      
    });
    this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params['id']).subscribe(voit=>{
      this.currentVoiture=voit;
      this.updatedMarqueId=this.currentVoiture.marque.idMarque;
      /*this.voitureService
      .loadImage(this.currentVoiture.image.idImage)
      .subscribe((img: Image) => { this.myImage = 'data:' + img.type + ';base64,' + img.image;
    });*/
    });   
  }
  /*updateVoiture(){

    this.currentVoiture.marque=this.marques.find(marq =>marq.idMarque ==this.updatedMarqueId)!;
    this.voitureService.updateVoiture(this.currentVoiture).subscribe(voit =>{
      this.router.navigate(['']);
    })
    this.currentVoiture.marque=this.voitureService.consulterMarque(this.updatedMarqueId);
    this.voitureService.updateVoiture(this.currentVoiture);
    this.router.navigate(['voitures']);
  }*/

  updateVoiture() { 
    this.currentVoiture.marque = this.marques.find(marq => marq.idMarque == this.updatedMarqueId)!; //tester si l'image du produit a été modifiée 
    /*if (this.isImageUpdated) {
      this.voitureService.uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => { 
        this.currentVoiture.image = img; 
        this.voitureService.updateVoiture(this.currentVoiture)
        .subscribe((voit) => { 
          this.router.navigate(['/']); 
        }); 
      }); 
    } 
    else{ 
      this.voitureService.updateVoiture(this.currentVoiture)
      .subscribe((prod) => { 
        this.router.navigate(['/']); 
      }); 
    } */

    this.voitureService
    .updateVoiture(this.currentVoiture)
    .subscribe((voit)=>{
      this.router.navigate(['/']);
    })
  }

  onImageUpload(event: any) { 
    if(event.target.files && event.target.files.length) { 
      this.uploadedImage = event.target.files[0]; 
      this.isImageUpdated =true; 
      const reader = new FileReader(); 
      reader.readAsDataURL(this.uploadedImage); 
      reader.onload = () => { this.myImage = reader.result as string; 
      }; 
    } 
  }

  onAddImageVoiture() { 
    this.voitureService.uploadImageVoiture(this.uploadedImage, this.uploadedImage.name,this.currentVoiture.idVoiture)
    .subscribe( (img : Image) => { 
      this.currentVoiture.images.push(img); 
    }); 
  }
  supprimerImage(img: Image){ 
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) this.voitureService.supprimerImage(img.idImage).subscribe(() => { 
      //supprimer image du tableau currentProduit.images 
      const index = this.currentVoiture.images.indexOf(img, 0); 
      if (index > -1) { 
        this.currentVoiture.images.splice(index, 1); 
      } 
    }); 
  }



}
