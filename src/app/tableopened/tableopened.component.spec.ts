import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableopenedComponent } from './tableopened.component';

describe('TableopenedComponent', () => {
  let component: TableopenedComponent;
  let fixture: ComponentFixture<TableopenedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableopenedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableopenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
