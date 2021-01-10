import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  private ejecutarQuery<T>( query: string ){

    query = apiUrl + query;


    return this.http.get<T>( query, { headers } );

  }

  getTopHeadlines () {

    this.headlinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=us&page=${ this.headlinesPage }`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=44c5c0680c5546aca6492c57466bb3bc`);
  }

  getTopHeadlinesCategoria( categoria: string ){

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    
    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=44c5c0680c5546aca6492c57466bb3bc`);

    return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=de&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
