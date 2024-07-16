import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerArticleComponent } from './manager-article.component';

describe('ManagerArticleComponent', () => {
  let component: ManagerArticleComponent;
  let fixture: ComponentFixture<ManagerArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
