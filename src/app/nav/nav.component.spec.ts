import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        { 
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '123' }) // Mocking route params
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show menu', () => {
    expect(component.isShowedMenu).toBeFalse(); // Initial state
    component.showMenu();
    expect(component.isShowedMenu).toBeTrue(); // After calling showMenu()
  });

  it('should hide menu', () => {
    component.isShowedMenu = true; // Set initial state to true
    component.hideMenu();
    expect(component.isShowedMenu).toBeFalse(); // After calling hideMenu()
  });

});