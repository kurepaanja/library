import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../model/knjiga';
import { Komentar } from '../model/komentar';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router:Router,private knjigaServis:KnjigaService) { }

  ngOnInit(): void {
    this.hasImage=false;
    this.sveKnjige=[]
    this.izabranaKnjiga=new Knjiga()
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.knjigaServis.sveKnjige().subscribe((data:Knjiga[])=>{
      
      for(let i=0;i<data.length;i++){
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
  }


  korisnik:Korisnik
  sveKnjige:Knjiga[];
  izabranaKnjiga:Knjiga;
  hasImage:boolean;
  prosecnaOcena:number;

  generisiBroj(min,max){
    let minimum=Math.ceil(min);
    let maksimum=Math.floor(max);
    return Math.floor(Math.random()*(maksimum-minimum+1)+minimum);
  }

}
