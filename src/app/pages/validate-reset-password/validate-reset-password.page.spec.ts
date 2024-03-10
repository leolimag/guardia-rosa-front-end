import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateResetPasswordPage } from './validate-reset-password.page';

describe('ValidateResetPasswordPage', () => {
  let component: ValidateResetPasswordPage;
  let fixture: ComponentFixture<ValidateResetPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidateResetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
