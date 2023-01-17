import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { KnjigaService } from '../knjiga.service';
import { GlobalDB } from '../model/global';
import { Knjiga } from '../model/knjiga';
import { Komentar } from '../model/komentar';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { Zahtev } from '../model/zahtev';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-citalac-main',
  templateUrl: './citalac-main.component.html',
  styleUrls: ['./citalac-main.component.css']
})
export class CitalacMainComponent implements OnInit {

  constructor(private router:Router,private knjigaServis:KnjigaService,private globalServis:GlobalService, private zaduzenjaServis:ZaduzenjeService) { }

  ngOnInit(): void {
    this.hasImage=false;
    this.sveKnjige=[]
    this.rokZaVracanjeSkoro=false;
    this.rokZaVracanjeIsteko=false;
    this.triKnjige=false;
    this.rezervacijaDostupna=false;
    this.dodataZahtevanaKnjiga=false;
    this.blokiran=false;
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.listaZaduzenja=[];
    this.listaKnjigaIsteklo=[];
    this.listaKnjigaSkoro=[];
    this.izabranaKnjiga=new Knjiga()
    this.imaObavestenje=false;
    this.prihvaceneDodateKnjige=[];
    this.listaRezervisaneKnjige=[];

    this.knjigaServis.sveKnjige().subscribe((data:Knjiga[])=>{
      
      for(let i=0;i<data.length;i++){
        this.sveKnjige[i]=new Knjiga();
        this.sveKnjige[i]=data[i];
      }
      //console.log(this.sveKnjige);
      
      //BIRAMO KNJIGU
      
      let broj=this.generisiBroj(0,this.sveKnjige.length-1)
      //console.log(broj)
      
      this.izabranaKnjiga=this.sveKnjige[broj];
      if(this.izabranaKnjiga.slika!=""){
        this.hasImage=true;
      }
      //console.log(this.izabranaKnjiga);
      this.knjigaServis.sviKomentariZaKnjigu(this.izabranaKnjiga.id).subscribe((data:Komentar[])=>{
        let sum=0;
        //console.log(data);
        if(data.length>0){
          for (let i = 0; i < data.length; i++) {
            sum+=data[i].ocena;          
          }
          this.prosecnaOcena=sum/data.length;
        }
        else{
          this.prosecnaOcena=0;
        }
        
       
      })

    })

    //OBAVESTENJA

    //BLOKIRAN
    if(this.korisnik.tip=='5') {
      this.imaObavestenje=true;
      this.blokiran=true;
    }

    //ZAKASNELE ILI SKORO ZAKASNELE KNJIGE,TRI KNJIGE,REZERVISANE KNJIGE
    this.globalServis.getDaysReturn().subscribe((globData:GlobalDB)=>{
      this.rok=globData[0].daysReturn
      this.zaduzenjaServis.nadjiZaduzenje(this.korisnik.korisnickoIme).subscribe((zaduzenjaDB:Zaduzenje[])=>{
        let i=0;
        for(let j=0;j<zaduzenjaDB.length;j++){
          if(zaduzenjaDB[j].datumVracanja==""){
            this.listaZaduzenja[i]=zaduzenjaDB[j]
            i++;
          }
        }

        if(this.listaZaduzenja.length==3) {
          this.triKnjige=true;
          this.imaObavestenje=true;
        }
        
        let indexSkoro=0;
        let indexKasni=0;
        let indexRezervacija=0;

        for(let i=0;i<this.listaZaduzenja.length;i++){
          this.knjigaServis.uzmiKnjigu(this.listaZaduzenja[i].idKnjiga).subscribe((knjigaDB:Knjiga)=>{
            
            if(this.listaZaduzenja[i].rezervacija==1){
              this.listaRezervisaneKnjige[indexRezervacija]=knjigaDB;
              indexRezervacija++;
              this.rezervacijaDostupna=true;
              this.imaObavestenje=true;
              console.log("USLA")
            }



            var razlikaDana=this.izracunajRazlikuVremena(this.listaZaduzenja[i].datumZaduzenja)
            console.log(razlikaDana)
            console.log(this.rok)
            let produzenje=0
            
            if (this.listaZaduzenja[i].produzenje > 0) {
              produzenje = this.rok;
            }
            console.log("A")
            if(razlikaDana<(this.rok+produzenje)){
              console.log("B")
              if((this.rok+produzenje)-razlikaDana<=2){
                this.listaKnjigaSkoro[indexSkoro]=knjigaDB
                indexSkoro++;
                this.rokZaVracanjeSkoro=true;
                console.log("C")
                this.imaObavestenje=true;
              }
            }else{
              this.listaKnjigaIsteklo[indexKasni]=knjigaDB;
              indexKasni++;
              this.rokZaVracanjeIsteko=true;
              this.imaObavestenje=true;
            }
          })
        }

        

      })
    })
    //DODATE TRAZENE KNJUGE
    this.knjigaServis.mojiZahtevi(this.korisnik.korisnickoIme).subscribe((data:Zahtev[])=>{
      let i=0;
      for(let j=0;j<data.length;j++){
        if(data[j].prihvacen=='1'){
          this.prihvaceneDodateKnjige[i]=new Zahtev();
          this.prihvaceneDodateKnjige[i]=data[j]
          i++
          this.dodataZahtevanaKnjiga=true;
          this.imaObavestenje=true;
        }
      }
      //console.log(this.prihvaceneDodateKnjige)
    })



   

    
  }

  imaObavestenje:boolean;
  rok:number;
  listaZaduzenja:Zaduzenje[];
  korisnik:Korisnik
  sveKnjige:Knjiga[];
  izabranaKnjiga:Knjiga;
  hasImage:boolean;
  prosecnaOcena:number;

  rokZaVracanjeSkoro:boolean;
  listaKnjigaSkoro:Knjiga[];

  rokZaVracanjeIsteko:boolean;
  listaKnjigaIsteklo:Knjiga[];
  triKnjige:boolean;

  rezervacijaDostupna:boolean;
  listaRezervisaneKnjige:Knjiga[];

  prihvaceneDodateKnjige:Zahtev[];
  dodataZahtevanaKnjiga:boolean;

  blokiran:boolean;



  generisiBroj(min,max){
    let minimum=Math.ceil(min);
    let maksimum=Math.floor(max);
    return Math.floor(Math.random()*(maksimum-minimum+1)+minimum);
  }

  izracunajRazlikuVremena(datumZaduzenja){
    let now=new Date();
    let zaduzenje=new Date(datumZaduzenja)
    return ((now.getTime()-zaduzenje.getTime())/ (1000 * 3600 * 24))
  }
 

}
