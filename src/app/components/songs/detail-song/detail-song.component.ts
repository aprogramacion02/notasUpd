import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../../services/songs.service';

@Component({
  selector: 'app-detail-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-song.component.html',
  styleUrl: './detail-song.component.scss'
})
export class DetailSongComponent implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private songsService = inject(SongsService);
  songId:string;
  songIdSingnal!:Signal<any>;  
  ngOnInit(): void {
    this.songId = this.activatedRouter.snapshot.params['songId'];
    this.songIdSingnal = this.songsService.getByIdSignal(this.songId);
  }
}
