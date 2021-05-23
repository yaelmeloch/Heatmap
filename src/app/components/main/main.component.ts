import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimestampsService} from '../../services/timestamps/timestamps.service';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  data = this.timestampsService.timestamps;
  numOfHours = 24;
  numOfHeats = 6;
  MIN_HEATS = 5;
  MAX_HEATS = 100;
  numOfHeatsError;
  handleHeatChange = new Subject<number>();
  destroy = new Subject<boolean>();

  constructor(private timestampsService: TimestampsService) { }

  ngOnInit() {
    this.handleHeatChange.pipe(
      takeUntil(this.destroy),
      debounceTime(500),
      tap(value => {
        if (value < this.MIN_HEATS || value > this.MAX_HEATS) {
          this.numOfHeatsError = 'Please input a number between ' + this.MIN_HEATS + ' and ' + this.MAX_HEATS;
        } else {
          this.numOfHeatsError = '';
          this.numOfHeats = value;
        }
      })
    ).subscribe();
  }

  formChanged(event) {
    switch(event.target.name) {
      case 'hour_size':
        this.numOfHours = +event.target.value;
        break;
    }
  }

  numOfHeatsChanged(value) {
    this.handleHeatChange.next(value);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
