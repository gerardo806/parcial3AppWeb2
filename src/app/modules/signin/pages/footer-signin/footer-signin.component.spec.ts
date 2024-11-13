import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSigninComponent } from './footer-signin.component';

describe('FooterSigninComponent', () => {
  let component: FooterSigninComponent;
  let fixture: ComponentFixture<FooterSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
