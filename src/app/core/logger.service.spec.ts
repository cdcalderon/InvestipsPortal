import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from './app-config.token';
import { ConsoleLogger } from './console-logger';
import { LogLevel } from './log-level.enum';

import { LoggerService } from './logger.service';
import { LOGGER } from './logger.token';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOGGER, useClass: ConsoleLogger },
        {
          provide: APP_CONFIG, useValue: {
            logging: {
              minimumLevel: LogLevel.debug
            }
          }
        }
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
