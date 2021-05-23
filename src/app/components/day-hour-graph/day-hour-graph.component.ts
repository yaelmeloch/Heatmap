import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IDayHourGraphItem} from './day-hour-graph.enum';
import {HslColorService} from '../../services/hslColor/hsl-color.service';

@Component({
  selector: 'app-day-hour-graph',
  templateUrl: './day-hour-graph.component.html',
  styleUrls: ['./day-hour-graph.component.scss']
})
export class DayHourGraphComponent implements OnInit, OnChanges {
  @Input() timestamps: string[];
  @Input() numOfHours: number = 24;
  @Input() numOfHeats: number = 6;
  originalMat: IDayHourGraphItem[][];
  matToDisplay: IDayHourGraphItem[][];
  maxNumOfActivities = 0;
  hoursFactor = 1;
  hoursArray;
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  heatColorsMap;

  constructor(private hslColorService: HslColorService) {
  }

  ngOnInit() {
    this.setHoursArray();
    this.initMat();
  }

  setHoursArray() {
    this.hoursArray = new Array(24).fill(0).map((x,i) =>i ).filter(i => i % this.hoursFactor === 0);
  }

  initMat() {
    this.originalMat = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      this.originalMat[dayIndex] = [];

      for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
        this.originalMat[dayIndex].push({count: 0, active: true});
      }
    }

    this.convertArrToMat();
  }

  convertArrToMat() {
    this.timestamps.forEach(timestamp => {
      const date = new Date(timestamp);
      const dayIndex = date.getDay();
      const hourIndex = date.getHours();
      this.originalMat[dayIndex][hourIndex].count++;

      if (this.maxNumOfActivities < this.originalMat[dayIndex][hourIndex].count) {
        this.maxNumOfActivities = this.originalMat[dayIndex][hourIndex].count;
      }
    });

    this.matToDisplay = this.originalMat;
  }

  hourClicked(dayIndex, hourIndex) {
    this.matToDisplay[dayIndex][hourIndex].active = !this.matToDisplay[dayIndex][hourIndex].active;

    if (this.maxNumOfActivities <= this.matToDisplay[dayIndex][hourIndex].count) {
      this.maxNumOfActivities = this.matToDisplay[dayIndex][hourIndex].active ? this.matToDisplay[dayIndex][hourIndex].count : this.getMaxNumOfActivities();
    }
  }

  getMaxNumOfActivities(): number {
    const maxCountPerDay = this.matToDisplay.map(day => {
      const activeHoursCounts = day.filter(hour => hour.active).map(hour => hour.count);
      return Math.max.apply(null, activeHoursCounts);
    });

    return Math.max.apply(null, maxCountPerDay);
  }

  changeHour(hourSize) {
    this.hoursFactor = 24 / hourSize;
    this.setHoursArray();
    this.maxNumOfActivities = 0;
    this.matToDisplay = [];

    this.originalMat.forEach(day => {
      const newHours = day.reduce((arr, curr, i) => {
        i % this.hoursFactor === 0 ? arr.push(curr.count) : arr[arr.length - 1] += curr.count;
        return arr;
      }, []);

      this.matToDisplay.push(newHours.map(item => {
        if (this.maxNumOfActivities < item) {
          this.maxNumOfActivities = item;
        }

        return {
          count: item,
          active: true
        }
      }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numOfHours && !changes.numOfHours.firstChange) {
      this.changeHour(this.numOfHours);
    }

    if (changes.numOfHeats) {
      this.heatColorsMap = [];

      for (let i = 0; i < this.numOfHeats; i++) {
        const heat = i+1;
        this.heatColorsMap.push({heat, color: this.hslColorService.getHslColor(this.numOfHeats, heat)});
      }
    }
  }
}
