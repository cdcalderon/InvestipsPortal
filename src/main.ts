import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient, HttpXhrBackend, XhrFactory } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig, APP_CONFIG } from '@app/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


const loadSettings = (urls: string[]): Observable<AppConfig> => {
  class XMLHttpRequestFactory implements XhrFactory {
    constructor() { }
    build(): XMLHttpRequest {
      return new XMLHttpRequest();
    }
  }
  const injector = Injector.create({
    providers: [
      {
        provide: HttpClient,
        useFactory: () => new HttpClient(new HttpXhrBackend(new XMLHttpRequestFactory())),
        deps: [],
      },
    ],
  });

  const httpClient = injector.get(HttpClient);
  return forkJoin(urls.map((url) => httpClient.get(url) as Observable<AppConfig>)).pipe(map((configs: AppConfig[]) => Object.assign({}, ...configs) as AppConfig));
};

const loadSettingsSubscription = loadSettings(environment.configurations).subscribe(
  async (config: AppConfig) => {
    loadSettingsSubscription.unsubscribe();
    if (environment.production === true) {
      enableProdMode();
    }

    // bootstrap
    const extraProviders = [{ provide: APP_CONFIG, useValue: Object.freeze(config) }];

    platformBrowserDynamic(extraProviders)
      .bootstrapModule(AppModule)
      .catch(() => {
        document.body.innerHTML = 'Failed to initialize application, please try again.';
      });
  },
  (e) => {
    loadSettingsSubscription.unsubscribe();
    document.body.innerHTML = 'Failed to load application, please try again.';
  }
);
