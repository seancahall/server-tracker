import { Injectable } from '@angular/core';
import { Server } from './server';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };

  private serversUrl = 'api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(private httpc: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerService');
  }

  /** GET: get existing records from in-memory db to build server table */
  getServers():Observable<any>{
    return this.httpc.get<any>(this.serversUrl); 
  }

  /** POST: add a new server to the in-memopry db */
  addServer (server: Server): Observable<Server> {
    return this.httpc.post<Server>(this.serversUrl, server, this.httpOptions)
      .pipe(
        catchError(this.handleError('addServer', server))
      );
  }

  /** DELETE: delete the server from the in-memory db */
  deleteServer (id: number): Observable<{}> {
    const url = `${this.serversUrl}/${id}`;
    return this.httpc.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteServer'))
      );
  }

  /** PUT: update the server record in the in-memory db. Returns the updated server upon success. */
  updateServer (server: Server): Observable<Server> {
    return this.httpc.put<Server>(this.serversUrl, server, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateServer', server))
      );
  }

}
