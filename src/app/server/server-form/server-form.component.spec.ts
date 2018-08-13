import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { ServerFormComponent } from './server-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Add an icon to the library for convenient access in other components
library.add(faTimes, faCheck);

describe('ServerFormComponent', () => {
  let component: ServerFormComponent;
  let fixture: ComponentFixture<ServerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerFormComponent ],
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        FontAwesomeModule
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
