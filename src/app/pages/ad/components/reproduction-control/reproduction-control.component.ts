import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-reproduction-control',
  templateUrl: './reproduction-control.component.html',
})
export class ReproductionControlComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<any>();
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteElement(evt) {
    console.log('evt', evt)
  }

}
