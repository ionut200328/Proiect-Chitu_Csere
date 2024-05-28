import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelComponent } from './tabel/tabel.component';



const routes: Routes = [
  {
    path: '',
    component: TabelComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class TableRoutingModule { }
