import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasesqlComponent } from './databasesql.component';

describe('DatabasesqlComponent', () => {
  let component: DatabasesqlComponent;
  let fixture: ComponentFixture<DatabasesqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasesqlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabasesqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
