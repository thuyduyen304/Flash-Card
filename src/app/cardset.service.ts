import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsetService {
  url = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

  getSetsByCat(category): Observable<any> {
    return this.http.get(this.url + '/sets?cat=' + category)
       .pipe(
         map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  getSetsFavorite(uid): Observable<any> {
    return this.http.get(this.url + '/fav?uid=' + uid + '&_expand=set')
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  getSetsRecent(uid): Observable<any> {
    return this.http.get(this.url + '/recent?uid=' + uid + '&_expand=set')
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  getSetById(id): Observable<any> {
    return this.http.get(this.url + '/sets/' + id)
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  updateSet(id, set): Observable<any> {
    return this.http.put(this.url + '/sets/' + id, JSON.stringify(set), this.httpOptions).pipe(
      tap(_ => console.log(`updated set id=${id}`)),
      retry(1),
      catchError(this.handleError)
    )
  }

  createSet(set): Observable<any> {
    console.log(set);
    return this.http.post<any>(this.url + '/sets', JSON.stringify(set), this.httpOptions).pipe(
      tap((set) => console.log(`added set w/ id=${set.id}`)),
      retry(1),
      catchError(this.handleError)
    );
  }

  getSetsDetails(ids): Observable<any> {
    let query = '';
    for (let id of ids) {
      query += '&' + id;
    }
    return this.http.get(this.url + '/sets?_embed=cards' + query)
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  getSetDetails(id): Observable<any> {
    return this.http.get(this.url + '/sets/' + id + '?_embed=cards')
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  getCardById(id): Observable<any> {
    return this.http.get(this.url + '/cards/' + id)
       .pipe(
        map(this.extractData),
        // retry(1),
        catchError(this.handleError)
      )
  }

  updateCard(id, card): Observable<any> {
    return this.http.put(this.url + '/cards/' + id, JSON.stringify(card), this.httpOptions).pipe(
      tap(_ => console.log(`updated card id=${id}`)),
      catchError(this.handleError)
    )
  }

  createCard(card): Observable<any> {
    console.log(card);
    return this.http.post<any>(this.url + '/cards', JSON.stringify(card), this.httpOptions).pipe(
      tap((card) => console.log(`added set w/ id=${card.id}`)),
      retry(1),
      catchError(this.handleError)
    );
  }
}
