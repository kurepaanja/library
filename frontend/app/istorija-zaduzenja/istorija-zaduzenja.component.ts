import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeKnjiga } from '../model/ZaduzenjeKnjiga';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-istorija-zaduzenja',
  templateUrl: './istorija-zaduzenja.component.html',
  styleUrls: ['./istorija-zaduzenja.component.css']
})
export class IstorijaZaduzenjaComponent implements OnInit {

  constructor(private zaduzenjaServis:ZaduzenjeService,private knjigaServis:KnjigaService,private router:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.listaKnjiga=[];
    this.listaZaduzenja=[];
    this.listaZaduzenjeKnjiga=[]
    this.imaZaduzenja=false;

    this.datumVracDS=true;
    this.datumZadDS=true;
    this.nazivDS=true;
    this.autorDS=true;


    this.zaduzenjaServis.sortDatumVracanjaDS(this.korisnik.korisnickoIme).subscribe((zaduzenjaDB:Zaduzenje[])=>{
      if(zaduzenjaDB.length>0){
        this.imaZaduzenja=true;
      }
      for(let i=0;i<zaduzenjaDB.length;i++){
        this.listaZaduzenja[i]=zaduzenjaDB[i];
      }
      //console.log(this.listaZaduzenja)
      for(let i=0;i<this.listaZaduzenja.length;i++){
        this.knjigaServis.uzmiKnjigu(this.listaZaduzenja[i].idKnjiga).subscribe((knjigaDB:Knjiga)=>{
          this.listaKnjiga[i]=knjigaDB;
          this.listaZaduzenjeKnjiga[i]=new ZaduzenjeKnjiga;
          //dodaj infoKnjige
          this.listaZaduzenjeKnjiga[i].naziv=this.listaKnjiga[i].naziv;
          this.listaZaduzenjeKnjiga[i].slika=this.listaKnjiga[i].slika;
          this.listaZaduzenjeKnjiga[i].idKnjiga=this.listaKnjiga[i].id;
          this.listaZaduzenjeKnjiga[i].autor=[];
          for(let k=0;k<this.listaKnjiga[i].autor.length;k++){
            this.listaZaduzenjeKnjiga[i].autor[k]=this.listaKnjiga[i].autor[k];
          }
          //dodajInfoZaduzenja
          this.listaZaduzenjeKnjiga[i].korisnickoIme=this.listaZaduzenja[i].korisnickoIme;
          this.listaZaduzenjeKnjiga[i].datumZaduzenja=this.listaZaduzenja[i].datumZaduzenja;
          this.listaZaduzenjeKnjiga[i].datumVracanja=this.listaZaduzenja[i].datumVracanja;
        })
      }

      console.log(this.listaZaduzenjeKnjiga)
    })
    
  }
  korisnik:Korisnik;
  listaZaduzenjeKnjiga:ZaduzenjeKnjiga[];
  listaZaduzenja:Zaduzenje[];
  listaKnjiga:Knjiga[];
  imaZaduzenja:boolean;
  

  datumZadDS:boolean;
  datumVracDS:boolean;
  nazivDS:boolean;
  autorDS:boolean;

  f_nazivAS(){
    this.nazivDS=false;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.naziv<b.naziv) return -1;
      if(a.naziv>b.naziv) return 1;
      return 0;
    })
    
  }

  f_nazivDS(){
    this.nazivDS=true;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.naziv>b.naziv) return -1;
      if(a.naziv<b.naziv) return 1;
      return 0;
    })
   
  }

  f_datumZadAS(){
    this.datumZadDS=false;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.datumZaduzenja<b.datumZaduzenja) return -1;
      if(a.datumZaduzenja>b.datumZaduzenja) return 1;
      return 0;
    })


  }

  f_datumZadDS(){
    this.datumZadDS=true;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.datumZaduzenja>b.datumZaduzenja) return -1;
      if(a.datumZaduzenja<b.datumZaduzenja) return 1;
      return 0;
    })
    
  }

  f_autorAS(){
    this.autorDS=false;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.autor[0]<b.autor[0]) return -1;
      if(a.autor[0]>b.autor[0]) return 1;
      return 0;
    })
  }

  f_autorDS(){
    this.autorDS=true;
    this.listaZaduzenjeKnjiga.sort(function(a,b){
      if(a.autor[0]>b.autor[0]) return -1;
      if(a.autor[0]<b.autor[0]) return 1;
      return 0;
    })
  }
  



  f_datumVracAS(){
    this.datumVracDS=false;
    let temp:ZaduzenjeKnjiga[];
    temp=[];
    let index=0;
    for(let i=this.listaZaduzenjeKnjiga.length-1;i>=0;i--){
      temp[index]=this.listaZaduzenjeKnjiga[i];
      index++;
    }
    for(let i=0;i<temp.length;i++){
      this.listaZaduzenjeKnjiga[i]=temp[i];
    }
    console.log(this.listaZaduzenjeKnjiga);

  }

  //klasika
  f_datumVracDS(){
    this.datumVracDS=true;
    let temp:ZaduzenjeKnjiga[];
    temp=[];
    let index=0;
    for(let i=this.listaZaduzenjeKnjiga.length-1;i>=0;i--){
      temp[index]=this.listaZaduzenjeKnjiga[i];
      index++;
    }
    for(let i=0;i<temp.length;i++){
      this.listaZaduzenjeKnjiga[i]=temp[i];
    }
    
  }

  daljeKnjiga:Knjiga;

  routeKnjiga(id) {
    this.knjigaServis.uzmiKnjigu(id).subscribe((data: Knjiga) => {
      this.daljeKnjiga = data;
      localStorage.setItem("knjiga", JSON.stringify(this.daljeKnjiga));
      this.router.navigate(['knjigaMain']);
    })
  }

}
