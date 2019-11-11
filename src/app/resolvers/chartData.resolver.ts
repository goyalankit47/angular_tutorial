import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../services/http-client.service';
import { forkJoin } from 'rxjs';

@Injectable()
export class ChartDataResolver implements Resolve<any> {
    constructor(private _httpClient: HttpClientService) {
    }

    resolve(): any {
        let chartData = this._httpClient.getChartData();
        let boxData = this._httpClient.getBoxData();
        let data = {chartData, boxData}
        return data;
    }
}

