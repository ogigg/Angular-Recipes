import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipePageComponent } from './add-recipe-page.component';

describe('AddRecipePageComponent', () => {
  let component: AddRecipePageComponent;
  let fixture: ComponentFixture<AddRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
