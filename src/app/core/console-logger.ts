import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window.token';
import { Logger } from './logger';

@Injectable()
export class ConsoleLogger implements Logger {
    constructor(@Inject(WINDOW) private windowRef: typeof globalThis) {}

    public trace(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.trace(message, optionalParams);
    }
    public debug(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.debug(message, optionalParams);
    }
    public info(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.info(message, optionalParams);
    }
    public warn(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.warn(message, optionalParams);
    }
    public error(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.error(message, optionalParams);
    }
    public critical(message?: any, ...optionalParams: any[]): void {
        this.windowRef.console.error(message, optionalParams);
    }
}
