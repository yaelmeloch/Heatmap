import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NumberToHourPipe} from './number-to-hour.pipe';

@NgModule({
  declarations: [NumberToHourPipe],
  imports: [
    CommonModule
  ],
  exports: [NumberToHourPipe]
})
export class PipesModule { }
