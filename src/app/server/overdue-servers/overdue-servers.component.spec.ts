import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueServersComponent } from './overdue-servers.component';

describe('OverdueServersComponent', () => {
  let component: OverdueServersComponent;
  let fixture: ComponentFixture<OverdueServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverdueServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
