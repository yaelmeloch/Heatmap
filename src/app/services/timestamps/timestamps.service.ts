import { Injectable } from '@angular/core';
import {default as data} from './data.json';

@Injectable({
  providedIn: 'root'
})
export class TimestampsService {
  timestamps = data;

  constructor() { }
}
