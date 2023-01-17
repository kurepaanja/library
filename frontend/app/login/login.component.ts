import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService, private router:Router) { }

  ngOnInit(): void {
    this.poruka='';
  }

  korisnickoIme:string;
  lozinka:string;
  poruka:string;


  login(){
    this.korisnikServis.login(this.korisnickoIme,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor!=null){
        
        if(kor.tip=="1" || kor.tip=="5"){
          localStorage.setItem("logovan",JSON.stringify(kor));
          this.router.navigate(['citalacMain']);
        }
        if(kor.tip=="2"){
          this.router.navigate(['citalacMain']);
          localStorage.setItem("logovan",JSON.stringify(kor));
        }
        if(kor.tip=="4"){
          this.poruka="Vas zahtev za registraciju se idalje razmatra"
        }
        
      }
      else{
        this.poruka="Losi podaci uneti";
      }
    })
  }

}
