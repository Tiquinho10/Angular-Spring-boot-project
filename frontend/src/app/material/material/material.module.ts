import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule, } from '@angular/material/dialog';
import { MatGridList, MatGridListModule} from '@angular/material/grid-list';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule} from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio'
import { MatSelectModule} from "@angular/material/select"
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule} from "@angular/material/core"
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule { }
