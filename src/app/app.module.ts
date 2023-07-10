import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabasesqlComponent } from './databasesql/databasesql.component';
import { FormsModule } from '@angular/forms';
import { OpendatabseComponent } from './opendatabse/opendatabse.component';
import { TableopenedComponent } from './tableopened/tableopened.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    NavbarComponent,
    DatabasesqlComponent,
    OpendatabseComponent,

    TableopenedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
