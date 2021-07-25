import { InjectionToken } from '@angular/core';
import { ConsoleLogger } from './console-logger';

export const LOGGER = new InjectionToken<ConsoleLogger>('logger');
