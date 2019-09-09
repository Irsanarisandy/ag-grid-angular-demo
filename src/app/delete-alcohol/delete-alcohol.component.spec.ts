import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlcoholComponent } from './delete-alcohol.component';

describe('DeleteAlcoholComponent', () => {
  let component: DeleteAlcoholComponent;
  let fixture: ComponentFixture<DeleteAlcoholComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAlcoholComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
