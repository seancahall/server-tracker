import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './server.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

describe('ServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule
      ],
      providers: [
        ServerService,
        HttpErrorHandler,
        MessageService
      ]
    });
  });

  it('should be created', inject([ServerService], (service: ServerService) => {
    expect(service).toBeTruthy();
  }));
});
