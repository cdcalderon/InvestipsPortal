import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { SignalDisplayComponent } from './signal-display/signal-display.component';
import { SignalScreenComponent } from './signal-screen/signal-screen.component';
import { ImageSliderModule } from './image-slider/image-slider.module';

@NgModule({
    imports: [CommonModule, FormsModule, FlexLayoutModule, MaterialModule],
    declarations: [SignalDisplayComponent, SignalScreenComponent],
    exports: [CommonModule, FormsModule, FlexLayoutModule, MaterialModule, ImageSliderModule, SignalDisplayComponent, SignalScreenComponent],
})
export class SharedModule {}
