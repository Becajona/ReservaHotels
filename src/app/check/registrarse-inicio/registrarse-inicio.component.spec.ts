import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarseInicioComponent } from './registrarse-inicio.component';

describe('RegistrarseInicioComponent', () => {
  let component: RegistrarseInicioComponent;
  let fixture: ComponentFixture<RegistrarseInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarseInicioComponent]
    });
    fixture = TestBed.createComponent(RegistrarseInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
