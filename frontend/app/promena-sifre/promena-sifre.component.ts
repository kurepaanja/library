import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-promena-sifre',
  templateUrl: './promena-sifre.component.html',
  styleUrls: ['./promena-sifre.component.css']
})
export class PromenaSifreComponent implements OnInit {

  constructor(private fb:FormBuilder,private korisnikServis:KorisnikService,private router:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
  }

  korisnik:Korisnik;

  form = this.fb.group({
    novaSifra: ['', [Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,12}$")]],
    ponovoNovaSifra: ['',[Validators.required]]
  }, {
    validators: this.mustMatch('novaSifra', 'ponovoNovaSifra')
  })

  get f() {
    return this.form.controls;
  }


  mustMatch(password: any, passwordAgain: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordAgainControl = formGroup.controls[passwordAgain];

      if (passwordAgainControl.errors && !passwordAgainControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== passwordAgainControl.value) {
        passwordAgainControl.setErrors({ mustMatch: true })
      } else {
        passwordAgainControl.setErrors(null);
      }
    }
  }

  staraSifra: string;
  message: string;

  promeniSifru(){
    //prvo provera dal stara sifra tacna
    if(this.form.valid){
      let novaSifra=this.form.controls['novaSifra'].value;
      this.korisnikServis.promenaSifre(this.korisnik.korisnickoIme,this.staraSifra,novaSifra).subscribe((resp)=>{
        if(resp['message']=='ok'){
          alert['Uspesno promenjena sifra'];
          this.logout();
        }
        else{
          this.message='Pogresno uneta stara sifra!'
        }
      })
    }else{
      this.message='Sifra mora sadrzati bar jedno veliko i malo slovo,broj i specijalan znak!';
    }
   
  }





  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([""]);
  }


}
