import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZaduzenjaComponent } from './pregled-zaduzenja.component';

describe('PregledZaduzenjaComponent', () => {
  let component: PregledZaduzenjaComponent;
  let fixture: ComponentFixture<PregledZaduzenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZaduzenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZaduzenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
