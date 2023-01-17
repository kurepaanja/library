import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistracijaComponent } from './admin-registracija.component';

describe('AdminRegistracijaComponent', () => {
  let component: AdminRegistracijaComponent;
  let fixture: ComponentFixture<AdminRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistracijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
