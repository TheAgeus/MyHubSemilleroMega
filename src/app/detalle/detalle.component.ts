import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api-service/api.service';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';


@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent {

  // For knowing what movie im gonna show, for filtering
  movieId: string = "";

  element: any;
  
  type:string = "";

  loading: boolean = true;

  error: string = '';
  // api service
  apiService = inject(ApiService);

  loadingService = inject(LoadingService);

  constructor(private route: ActivatedRoute) { }

  // For filter on init
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.type = params['type']
      this.loadData(params['type'], +params['id'])
    })
  }
  

  loadData(type:string, id:number) : void {
    this.loadingService.show();

    let dataObservable$;

    if (type === 'Peliculas') {
      dataObservable$ = this.apiService.getMovieById(id);
    } else if (type === 'Series') {
      dataObservable$ = this.apiService.getSerieById(id);
    } else {
      console.error('Tipo de datos no válido');
      this.loadingService.hide();
      return;
    }

    dataObservable$.pipe(
      finalize(() => this.loadingService.hide()) // Ocultar el modal de carga después de que se carguen los datos
    ).subscribe({
      next: (data) => {
        console.log("response", data)
        this.element = data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  getTitle() :string{
    return this.element['name_m'] ?? this.element['name_s'] ?? 'Default Name';
  }
  getCategory() :string{
    return this.element['category_m'] ?? this.element['category_s'] ?? 'Default category';
  }
  getDesc() :string{
    return this.element['description_m'] ?? this.element['description_s'] ?? 'Default description';
  }
 
}
