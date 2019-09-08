import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholFullInfoComponent } from './alcohol-full-info.component';

describe('AlcoholFullInfoComponent', () => {
  let component: AlcoholFullInfoComponent;
  let fixture: ComponentFixture<AlcoholFullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoholFullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
