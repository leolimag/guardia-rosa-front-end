import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardianPage } from './guardian.page';

describe('GuardianPage', () => {
  let component: GuardianPage;
  let fixture: ComponentFixture<GuardianPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuardianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
