import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesSelectorComponent } from './exchanges-selector.component';

describe('ExchangesSelectorComponent', () => {
  let component: ExchangesSelectorComponent;
  let fixture: ComponentFixture<ExchangesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
