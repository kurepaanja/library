import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private router:Router) { }

  ngOnInit(): void {
  }

  korisnickoIme:string;
  lozinka:string;
  poruka:string;


  login(){
    this.korisnikServis.login(this.korisnickoIme,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor!=null){
        
        if(kor.tip=="3"){
          localStorage.setItem("logovan",JSON.stringify(kor));
          this.router.navigate(['admin']);
        }
        
      }
      else{
        this.poruka="Losi podaci uneti";
      }
    })
  }
}
