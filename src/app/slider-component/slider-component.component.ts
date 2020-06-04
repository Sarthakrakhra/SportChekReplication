import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.scss']
})
export class SliderComponentComponent implements OnInit {

  images = ['brand1', 'brand2'].map((n) => `../../assets/images/${n}.png`);
  
  constructor() { }

  ngOnInit() {
  }

}
