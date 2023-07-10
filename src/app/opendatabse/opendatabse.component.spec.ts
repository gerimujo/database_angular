import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendatabseComponent } from './opendatabse.component';

describe('OpendatabseComponent', () => {
  let component: OpendatabseComponent;
  let fixture: ComponentFixture<OpendatabseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendatabseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpendatabseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
