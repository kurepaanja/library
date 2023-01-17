import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../model/knjiga';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';

class KnjgaCount{
  num: Number;
  knjiga:Knjiga;

  constructor(){
    this.num=new Number
    this.knjiga=new Knjiga;
  }
}

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private router:Router,private zaduzenjeServis:ZaduzenjeService,private knjigaServis:KnjigaService) { }

  ngOnInit(): void {
    localStorage.clear()
    this.listaKnjigaCount=[];
    this.listaKnjiga=[]
    this.top3Knjige=[]
    this.brojKnjiga=0;
    this.knjigaServis.sveKnjige().subscribe((knjigeDB:Knjiga[])=>{
      for (let index = 0; index < knjigeDB.length; index++) {
        this.listaKnjiga[index]=knjigeDB[index];        
      }
      console.log(this.listaKnjiga)
      for (let index = 0; index < this.listaKnjiga.length; index++) {
        this.zaduzenjeServis.nadjiZaduzenjeKnjiga(this.listaKnjiga[index].id).subscribe((zaduzenjaDB:Zaduzenje[])=>{
          this.listaKnjigaCount[index]=new KnjgaCount()
          this.listaKnjigaCount[index].knjiga=this.listaKnjiga[index];
          this.listaKnjigaCount[index].num=zaduzenjaDB.length
          this.brojKnjiga++
          if(this.brojKnjiga==this.listaKnjiga.length){
      
            this.sort()
            console.log(this.listaKnjigaCount)
            for(let i=0;i<3;i++){
              this.top3Knjige[i]=new Knjiga()
              this.top3Knjige[i]=this.listaKnjigaCount[i].knjiga;
              console.log(this.top3Knjige)
            }
          
    
        }
        })
        
      }
      
    })
   
    
  }
  listaKnjiga:Knjiga[];
  listaKnjigaCount:KnjgaCount[];
  top3Knjige:Knjiga[];
  brojKnjiga:number

  sort(){
    this.listaKnjigaCount.sort((a,b)=>{
      if(a.num<b.num) return 1;
      if (a.num>b.num) return -1;
      return 0;
    })
  }

  

}
