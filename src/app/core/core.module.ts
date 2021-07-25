import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOGGER } from './logger.token';
import { ConsoleLogger } from './console-logger';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [{ provide: LOGGER, useClass: ConsoleLogger, multi: true }],
})
export class CoreModule {}
