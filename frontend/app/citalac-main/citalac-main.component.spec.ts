import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitalacMainComponent } from './citalac-main.component';

describe('CitalacMainComponent', () => {
  let component: CitalacMainComponent;
  let fixture: ComponentFixture<CitalacMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitalacMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitalacMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
