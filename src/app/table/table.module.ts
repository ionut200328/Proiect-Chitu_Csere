import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelComponent } from './tabel/tabel.component';
import { TableRoutingModule } from './table-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormularComponent } from './formular/formular.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [TabelComponent, FormularComponent, DetailsComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzTableModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzPaginationModule,
    NzIconModule,
    NzModalModule,
    NzSpinModule,
    FormsModule,

    // *required for forms!
    ReactiveFormsModule,
  ],
})
export class TableModule { }
