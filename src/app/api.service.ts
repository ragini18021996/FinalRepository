import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
 
import {catchError,map} from 'rxjs/operators';

import { Client } from './client';
import { Events } from './events';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  clients:Client[];
  events: Events[];
  event: Events;
  constructor(private _http : HttpClient) { 

  }

  Hello() : string
  {
    return "a";
  }
  getService() : Observable<Client[] >
  {
    console.log("In Service  View .... ")
    return this._http.get<Client[]>("/EventBasedCalendar/view");
  }
  getEventsById(clientId: number): Observable<Events[]>
{
  return this._http.get<Events[]>("/EventBasedCalendar/viewClientEvent/" + clientId);
}

  InsertClient(client : Client) : Observable<any>
  {
    
    console.log('Hello I m here');
    console.log("In Service " + client);
 

return this._http.post("/EventBasedCalendar/submitOnDb", client)
.pipe(
  map((res:Response)=>res),
  catchError(this.errorhandler));
  };

  InsertEvents(events : Event) : Observable<any>
  {
    
    console.log('Hello I m inserting events');
    console.log("In Service " + events);
 

return this._http.post("/EventBasedCalendar/addEvents",events)
.pipe(
  map((res:Response)=>res),
  catchError(this.errorhandler));
  };
 
errorhandler(error : Response)
{
  console.log(error.status);
  console.log(error);
  
  return throwError(error);
}
private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
}