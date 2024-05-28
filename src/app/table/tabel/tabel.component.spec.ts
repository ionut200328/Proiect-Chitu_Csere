import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelComponent } from './tabel.component';

describe('TabelComponent', () => {
  let component: TabelComponent;
  let fixture: ComponentFixture<TabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelComponent]
    });
    fixture = TestBed.createComponent(TabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
