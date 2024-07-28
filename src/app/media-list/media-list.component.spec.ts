import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MediaListComponent } from './media-list.component';
import { LoadingService } from '../loading-service/loading.service';
import { ApiService } from '../api-service/api.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['addFavMovie', 'eraseFavMovie', 'addFavSerie', 'eraseFavSerie','getFavoriteMovies', 'getFavoriteSeries','getAllMovies', 'getAllSeries', 'getMoviesByCategory', 'getSeriesByCategory']);

    await TestBed.configureTestingModule({
      providers: [
        MediaListComponent,
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ category: 'action', type: 'Peliculas' }),
            snapshot: {
              paramMap: convertToParamMap({ category: 'action', type: 'Peliculas' })
            }
          }
        }
      ]
    }).compileComponents();

    component = TestBed.inject(MediaListComponent);
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should load favorite movies and series', (done) => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }];
    const mockSeries = [{ id: 1, title: 'Series 1' }];

    apiService.getFavoriteMovies.and.returnValue(of(mockMovies));
    apiService.getFavoriteSeries.and.returnValue(of(mockSeries));

    component.loadFav();

    expect(loadingService.show).toHaveBeenCalled();
    expect(apiService.getFavoriteMovies).toHaveBeenCalled();
    expect(apiService.getFavoriteSeries).toHaveBeenCalled();

    // Allow asynchronous operations to complete
    setTimeout(() => {
      expect(component.movies).toEqual(mockMovies);
      expect(component.series).toEqual(mockSeries);
      expect(loadingService.hide).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should load all movies and series', (done) => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }];
    const mockSeries = [{ id: 1, title: 'Series 1' }];

    apiService.getAllMovies.and.returnValue(of(mockMovies));
    apiService.getAllSeries.and.returnValue(of(mockSeries));

    component.loadMoviesAndSeries();

    expect(loadingService.show).toHaveBeenCalled();
    expect(apiService.getAllMovies).toHaveBeenCalled();
    expect(apiService.getAllSeries).toHaveBeenCalled();

    // Allow asynchronous operations to complete
    setTimeout(() => {
      expect(component.movies).toEqual(mockMovies);
      expect(component.series).toEqual(mockSeries);
      expect(loadingService.hide).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should add a favorite movie', (done) => {
    const mockResponse = { message: 'favorito agregado' };
    apiService.addFavMovie.and.returnValue(of(mockResponse));

    component.addFavMovie(1);

    setTimeout(() => {
      expect(apiService.addFavMovie).toHaveBeenCalledWith(1);
      done();
    }, 0);
  });

  it('should erase a favorite movie', (done) => {
    const mockResponse = { message: 'favorito borrado' };
    apiService.eraseFavMovie.and.returnValue(of(mockResponse));

    component.eraseFavMovie(1);

    setTimeout(() => {
      expect(apiService.eraseFavMovie).toHaveBeenCalledWith(1);
      done();
    }, 0);
  });

  it('should add a favorite series', (done) => {
    const mockResponse = { message: 'favorito agregado' };
    apiService.addFavSerie.and.returnValue(of(mockResponse));

    component.addFavSerie(1);

    setTimeout(() => {
      expect(apiService.addFavSerie).toHaveBeenCalledWith(1);
      done();
    }, 0);
  });

  it('should erase a favorite series', (done) => {
    const mockResponse = { message: 'favorito borrado' };
    apiService.eraseFavSerie.and.returnValue(of(mockResponse));

    component.eraseFavSerie(1);

    setTimeout(() => {
      expect(apiService.eraseFavSerie).toHaveBeenCalledWith(1);
      done();
    }, 0);
  });

  it('should load movies by category successfully', (done) => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }];
    apiService.getMoviesByCategory.and.returnValue(of(mockMovies));

    component.loadData('Action', 'Peliculas');

    setTimeout(() => {
      expect(apiService.getMoviesByCategory).toHaveBeenCalledWith('Action');
      expect(component.movies).toEqual(mockMovies);
      expect(component.series).toEqual([]);
      expect(loadingService.show).toHaveBeenCalled();
      expect(loadingService.hide).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should load series by category successfully', (done) => {
    const mockSeries = [{ id: 1, title: 'Series 1' }];
    apiService.getSeriesByCategory.and.returnValue(of(mockSeries));

    component.loadData('Drama', 'Series');

    setTimeout(() => {
      expect(apiService.getSeriesByCategory).toHaveBeenCalledWith('Drama');
      expect(component.series).toEqual(mockSeries);
      expect(component.movies).toEqual([]);
      expect(loadingService.show).toHaveBeenCalled();
      expect(loadingService.hide).toHaveBeenCalled();
      done();
    }, 0);
  });

});
