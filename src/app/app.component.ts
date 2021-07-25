import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { APP_CONFIG, AppConfig, LoggerService } from '@app/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'investips portal';

    constructor(private logger: LoggerService, @Inject(APP_CONFIG) private config: AppConfig) {
        console.log(logger);
        const a = {
            test: 1,
        };
        logger.trace({ message: 'trace message' });
        logger.debug({ message: 'hello', a });
        logger.debug(config);
    }
}
