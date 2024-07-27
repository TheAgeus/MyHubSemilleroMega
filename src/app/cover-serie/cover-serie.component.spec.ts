import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSerieComponent } from './cover-serie.component';

describe('CoverSerieComponent', () => {
  let component: CoverSerieComponent;
  let fixture: ComponentFixture<CoverSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverSerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
