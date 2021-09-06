import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { ReadAllComponent } from './components/read-all/read-all.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatBadgeModule} from '@angular/material/badge';
import { FinalizadosComponent } from './components/finalizados/finalizados.component';
import { CreateComponent } from './components/create/create.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UpdateComponent } from './components/update/update.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReadAllComponent,
    FinalizadosComponent,
    CreateComponent,
    UpdateComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
