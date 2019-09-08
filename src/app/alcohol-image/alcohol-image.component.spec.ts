import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholImageComponent } from './alcohol-image.component';

describe('AlcoholImageComponent', () => {
  let component: AlcoholImageComponent;
  let fixture: ComponentFixture<AlcoholImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoholImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
