import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsService } from '../../../services/songs.service';
import { RouterOutlet, RouterModule} from '@angular/router';
@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss'
})
export class SongsListComponent implements OnInit {
  // songs:any = [];
  songsSignal!:Signal<any>;
  private songsService = inject(SongsService);

  ngOnInit(): void {
    this.songsSignal = this.songsService.getAllSignal();
    // this.songsService.getAll().subscribe({
    //   next:(result)=>{
    //     this.songs = result;
    //     console.log(this.songs);
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // })
  }
}
