import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaMainComponent } from './knjiga-main.component';

describe('KnjigaMainComponent', () => {
  let component: KnjigaMainComponent;
  let fixture: ComponentFixture<KnjigaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigaMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnjigaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
