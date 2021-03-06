import {NgModule} from '@angular/core';
import {SeasonHeader} from './header';
import {MaterialModule} from 'app/material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [SeasonHeader],
  exports: [SeasonHeader],
})
export class HeaderModule { }
