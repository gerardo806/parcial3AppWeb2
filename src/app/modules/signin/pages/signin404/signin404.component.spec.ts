import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signin404Component } from './signin404.component';

describe('Signin404Component', () => {
  let component: Signin404Component;
  let fixture: ComponentFixture<Signin404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signin404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signin404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
