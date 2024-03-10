import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGuardianPage } from './edit-guardian.page';

describe('EditGuardianPage', () => {
  let component: EditGuardianPage;
  let fixture: ComponentFixture<EditGuardianPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditGuardianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
