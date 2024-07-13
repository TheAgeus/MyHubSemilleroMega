import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ], // Include DetalleComponent in declarations
      providers: [
        { 
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }) // Mocking route params
            },
            params: of({ id: '1' }) // Mocking ActivatedRoute.params observable
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComponent); // Create component fixture
    component = fixture.componentInstance; // Get component instance
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases here as needed
});