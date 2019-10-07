import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaNavbarComponent } from './fifa-navbar.component';

describe('FifaNavbarComponent', () => {
  let component: FifaNavbarComponent;
  let fixture: ComponentFixture<FifaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
