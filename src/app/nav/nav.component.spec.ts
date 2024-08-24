import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { ApiService } from '../api-service/api.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getMovieCategories',
      'getSerieCategories',
      'logout'
    ]);

    // Mock the methods to return observables
    apiServiceSpy.getMovieCategories.and.returnValue(of([]));
    apiServiceSpy.getSerieCategories.and.returnValue(of([]));
    apiServiceSpy.logout.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verify that the component is created
  });


  it('should set movie categories on successful API call', () => {
    const mockCategories = ['Action', 'Comedy'];
    apiService.getMovieCategories.and.returnValue(of(mockCategories));

    component.SetInitialMovieCategories();

    expect(component.movieCategories).toEqual(mockCategories); // Verify that movieCategories is set
  });

  it('should handle error when SetInitialMovieCategories fails', () => {
    const errorResponse = { error: 'Error occurred' };
    apiService.getMovieCategories.and.returnValue(throwError(errorResponse));

    spyOn(console, 'error'); // Spy on console.error to suppress error messages during the test

    component.SetInitialMovieCategories();

    expect(console.error).toHaveBeenCalledWith('Error fetching movie categories', errorResponse); // Verify error handling
  });

  it('should set series categories on successful API call', () => {
    const mockCategories = ['Drama', 'Horror'];
    apiService.getSerieCategories.and.returnValue(of(mockCategories));

    component.SetInitialSerieCategories();

    expect(component.serieCategories).toEqual(mockCategories); // Verify that serieCategories is set
  });

  it('should handle error when SetInitialSerieCategories fails', () => {
    const errorResponse = { error: 'Error occurred' };
    apiService.getSerieCategories.and.returnValue(throwError(errorResponse));

    spyOn(console, 'error'); // Spy on console.error to suppress error messages during the test

    component.SetInitialSerieCategories();

    expect(console.error).toHaveBeenCalledWith('Error fetching serie categories', errorResponse); // Verify error handling
  });

  it('should show the menu when showMenu is called', () => {
    component.isShowedMenu = false; // Initial state

    component.showMenu();

    expect(component.isShowedMenu).toBeTrue(); // Verify that the menu is shown
  });

  it('should hide the menu when hideMenu is called', () => {
    component.isShowedMenu = true; // Initial state

    component.hideMenu();

    expect(component.isShowedMenu).toBeFalse(); // Verify that the menu is hidden
  });

  it('should call logout method of ApiService when logout is called', () => {
    component.logout();

    expect(apiService.logout).toHaveBeenCalled(); // Verify that logout method is called
  });
});
