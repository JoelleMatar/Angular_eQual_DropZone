import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogContentExampleDialog } from './app.component';
import { MatTableModule, _MatTableDataSource } from '@angular/material/table';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/http.interceptor.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/api/api.service';
import { AuthService } from 'src/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/angular-material.module';
import { DialogDeleteComponent } from './dialogDelete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    DialogContentExampleDialog
  ],
  entryComponents: [DialogContentExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, 
    ApiService,
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
