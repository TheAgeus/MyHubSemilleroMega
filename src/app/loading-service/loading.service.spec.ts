import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading$ to true when show is called', fakeAsync(() => {
    let value;
    service.loading$.subscribe(val => value = val);

    service.show();
    tick(); // Simulate passage of time for the Observable to emit

    expect(value).toBeTrue();
  }));

  it('should set loading$ to false when hide is called', fakeAsync(() => {
    let value;
    service.loading$.subscribe(val => value = val);

    service.hide();
    tick(); // Simulate passage of time for the Observable to emit

    expect(value).toBeFalse();
  }));
});
