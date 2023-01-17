import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http:HttpClient) { }
  
  uri = 'http://localhost:4000';

  sveKnjige(){
    return this.http.get(`${this.uri}/knjiga/sveKnjige`)
  }

  

  nadjiKnjigu(autorSearchForm,nazivSearchForm, izdavacForm,zanrForm){
    const data={
      autorSearch:autorSearchForm,
      nazivSearch:nazivSearchForm,
      izdavac:izdavacForm,
      zanr:zanrForm
    }
    return this.http.post(`${this.uri}/knjiga/nadjiKnjigu`,data)
  }

  decBrojKnjiga(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/knjiga/decBrojKnjiga`,data)
  }

  incBrojKnjiga(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/knjiga/incBrojKnjiga`,data)
  }

  uzmiKnjigu(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/knjiga/uzmiKnjigu`,data)
  }

  dodajKnjigu(idForm,nazivForm,autorForm,zanrForm,izdavacForm,godinaIzdanjaFrom,jezikForm,brojKnjigaForm,slikaForm){
    const data={
      id:idForm,
      naziv:nazivForm,
      autor:autorForm,
      zanr:zanrForm,
      izdavac:izdavacForm,
      godinaIzdanja:godinaIzdanjaFrom,
      jezik:jezikForm,
      brojKnjiga:brojKnjigaForm,
      slika:slikaForm
    }
    return this.http.post(`${this.uri}/knjiga/dodajKnjigu`,data)
  }

  promeniNaziv(idForm,nazivForm){
    const data={
      id:idForm,
      naziv:nazivForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniNaziv`,data)
  }

  promeniAutor(idForm,autorForm){
    const data={
      id:idForm,
      autor:autorForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniAutor`,data)
  }

  promeniZanr(idForm,zanrForm){
    const data={
      id:idForm,
      zanr:zanrForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniZanr`,data)
  }

  promeniIzdavac(idForm,izdavacForm){
    const data={
      id:idForm,
      izdavac:izdavacForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniIzdavac`,data)
  }

  promeniGodina(idForm,godinaIzdanjaFrom){
    const data={
      id:idForm,
      godinaIzdanja:godinaIzdanjaFrom
    }
    return this.http.post(`${this.uri}/knjiga/promeniGodina`,data)
  }

  promeniJezik(idForm,jezikForm){
    const data={
      id:idForm,
      jezik:jezikForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniJezik`,data)
  }

  promeniBrojKnjiga(idForm,brojKnjigaForm){
    const data={
      id:idForm,
      brojKnjiga:brojKnjigaForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniBrojKnjiga`,data)
  }

  promeniSliku(idForm,slikaForm){
    const data={
      id:idForm,
      slika:slikaForm
    }
    return this.http.post(`${this.uri}/knjiga/promeniSliku`,data)
  }

  izbrisiKnjigu(idForm){
    const data={
      id:idForm
    }
    return this.http.post(`${this.uri}/knjiga/izbrisiKnjigu`,data)
  }


  //KOMENTARI

  sviKomentariZaKnjigu(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/komentar/sviKomentariZaKnjigu`,data)
  }

  dodajKomentar(idKnjigaForm,korisnickoImeForm,tekstKomentaraForm,ocenaForm,datum_vremeForm){
    const data={
      idKnjiga:idKnjigaForm,
      korisnickoIme:korisnickoImeForm,
      tekstKomentara:tekstKomentaraForm,
      ocena:ocenaForm,
      datum_vreme:datum_vremeForm
    }

    return this.http.post(`${this.uri}/komentar/dodajKomentar`,data)
  }

  promeniKomentar(tekstKomentaraForm,korisnickoImeForm,idKnjigaForm){
    const data={
      tekstKomentara:tekstKomentaraForm,
      korisnickoIme:korisnickoImeForm,
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/komentar/promeniKomentar`,data)
  }

  //ZAHTEVI
  sviZahtevi(){
    return this.http.get(`${this.uri}/zahtev/sviZahtevi`)
  }

  prihvatiZahtev(korisnickoImeForm,nazivForm,autorForm,zanrForm,izdavacForm,godinaIzdanjaFrom,jezikForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      naziv:nazivForm,
      autor:autorForm,
      zanr:zanrForm,
      izdavac:izdavacForm,
      godinaIzdanja:godinaIzdanjaFrom,
      jezik:jezikForm

    }
    return this.http.post(`${this.uri}/zahtev/prihvatiZahtev`,data)
  }

  dodajZahtev(korisnickoImeForm,nazivForm,autorForm,zanrForm,izdavacForm,godinaIzdanjaFrom,jezikForm,slikaForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      naziv:nazivForm,
      autor:autorForm,
      zanr:zanrForm,
      izdavac:izdavacForm,
      godinaIzdanja:godinaIzdanjaFrom,
      jezik:jezikForm,   
      slika:slikaForm
    }
    return this.http.post(`${this.uri}/zahtev/dodajZahtev`,data)
  }

  mojiZahtevi(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zahtev/mojiZahtevi`,data)
  }

  deleteZahtev(korisnickoImeForm,nazivForm){
    const data={
      korisnickoIme:korisnickoImeForm,
      naziv:nazivForm
    }
    return this.http.post(`${this.uri}/zahtev/deleteZahtev`,data)
  }

  //REZERVACIJE

  dodajRezervaciju(idKnjigaForm,korisnickoImeForm){
    const data={
      idKnjiga:idKnjigaForm,
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/rezervacija/dodajRezervaciju`,data)
  }

  dohvatiRezervaciju(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/rezervacija/dohvatiRezervaciju`,data)
  }

  izbrisiKorisnika(idKnjigaForm,korisnickoImeForm){
    const data={
      idKnjiga:idKnjigaForm,
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/rezervacija/izbrisiKorisnika`,data)
  }

  napraviRezervaciju(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/rezervacija/napraviRezervaciju`,data)
  }
  
}
