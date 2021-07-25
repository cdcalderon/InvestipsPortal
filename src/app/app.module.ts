import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { ApiModule } from '@app/api';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
    declarations: [AppComponent, TopNavComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        ApiModule,

        // feature modules

        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
