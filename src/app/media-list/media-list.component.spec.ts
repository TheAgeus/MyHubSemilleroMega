import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaListComponent } from './media-list.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { LoadingService } from '../loading-service/loading.service';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ category: 'Fantasía', type: 'Peliculas' }) // Mocking route params
            },
            params: of({ category: 'Fantasía', type: 'Peliculas' }) // Mocking ActivatedRoute.params observable
          }
        },
        LoadingService // Provide LoadingService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService); // Inject LoadingService

    spyOn(loadingService, 'show').and.callThrough();
    spyOn(loadingService, 'hide').and.callThrough();

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter movies based on category and hide loading after delay', (done: DoneFn) => {
    const mockMovies = [
      { 
        id: 1,
        category: "Fantasía",
        img: 'https://image.tmdb.org/t/p/original/cSkGnAA9b7Hj4rs51KdMsUfFpBd.jpg', 
        title: "The Lord of The Rings - Vol 1",
        shortDesc: "An epic and fantastic adventure with hobbits and some other creatures. All is about a mighty ring lol",
        fav: false
      },
      { 
        id: 2,
        category: "Terror",
        img: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 
        title: "The Conjuring",
        shortDesc: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
        fav: false
      },
      { 
        id: 3,
        category: "Terror",
        img: 'https://th.bing.com/th/id/OIP.rsE5k8cZMlOagEk6UfjPPAAAAA?rs=1&pid=ImgDetMain', 
        title: "A Nightmare on Elm Street",
        shortDesc: "The monstrous spirit of a slain janitor seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death.",
        fav: false
      },
      {  
        id: 4,
        category: "Terror",
        img: 'https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', 
        title: "It",
        shortDesc: "In the small town of Derry, a group of kids band together to face a shapeshifting monster that takes the form of a clown.",
        fav: false
      },
      { 
        id: 5,
        category: "Terror",
        img: 'https://image.tmdb.org/t/p/original/oWyQdmhVgUIbNuRpn272ShJrrcZ.jpg', 
        title: "The Exorcist",
        shortDesc: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
        fav: false
      },
      {
        id: 6,
        category: "Fantasía",
        img: 'https://is5-ssl.mzstatic.com/image/thumb/Video128/v4/61/d0/b3/61d0b322-414b-a7ba-dfdc-4c4a0e4663ad/source/900x900bb.jpg',
        title: "Harry Potter and the Sorcerer's Stone",
        shortDesc: "An orphaned boy discovers he is a wizard on his 11th birthday and goes on to attend a magical school, uncovering the truth about his parents and his destiny.",
        fav: false
      },
      {
        id: 7,
        category: "Terror",
        img: 'https://th.bing.com/th/id/OIP.RbvsiuoskRaf_vnuiJ0nKQHaLH?rs=1&pid=ImgDetMain',
        title: "Hereditary",
        shortDesc: "After the death of their secretive grandmother, a family is haunted by tragic and disturbing occurrences, unraveling dark secrets about their ancestry.",
        fav: false
      },
      {
        id: 8,
        category: "Terror",
        img: 'https://image.tmdb.org/t/p/original/ArPWMf2leE6H9IIJ3tHVt6uewLR.jpg',
        title: "The Babadook",
        shortDesc: "A single mother and her child fall into a deep well of paranoia when an eerie children's book titled 'Mister Babadook' manifests in their home.",
        fav: false
      }
    ];
    component.movies = mockMovies;

    component.category = 'Fantasía'; // Example category for testing

    component.filterMovies();

    expect(loadingService.show).toHaveBeenCalled();

    setTimeout(() => {
      fixture.detectChanges(); // Update view after filtering
      expect(component.filteredMovies.length).toEqual(2); // Ensure movies are filtered correctly
      expect(loadingService.hide).toHaveBeenCalled();
      done();
    }, 2000); // Adjust timeout to match delay in filterMovies() method
  });

  it('should update localStorage with movies array', () => {
    // Prepare some mock movies
    const mockMovies = [
      { id: 1, category: 'Fantasía', img: '...', title: 'Movie 1', shortDesc: '...', fav: false },
      { id: 2, category: 'Terror', img: '...', title: 'Movie 2', shortDesc: '...', fav: false }
    ];

    // Set the movies array in the component
    component.movies = mockMovies;

    // Call the method to update localStorage
    component.updateLocalStorage();

    // Retrieve from localStorage and parse JSON
    const storedMovies = localStorage.getItem('movies') as string;
    const storedMoviesArray = JSON.parse(storedMovies);

    // Assert that storedMoviesArray matches mockMovies
    expect(storedMoviesArray).toEqual(mockMovies);
  });

});