import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  login(korisnickoImeForm,lozinkaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      lozinka:lozinkaForm
    }
    return this.http.post(`${this.uri}/korisnik/login`,data)
  }

  emailPostoji(emailForm){
    const data={
      email:emailForm
    }
    return this.http.post(`${this.uri}/korisnik/emailPostoji`,data)
  }

  korisnickoImePostoji(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/korisnik/korisnickoImePostoji`,data)
  }

  register(imeForm,prezimeForm,korisnickoImeForm,lozinkaForm,emailForm,telefonForm,adresaForm,tipForm,slikaForm){
    const data={
      ime:imeForm,
      prezime:prezimeForm,
      korisnickoIme:korisnickoImeForm,
      lozinka:lozinkaForm,
      email:emailForm,
      telefon:telefonForm,
      adresa:adresaForm,
      tip:tipForm,
      slika:slikaForm
    }
    return this.http.post(`${this.uri}/korisnik/register`,data);
  }

  proveraSifre(korisnickoImeForm,lozinkaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      lozinka:lozinkaForm
    }
    return this.http.post(`${this.uri}/korisnik/promenaSifre`,data);
  }

  promenaSifre(korisnickoImeForm,staraLozinkaForm,novaLozinkaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      staraLozinka:staraLozinkaForm,
      novaLozinka:novaLozinkaForm
    }
    return this.http.post(`${this.uri}/korisnik/promenaSifre`,data);
  }

  nadjiAdmina(){
    return this.http.get(`${this.uri}/korisnik/nadjiAdmina`)
  }

  uzmiRegKorisnike(){
    return this.http.get(`${this.uri}/korisnik/uzmiRegKorisnike`)
  }

  uzmiNeregKorisnike(){
    return this.http.get(`${this.uri}/korisnik/uzmiNeregKorisnike`)
  }

  odbaciKorisnika(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/korisnik/odbaciKorisnika`,data)
  }

  prihvatiKorisnika(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/korisnik/prihvatiKorisnika`,data)
  }

  promeniIme(korisnickoImeForm,imeForm,prezimeForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      ime:imeForm,
      prezime:prezimeForm
    }

    return this.http.post(`${this.uri}/korisnik/promeniIme`,data)
  }

  promeniKorisnickoIme(starokorisnickoImeForm,novoKorisnickoImeForm){
    const data={
      staroKorisnickoIme:starokorisnickoImeForm,
      novoKorisnickoIme:novoKorisnickoImeForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniKorisnickoIme`,data)
  }

  promeniLozinku(korisnickoImeForm,lozinkaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      lozinka:lozinkaForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniLozinku`,data)
  }
  
  promeniTip(korisnickoImeForm,tipForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      tip:tipForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniTip`,data)
  }

  promeniAdresu(korisnickoImeForm,adresaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      adresa:adresaForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniAdresu`,data)
  }

  promeniTelefon(korisnickoImeForm,telefonForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      telefon:telefonForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniTelefon`,data)
  }

  promeniEmail(korisnickoImeForm,emailForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      email:emailForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniEmail`,data)
  }

  promeniSlika(korisnickoImeForm,slikaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      slika:slikaForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniSlika`,data)
  }

  promeniPrvoIme(korisnickoImeForm,imeForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      ime:imeForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniPrvoIme`,data)
  }

  promeniPrezime(korisnickoImeForm,imeForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      prezime:imeForm
    }
    return this.http.post(`${this.uri}/korisnik/promeniPrezime`,data)
  }

  nadjiKorisnika(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/korisnik/nadjiKorisnika`,data)
  }

}
