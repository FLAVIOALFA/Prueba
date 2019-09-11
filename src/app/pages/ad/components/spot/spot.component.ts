import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
})
export class SpotComponent implements OnInit {

  // @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  public url;
  public player: YT.Player;
  private id: string = 'SDtAuKQiRHc';

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() { }
 
  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    setTimeout(() => {
      this.player.pauseVideo();
    }, 8000);
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

}
