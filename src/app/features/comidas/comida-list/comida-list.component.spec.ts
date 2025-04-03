import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaListComponent } from './comida-list.component';

describe('ComidaListComponent', () => {
  let component: ComidaListComponent;
  let fixture: ComponentFixture<ComidaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidaListComponent]
    });
    fixture = TestBed.createComponent(ComidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
