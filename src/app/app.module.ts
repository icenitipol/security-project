import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { MonoalphabeticComponent } from './cipher/monoalphabetic/monoalphabetic.component';
import { RsaComponent } from './cipher/rsa/rsa.component';
import { EccComponent } from './cipher/ecc/ecc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftComponent } from './cipher/shift/shift.component';
import { ColumnarComponent } from './cipher/columnar/columnar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    MonoalphabeticComponent,
    RsaComponent,
    EccComponent,
    ShiftComponent,
    ColumnarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
