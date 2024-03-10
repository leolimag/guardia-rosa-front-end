import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGuardianPage } from './add-guardian.page';

describe('AddGuardianPage', () => {
  let component: AddGuardianPage;
  let fixture: ComponentFixture<AddGuardianPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddGuardianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
