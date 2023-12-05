const { model, Schema} = require('mongoose');
const songSchema = new Schema({
    title: String,
    artist: String,
    genre: String,
    album: String,
    duration: Number,
    year: Number,
    trackNumber: Number,
    isExplicit:Boolean
}, { versionKey: false });

const songSchema1 = new Schema({
    title: String,
    artist: String,
    genre: String,
    album: String,
    duration: Number,
    year: Number,
    trackNumber: Number,
    isExplicit:Boolean,
    fecha:Object 
}, { versionKey: false });
const models = {
    song:model('song', songSchema),
    song1:model('song1', songSchema1),
}
module.exports = models;