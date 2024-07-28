import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MediaListComponent } from '../media-list/media-list.component';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]), // This ensures the RouterModule is properly configured
        MediaListComponent,
        NavComponent
      ],
      declarations: [],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {
            paramMap: of({
              get: () => 1 // mock any route parameters if needed
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
