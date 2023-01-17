import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaSifreComponent } from './promena-sifre.component';

describe('PromenaSifreComponent', () => {
  let component: PromenaSifreComponent;
  let fixture: ComponentFixture<PromenaSifreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaSifreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromenaSifreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
