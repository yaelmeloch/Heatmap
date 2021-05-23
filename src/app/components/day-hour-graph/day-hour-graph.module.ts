import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayHourGraphComponent } from './day-hour-graph.component';
import {ActivityDotModule} from './activity-dot/activity-dot.module';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DayHourGraphComponent
  ],
  imports: [
    CommonModule,
    ActivityDotModule,
    PipesModule
  ],
  exports: [
    DayHourGraphComponent
  ]
})
export class DayHourGraphModule { }
