import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule, ToastModule} from 'ngx-weui';
import {ButtonModule} from 'ngx-weui/button';
import {DefaultInterceptor} from 'src/app/service/default.interceptor';
import {Fen2yuanPipe} from 'src/app/service/fen2yuan.pipe';
import {Yuan2FenPipe} from 'src/app/service/yuan2fen.pipe';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './boot/app.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Fen2yuanPipe,
    Yuan2FenPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ToastModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {



}
