import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-admin-registracija',
  templateUrl: './admin-registracija.component.html',
  styleUrls: ['./admin-registracija.component.css']
})
export class AdminRegistracijaComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService) { }

  ngOnInit(): void {
    this.sviNeregKorisnici=[]
    this.imaZahteva=false;
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.korisnikServis.uzmiNeregKorisnike().subscribe((data:Korisnik[])=>{
      if(data.length>0) this.imaZahteva=true;
      for (let index = 0; index < data.length; index++) {
        this.sviNeregKorisnici[index]=data[index]
        
      }
     // console.log(this.sviNeregKorisnici)
    })
  }
  korisnik:Korisnik
  sviNeregKorisnici:Korisnik[];
  imaZahteva:boolean;

  prihvati(korIme){
    this.korisnikServis.prihvatiKorisnika(korIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }

  odbaci(korIme){
    this.korisnikServis.odbaciKorisnika(korIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })

  }


}
