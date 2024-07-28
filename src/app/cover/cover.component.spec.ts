import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverComponent } from './cover.component';
import { ApiService } from '../api-service/api.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoverComponent', () => {
  let component: CoverComponent;
  let fixture: ComponentFixture<CoverComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['addFavMovie']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoverComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should toggle isOnFavs when addFavMovie is called and successful', () => {
    apiService.addFavMovie.and.returnValue(of({ message: 'favorito agregado' }));
    component.isOnFavs = false; // Initial state

    component.addFavMovie(1); // Call the method with a test movie ID

    expect(apiService.addFavMovie).toHaveBeenCalledWith(1); // Check if the API service method was called with the correct argument
    expect(component.isOnFavs).toBeTrue(); // Verify that the isOnFavs property was toggled to true
  });

  it('should handle error when addFavMovie fails', () => {
    apiService.addFavMovie.and.returnValue(throwError({ error: 'error' }));
    component.isOnFavs = false; // Initial state

    component.addFavMovie(1); // Call the method with a test movie ID

    expect(apiService.addFavMovie).toHaveBeenCalledWith(1); // Check if the API service method was called with the correct argument
    expect(component.isOnFavs).toBeFalse(); // Verify that the isOnFavs property remains unchanged
  });
});
