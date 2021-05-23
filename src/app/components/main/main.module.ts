import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main.component';
import {DayHourGraphModule} from '../day-hour-graph/day-hour-graph.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DayHourGraphModule,
    FormsModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
