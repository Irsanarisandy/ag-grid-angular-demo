import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholButtonComponent } from './alcohol-button.component';

describe('AlcoholButtonComponent', () => {
  let component: AlcoholButtonComponent;
  let fixture: ComponentFixture<AlcoholButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoholButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
