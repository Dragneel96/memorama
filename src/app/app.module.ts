import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoramaComponent } from './view/memorama/memorama.component';
import { IndexComponent } from './view/index/index.component';
import { CardComponent } from './core/components/card/card.component';
import { InitialsPipe } from './core/pipe/initials.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MemoramaComponent,
    IndexComponent,
    CardComponent,
    InitialsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
