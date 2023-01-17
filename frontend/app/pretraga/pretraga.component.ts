import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private knjigaServis: KnjigaService, private router: Router) { }

  ngOnInit(): void {
    this.potraga = false;
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.zanrovi = [];
    this.izabraniZanrovi=[]
    //this.zanr = "Fantazija,Drana,Mitologija,Klasicna knjizevnost";
    //console.log(this.zanr)
    //console.log(this.sviZanrovi)
    this.pronadjeneKnjige = new Array<Knjiga>;
    this.nemaKnjiga=false;
  }

  toppings=new FormControl("");
  nemaKnjiga:boolean
  korisnik: Korisnik;
  potraga: boolean
  autor: string;
  naslov: string;
  pronadjeneKnjige: Knjiga[];
  zanrovi: string[];
  izdavac: string
  godinaOd: string
  godinaDo: string
  zanr:string;

  izabraniZanrovi:string[];
  test(){
    let s=this.toppings.value[0]
    for(let i=0;i<this.toppings.value.length;i++){
      this.izabraniZanrovi[i]=this.toppings.value[i]
    }
    console.log(this.izabraniZanrovi)
   
  }


  potrazi() {
    let odG;
    let doG;
    if (this.autor == undefined) this.autor = "";
    if (this.naslov == undefined) this.naslov = "";
    if (this.izdavac == undefined) this.izdavac = "";
    if (this.godinaOd == undefined) {
      odG = "0"
    }
    else {
      odG = this.godinaOd
    }
    if (this.godinaDo == undefined) {
      doG = '3000';
    } else {
      doG = this.godinaDo;
    }
    for(let i=0;i<this.toppings.value.length;i++){
      this.izabraniZanrovi[i]=this.toppings.value[i]
    }


  //   console.log(this.zanrovi)
  //  this.zanr=this.zanrovi.join()
  //  console.log(this.zanrovi.length>0)

  //   console.log('Ovde'+this.zanr)


    this.knjigaServis.nadjiKnjigu(this.autor, this.naslov, this.izdavac, "").subscribe((data: Knjiga[]) => {
      
      if (data != null) {
        //console.log(data);
        //this.pronadjeneKnjige = new Array<Knjiga>;
        let index = 0;
        this.pronadjeneKnjige = [];
        switch(this.izabraniZanrovi.length>0){
          case true:{
            console.log("IMA ZANROVA");
            //idemo kroz sve knjige gledamo dal imaju zanr koji nam treba
            for(let i=0;i<data.length;i++){
              let god = data[i].godinaIzdanja;
              if (this.izmedjuDatuma(odG, doG, god)) {
                if(this.imaZanr(data[i].zanr)){
                  if(this.imaPisca(data[i].autor)){
                    this.pronadjeneKnjige[index] = data[i];
                    index++;
                  }
                }
              }
            }
            break;
          }
          case false:{
            for(let i=0;i<data.length;i++){
              let god = data[i].godinaIzdanja;
              if (this.izmedjuDatuma(odG, doG, god)) {
                if(this.imaPisca(data[i].autor)){
                  this.pronadjeneKnjige[index] = data[i];
                  index++;
                }
                
              }
            }
          }
        }
        this.potraga = true;
        //console.log(this.pronadjeneKnjige);
        this.toppings=new FormControl("");
        if(this.pronadjeneKnjige.length==0) this.nemaKnjiga=true;

      }else{
        this.potraga=false
      }
    })
  }

  izmedjuDatuma(datumOd, datumDo, godina) {
    if (godina < datumDo && godina > datumOd) return true;
    return false
  }

  imaPisca(mojiPisci){
    let str=mojiPisci.join();
    if(str.includes(this.autor)) return true;
    return false;

  }



  imaZanr(mojiZanrovi){
    for(let i=0;i<mojiZanrovi.length;i++){
      for(let j=0;j<this.izabraniZanrovi.length;j++){
        if(mojiZanrovi[i]==this.izabraniZanrovi[j]) return true;
      }
    }

    return false;

  }

  routeKnjiga(knjiga) {
    if (this.korisnik.tip == '5') {
      alert('Trenutno ste blokirani i ne mozete da vidite detalje o knjizi')
      return;
    }
    if (this.korisnik) {
      localStorage.setItem("knjiga", JSON.stringify(knjiga));
      this.router.navigate(['knjigaMain']);
    }
    else {
      //NE MOZE NA STRANICU SA DETALJIMA
      alert("Morate se ulogovati da vidite detalje o knjizi");
    }
  }

}
