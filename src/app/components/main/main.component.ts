import { Component, OnInit } from '@angular/core';
import {TimestampsService} from '../../services/timestamps/timestamps.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data = this.timestampsService.timestamps;
  numOfHours = 24;
  numOfHeats = 6;
  MIN_HEATS = 5;
  MAX_HEATS = 100;
  numOfHeatsError;

  constructor(private timestampsService: TimestampsService) { }

  ngOnInit() {
  }

  formChanged(event) {
    switch(event.target.name) {
      case 'hour_size':
        this.numOfHours = +event.target.value;
        break;
      case 'heats':
        this.numOfHeatsChanged(+event.target.value);
        break;
    }
  }

  numOfHeatsChanged(value) {
    if (value < this.MIN_HEATS || value > this.MAX_HEATS) {
      this.numOfHeatsError = 'Please input a number between ' + this.MIN_HEATS + ' and ' + this.MAX_HEATS;
    } else {
      this.numOfHeatsError = '';
      this.numOfHeats = value;
    }
  }
}
