import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerFormComponent } from './server/server-form/server-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryServerService } from './server/in-memory-server-service';
import { HttpErrorHandler } from './server/http-error-handler.service';
import { MessageService } from './server/message.service';
import { ServerComponent } from './server/server.component';
import { ServerTableComponent } from './server/server-table/server-table.component';
import { OverdueServersComponent } from './server/overdue-servers/overdue-servers.component';
import { OverdueServersPipe } from './server/overdue-servers/overdue-servers.pipe';

// Add an icon to the library for convenient access in other components
library.add(faTimes, faCheck);


@NgModule({
  declarations: [
    AppComponent,
    ServerFormComponent,
    ServerComponent,
    ServerTableComponent,
    OverdueServersComponent,
    OverdueServersPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryServerService)
  ],
  providers: [
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
