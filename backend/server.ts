import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnikRouter';
import knjigaRouter from './routers/knjigaRouter';
import komentarRouter from './routers/komentarRouter';
import zaduzenjeRouter from './routers/zaduzenjeRouter';
import globalRouter from './routers/globalRouter';
import zahtevRouter from './routers/zahtevRouter';
import rezervacijaRouter from './routers/rezervacijaRouter';



const app = express();
app.use(cors())
app.use(express.json({limit:'100mb'}))


mongoose.connect('mongodb://localhost:27017/projekatDB')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnik',korisnikRouter);
router.use('/knjiga',knjigaRouter);
router.use('/komentar',komentarRouter);
router.use('/zaduzenje',zaduzenjeRouter);
router.use('/global',globalRouter);
router.use('/zahtev',zahtevRouter)
router.use('/rezervacija',rezervacijaRouter);



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));