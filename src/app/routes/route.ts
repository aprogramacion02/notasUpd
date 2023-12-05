import { PruebaComponent } from "../components/prueba/prueba.component";
import { DetailSongComponent } from "../components/songs/detail-song/detail-song.component";
import { SongsListComponent } from "../components/songs/songs-list/songs-list.component";
export default [
    {path: 'prueba', component: PruebaComponent},
    {path: 'songs', component: SongsListComponent},
    {path: 'songs/:songId', component: DetailSongComponent},
  ] 