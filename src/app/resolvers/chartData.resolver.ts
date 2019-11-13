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
        let minChartData = this._httpClient.getMinuteChartData();
        let hourChartData = this._httpClient.getHourChartData();
        let boxData = this._httpClient.getBoxData();
        let data = {minChartData, hourChartData, boxData}
        return data;
    }
}

