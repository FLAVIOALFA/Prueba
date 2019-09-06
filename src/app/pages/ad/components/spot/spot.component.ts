import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
})
export class SpotComponent implements OnInit {

  // @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  public url;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/SDtAuKQiRHc');
  }

  toggleVideo(event: any) {
    // this.videoplayer.nativeElement.play();
  }

}
