import express from 'express';
import { KorisnikController } from '../controllers/korisnikController';

const korisnikRouter=express.Router();

korisnikRouter.route('/login').post(
    (req,res)=>new KorisnikController().login(req,res)
)

korisnikRouter.route('/register').post(
    (req,res)=>new KorisnikController().register(req,res)
)

korisnikRouter.route('/korisnickoImePostoji').post(
    (req,res)=>new KorisnikController().korisnickoImePostoji(req,res)
)

korisnikRouter.route('/emailPostoji').post(
    (req,res)=>new KorisnikController().emailPostoji(req,res)
)

korisnikRouter.route('/proveraSifre').post(
    (req,res)=>new KorisnikController().proveraSifre(req,res)
)

korisnikRouter.route('/promenaSifre').post(
    (req,res)=>new KorisnikController().promenaSifre(req,res)
)

korisnikRouter.route('/nadjiAdmina').get(
    (req,res)=>new KorisnikController().nadjiAdmina(req,res)
)

korisnikRouter.route('/uzmiRegKorisnike').get(
    (req,res)=>new KorisnikController().uzmiRegKorisnike(req,res)
)

korisnikRouter.route('/uzmiNeregKorisnike').get(
    (req,res)=>new KorisnikController().uzmiNeregKorisnike(req,res)
)

korisnikRouter.route('/prihvatiKorisnika').post(
    (req,res)=>new KorisnikController().prihvatiKorisnika(req,res)
)

korisnikRouter.route('/odbaciKorisnika').post(
    (req,res)=>new KorisnikController().odbaciKorisnika(req,res)
)

korisnikRouter.route('/promeniIme').post(
    (req,res)=>new KorisnikController().promeniIme(req,res)
)

korisnikRouter.route('/promeniKorisnickoIme').post(
    (req,res)=>new KorisnikController().promeniKorisnickoIme(req,res)
)

korisnikRouter.route('/promeniLozinku').post(
    (req,res)=>new KorisnikController().promeniLozinku(req,res)
)

korisnikRouter.route('/promeniTip').post(
    (req,res)=>new KorisnikController().promeniTip(req,res)
)

korisnikRouter.route('/promeniAdresu').post(
    (req,res)=>new KorisnikController().promeniAdresu(req,res)
)

korisnikRouter.route('/promeniTelefon').post(
    (req,res)=>new KorisnikController().promeniTelefon(req,res)
)

korisnikRouter.route('/promeniEmail').post(
    (req,res)=>new KorisnikController().promeniEmail(req,res)
)

korisnikRouter.route('/promeniSlika').post(
    (req,res)=>new KorisnikController().promeniSlika(req,res)
)

korisnikRouter.route('/promeniPrvoIme').post(
    (req,res)=>new KorisnikController().promeniPrvoIme(req,res)
)

korisnikRouter.route('/promeniPrezime').post(
    (req,res)=>new KorisnikController().promeniPrezime(req,res)
)

korisnikRouter.route('/nadjiKorisnika').post(
    (req,res)=>new KorisnikController().nadjiKorisnika(req,res)
)
export default korisnikRouter;