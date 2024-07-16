import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostAdminComponent } from './create-post-admin.component';

describe('CreatePostAdminComponent', () => {
  let component: CreatePostAdminComponent;
  let fixture: ComponentFixture<CreatePostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
