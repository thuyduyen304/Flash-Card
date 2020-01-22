import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CardsetListComponent } from './components/cardset-list/cardset-list.component';
import { CardsetService } from './cardset.service';
import { CardsetDetailComponent } from './components/cardset-detail/cardset-detail.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { SlideComponent } from './components/slide/slide.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material";
import { NavComponent } from './components/nav/nav.component';
import { PracticeComponent } from './components/practice/practice.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardsetListComponent,
    CardsetDetailComponent,
    CardDetailComponent,
    SlideComponent,
    NavComponent,
    PracticeComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CardsetService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CardsetDetailComponent]
})
export class AppModule { }
