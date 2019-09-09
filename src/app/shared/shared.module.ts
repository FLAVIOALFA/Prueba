import { NgModule } from '@angular/core';
import { SwipeToDeleteDirective } from './directives/swipe-to-delete.directive';
import { DialogComponent } from './components/dialog/dialog.component';

// Material
import { MatFormFieldModule, MatDialogModule, MatButtonModule} from '@angular/material';
@NgModule({
  declarations: [
    // Components
    DialogComponent,
    // Directives
    SwipeToDeleteDirective,
  ],
  exports: [
    // Components
    DialogComponent,
    // Directives
    SwipeToDeleteDirective
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [DialogComponent]
})
export class SharedModule { }
