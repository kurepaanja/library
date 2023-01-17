import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKnjigeComponent } from './admin-knjige.component';

describe('AdminKnjigeComponent', () => {
  let component: AdminKnjigeComponent;
  let fixture: ComponentFixture<AdminKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKnjigeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
