import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdComponent } from './ad.component';

const routes: Routes = [
    { path: 'ad', component: AdComponent },
    { path: '', redirectTo: 'ad' },
    { path: '**', redirectTo: 'ad', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdRoutingModule { }

