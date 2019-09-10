import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { map, scan, filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[appSwipeDelete]'
})
export class SwipeToDeleteDirective {

  @Output() deleteElement: EventEmitter<any>;
  @Input() destroy$: Subject<any> = new Subject<any>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.deleteElement = new EventEmitter<any>();
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.addDeleteBox();
    this.listenEvents();
  }

  addDeleteBox() {
    setTimeout(() => {
      const parent = this.el.nativeElement.parentNode;
      const div = this.createDivContainer();
      const img = this.createTrashImage();
      this.renderer.appendChild(div, img);
      this.renderer.appendChild(parent, div);
    }, 30);
  }

  createTrashImage(): HTMLElement {
    const img: HTMLImageElement = this.renderer.createElement('img');
    img.src = 'assets/images/trashWhite.png';
    this.renderer.setStyle(img, 'position', 'absolute');
    this.renderer.setStyle(img, 'top', '29%');
    this.renderer.setStyle(img, 'right', '20%');
    this.renderer.setStyle(img, 'max-height', '40%');
    return img;
  }

  createDivContainer(): HTMLElement {
    const { height } = this.el.nativeElement.getBoundingClientRect();
    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div, 'width', `40%`);
    this.renderer.setStyle(div, 'height', `${height - 10}px`);
    this.renderer.setStyle(div, 'background', 'red');
    this.renderer.setStyle(div, 'z-index', '-1');
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'right', '0');
    return div;
  }

  listenEvents() {
    const element = this.el.nativeElement;

    // ============================
    // CREATE OBSERVABLE WHEN MOUSE CLICK IS DOWN
    // ============================
    const mouseStart$ = fromEvent(element, 'touchstart').pipe(
      map((event: TouchEvent) => ({
        label: 'start',
        coords: this.getClickCoods(event, element)
      })),
      takeUntil(this.destroy$)
    );

    // ============================
    // CREATE OBSERVABLE WHEN MOUSE CLICK IS UP
    // ============================
    const mouseEnd$ = fromEvent(element, 'touchend').pipe(
      map((event: TouchEvent) => ({
        label: 'end',
        coords: this.getClickCoods(event, element)
      })),
      takeUntil(this.destroy$)
    );

    // ============================
    // CREATE OBSERVABLE WHEN MOUSE IS MOVED
    // ============================
    const mouseMove$ = fromEvent(element, 'touchmove').pipe(
      map((event: TouchEvent) => ({
        label: 'moving',
        coords: this.getClickCoods(event, element)
      })),
      takeUntil(this.destroy$)
    );

    // ============================
    // CREATE A MERGE EVENTS
    // ============================
    const mergeEvents$ = merge(mouseStart$, mouseMove$, mouseEnd$).pipe(
      scan(this.computeMovingState, { label: 'init' }),
      filter(data => data.origin && data.coords),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    // ============================
    // SUBSCRIBE TO MERGED EVENTS
    // ============================
    mergeEvents$.subscribe((data) => {
      // Take vars
      const { origin, coords } = data;
      // If is the last event emitted, verify if we must open a dialog or reset the position
      if (data.label === 'end') {
        // Calculate the percentaje moved
        const percentage = this.getPercentageMoved();
        percentage >= 29 ? this.openDialog() : this.resetPosition();
      }
      // If the element is being moved, graph it
      if (data.label === 'moving' && this.getPercentageMoved() <= 29) {
        this.setPosition(origin.x, coords.x);
      }
    });

  }

  // =============================
  // MOVE THE ELEMENT
  // =============================
  setPosition(origin, x) {
    let marginRight = 0;
    if (x < origin) {
      marginRight = origin - x;
    }
    this.renderer.setStyle(this.el.nativeElement, 'margin-left', `-${marginRight}px`);
  }

  // =============================
  // CALCULATE THE PERCENTAGE MOVED TO LEFT
  // =============================
  getPercentageMoved() {
    const widthElement = this.el.nativeElement.offsetWidth;
    const { x } = this.el.nativeElement.getBoundingClientRect();
    return Math.round((Math.abs(x) * 100) / widthElement);
  }

  // =============================
  // OPEN DIALOG TO CONFIRM
  // =============================
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '¿Desea eliminar el elemento?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteElement.emit();
      }
    });

    this.resetPosition();
  }

  // =============================
  // RESET THE POSITION OF THE ELEMENT
  // =============================
  resetPosition() {
    this.renderer.setStyle(this.el.nativeElement, 'margin-left', 0);
  }

  // =============================
  // CREATE OBJECT WITH PX MOVED
  // =============================
  getClickCoods(event: TouchEvent, parent) {
    return {
      x: event.changedTouches[0].clientX - parent.offsetLeft,
    };
  }

  computeMovingState(prevState, event) {

    switch (prevState.label) {
      case 'init':
      case 'end':
        if (event.label === 'start') { return { origin: event.coords, ...event }; }
        break;
      case 'start':
      case 'moving':
        return { origin: prevState.origin, ...event };
    }
    return prevState;

  }

}
