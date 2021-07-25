import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
    slides = [{ image: 'assets/images/slider-badging.jpg' }, { image: 'assets/images/slider-badag.jpg' }, { image: 'https://dummyimage.com/600x400/accf44/fff.png' }];
    constructor() {}

    ngOnInit(): void {}
}
