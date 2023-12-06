const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./config/db')
const app = express();

// configuracion para que el servidor reciba varios tipos de datos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const Songobj = require('./models/song.model');
const Song = Songobj.song;
const Song1 = Songobj.song1;

// rutas para el servidor
app.get('/',async(req,res)=>{
    try {
        // throw  new Error;
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        console.log(error);
        res.json([{ error: error, msg: 'Ocurrio un Error Contacte al Administrador' }]);
    }
});
const dat = {
    "title": "Stairway to Heaven",
    "artist": "Led Zeppelin",
    "genre": "Rock",
    "album": "Led Zeppelin IV",
    "duration": 482,
    "year": 1971,
    "trackNumber": 4,
    "isExplicit": false,
    "fecha":{name:'andres',date:'2023-11-30'}
  }


app.post('/songsCreate',async(req,res)=>{
    try {
        console.log(req.body);
        const songs = await Song.create(req.body);
        // const songs1 = await Song1.create(dat);
        // console.log(songs1);
        res.json(songs);
    } catch (error) {
        
        console.log(error.message);
        res.json({ error: error.message });
    }
});
app.get('/:songId',async(req,res)=>{
    const {songId} = req.params;
    // Verificar si songId es un ObjectId válido
    // if (!mongoose.Types.ObjectId.isValid(songId)) {
    //     return res.status(400).send('No es un ID válido');
    // }
    try {
        const song = await Song.findById(songId);
        res.json(song);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
});

app.put('/:songId', async (req, res) => {
    const {songId} = req.params;
    try {
        // el new:true es para que ns devuelva el dato actualizado si no lo ponemos nos devuelve el anterior
        const song = await Song.findByIdAndUpdate(songId,req.body,{new:true});
        res.json(song);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4500;
app.listen(PORT,(req,res)=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});