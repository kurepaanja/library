import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { KorisnikService } from '../korisnik.service';
import { GlobalDB } from '../model/global';
import { Korisnik } from '../model/korisnik';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private globalServis:GlobalService,private zaduzenjeServis:ZaduzenjeService) { }

  ngOnInit(): void {
    
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.globalServis.getDaysReturn().subscribe((data:GlobalDB)=>{
      this.trenutniRok=data[0].daysReturn;
      this.produzenje=data[0].produzenje;
      
    })
  }
  
  korisnik:Korisnik
  novRok:number;
  trenutniRok:number;
  warning:string;
  produzenje:number;
  novoProduzenje:number;
  

  promenaRoka(){
    if(this.novRok!=undefined){
      this.globalServis.promeniRok(this.novRok).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.zaduzenjeServis.changeProduzenje(this.novRok).subscribe(r=>{
            if(r['message']=='ok'){
              this.ngOnInit();
            }
          })
         
        }
      })
    }
    else{
      this.warning="Unesite vrednost"
    }
  } 

  promenaProduzenja(){
    if(this.novoProduzenje!=undefined){
      this.globalServis.promeniProduzenje(this.novoProduzenje).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.ngOnInit();
        }
      })
    }else{
      this.warning="Unesite vrednost"
    }
  }

}
