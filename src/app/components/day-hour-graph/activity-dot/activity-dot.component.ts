import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HslColorService} from '../../../services/hslColor/hsl-color.service';

@Component({
  selector: 'app-activity-dot',
  templateUrl: './activity-dot.component.html',
  styleUrls: ['./activity-dot.component.scss']
})
export class ActivityDotComponent implements OnInit, OnChanges {
  @Input() maxNumOfActivities: number;
  @Input() numOfHeats: number;
  @Input() count: number;
  @Input() isActive: boolean;
  @Output() clicked = new EventEmitter();
  heat;
  hslCode;
  heatBreakpoint: number;

  constructor(private hslColorService: HslColorService) { }

  ngOnInit() {
  }

  dotClicked() {
    this.clicked.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isActive) {
      return;
    }

    if (changes.maxNumOfActivities || changes.numOfHeats) {
      this.heatBreakpoint = this.maxNumOfActivities / this.numOfHeats;
      this.heat = Math.ceil(this.count / this.heatBreakpoint);
      this.hslCode = this.hslColorService.getHslColor(this.numOfHeats, this.heat);
    }
  }

}
