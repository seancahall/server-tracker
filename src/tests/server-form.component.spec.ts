/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ServerFormComponent } from '../app/server/server-form/server-form.component';
import { MessageService } from '../app/server/message.service';
import { HttpErrorHandler } from '../app/server/http-error-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faDiceOne } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Add an icon to the library for convenient access in other components
library.add(faTimes, faCheck);

describe('ServerFormComponent', () => {
  let component: ServerFormComponent;
  let fixture: ComponentFixture<ServerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        FontAwesomeModule
      ],
      providers: [ 
        HttpErrorHandler, 
        MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.serverForm.valid).toBeFalsy();
  });

  it('initial hostname field validity', () => {
    let hostname = component.serverForm.controls['hostname']; 
    expect(hostname.valid).toBeFalsy(); 
  });

  it('hostname field validity', () => {
    let errors = {};
    let hostname = component.serverForm.controls['hostname'];
    errors = hostname.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it('should accept a valid value', () => {
    component.serverForm.get('hostname').setValue('testhostname');
    expect(component.serverForm.get('hostname').valid).toEqual(true);
  });

  it('should reject an incorrect value', () => {
    component.serverForm.get('hostname').setValue('!@#$%^&*');
    expect(component.serverForm.get('hostname').valid).toEqual(false);
  });

  

});
