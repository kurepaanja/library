import { Knjiga } from "./knjiga";
import { Zaduzenje } from "./zaduzenje";

export class ZaduzenjeKnjiga{
    slika:string;
    naziv:string;
    autor:Array<string>;
    idKnjiga:string;
    korisnickoIme:string;
    rokVracanja:number;
    kasni:boolean;
    datumVracanja:string;
    datumZaduzenja:string
    produzenje:number;

  
}