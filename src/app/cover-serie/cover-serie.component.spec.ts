import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverSerieComponent } from './cover-serie.component';
import { ApiService } from '../api-service/api.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CoverSerieComponent', () => {
  let component: CoverSerieComponent;
  let fixture: ComponentFixture<CoverSerieComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['addFavSerie', 'eraseFavSerie']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, HttpClientModule],
      declarations: [],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoverSerieComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isOnFavs when addFavSerie is called and successful', () => {
    apiService.addFavSerie.and.returnValue(of({ message: 'favorito agregado' }));
    component.isOnFavs = false;

    component.addFavSerie(1);

    expect(apiService.addFavSerie).toHaveBeenCalledWith(1);
    expect(component.isOnFavs).toBeTrue();
  });

  it('should handle error when addFavSerie fails', () => {
    apiService.addFavSerie.and.returnValue(throwError({ error: 'error' }));
    component.isOnFavs = false;

    component.addFavSerie(1);

    expect(apiService.addFavSerie).toHaveBeenCalledWith(1);
    expect(component.isOnFavs).toBeFalse();
  });
});
