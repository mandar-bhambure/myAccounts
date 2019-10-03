import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
/*import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';*/
import { AccountsDataService } from "./services/accounts-data.service";
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    AccountsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /*BrowserAnimationsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    ScrollingModule,*/
    HttpClientModule
  ],
  providers: [AccountsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
