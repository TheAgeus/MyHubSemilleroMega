import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api-service/api.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../loading-service/loading.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  movieId: string = "";
  element: any;
  chapters: any[] = []; // Array to store chapters
  type: string = "";
  loading: boolean = true;
  error: string = '';

  apiService = inject(ApiService);
  loadingService = inject(LoadingService);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadData(params['type'], +params['id']);
    });
  }

  loadData(type: string, id: number): void {
    this.loadingService.show();

    let dataObservable$;

    if (type === 'Peliculas') {
      dataObservable$ = this.apiService.getMovieById(id);
    } else if (type === 'Series') {
      dataObservable$ = this.apiService.getSerieById(id);
      this.loadChapters(id); // Load chapters if it's a series
    } else {
      console.error('Tipo de datos no válido');
      this.loadingService.hide();
      return;
    }

    dataObservable$.pipe(
      finalize(() => this.loadingService.hide())
    ).subscribe({
      next: (data) => {
        this.element = data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  loadChapters(serieId: number): void {
    this.apiService.getChaptersBySerieId(serieId)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (chapters) => {
          this.chapters = chapters;
        },
        error: (err) => {
          console.error('Error fetching chapters', err);
        }
      });
  }

  getTitle(): string {
    return this.element['name_m'] ?? this.element['name_s'] ?? 'Default Name';
  }

  getCategory(): string {
    return this.element['category_m'] ?? this.element['category_s'] ?? 'Default category';
  }

  getDesc(): string {
    return this.element['description_m'] ?? this.element['description_s'] ?? 'Default description';
  }
}
