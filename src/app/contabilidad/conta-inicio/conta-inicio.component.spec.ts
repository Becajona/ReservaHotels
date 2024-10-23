import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaInicioComponent } from './conta-inicio.component';

describe('ContaInicioComponent', () => {
  let component: ContaInicioComponent;
  let fixture: ComponentFixture<ContaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaInicioComponent]
    });
    fixture = TestBed.createComponent(ContaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
