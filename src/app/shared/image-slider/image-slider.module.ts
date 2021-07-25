import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
    imports: [CommonModule, MatCarouselModule.forRoot()],
    declarations: [ImageSliderComponent],
    exports: [MatCarouselModule, ImageSliderComponent],
})
export class ImageSliderModule {}
