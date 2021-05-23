import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HslColorService {
  MIN_HSL = 300;

  constructor() { }

  getHslColor(numOfHeats: number, heat: number) {
    const hslJump = this.MIN_HSL / (numOfHeats - 1);
    const hslCode = this.MIN_HSL - ((heat - 1) * hslJump);
    return 'hsl(' + hslCode + ', 100%, 60%)';
  }
}
