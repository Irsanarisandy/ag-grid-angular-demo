import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlcoholComponent } from './edit-alcohol.component';

describe('EditAlcoholComponent', () => {
  let component: EditAlcoholComponent;
  let fixture: ComponentFixture<EditAlcoholComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlcoholComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
