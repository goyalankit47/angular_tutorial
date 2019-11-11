import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
// import * as data from './../constants/data.json';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private httpClient: HttpClient) { }
  getChartData() {
    return this.httpClient.get(environment.graphApi);
    // return new Observable((observer) =>{
    //   observer.next(data.graph_value)
    // })
    // return data.graph_value;
  }
  getBoxData() {
    return this.httpClient.get(environment.boxApi);
  }
}
