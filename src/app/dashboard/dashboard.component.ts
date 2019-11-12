import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from './../services/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  multi: any[];
  solarData: any;
  loadData: any;
  current_solar_power: number;
  current_load_power: number;
  current_battery_percentage: number;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = '';
  showXAxisLabel = false;
  showYAxisLabel = false;

  colorScheme = {
    domain: ['#d97a0d', '#03ad9f']
  };
  autoScale = false;
  alive: boolean;

  constructor(private _httpClient: HttpClientService, private _datePipe: DatePipe, private _activatedRoute: ActivatedRoute) {
    let data = this._activatedRoute.snapshot.data["data"];
    if (data != null) {
      data.chartData.subscribe((res) => { this.formatChartData(res.graph_value) });
      data.boxData.subscribe((res) => { this.current_battery_percentage = res.value });
    }
    this.multi = [{
      "name": "Load Active Power",
      "series": []
    },
    {
      "name": "Solar Power",
      "series": []
    }];
  }

  ngOnInit() {
    setInterval(() => {
      this._httpClient.getChartData()
        .subscribe((response) => {
          this.formatChartData(response["graph_value"]);
        })

      this._httpClient.getBoxData()
        .subscribe((response) => {
          this.current_battery_percentage = parseFloat((response["value"]).toFixed(2));
        })
    }, 60000)
  }

  formatChartData(data) {
    let obj = JSON.parse(JSON.stringify(this.multi));
    if(data[0].values)
    	this.loadData = data[0].values;
    if(data[1].values)
    	this.solarData = data[1].values;
    for (let i = 0; i < data[0]["values"].length; i++) {
      obj[0].series.push(
        { name: this.formatDate(this.loadData[i].timestamp), value: this.formatValues(this.loadData[i].value) }
      )
      obj[1].series.push(
        { name: this.formatDate(this.solarData[i].timestamp), value: this.formatValues(this.solarData[i].value) }
      )
    }
    this.current_load_power = this.formatValues(this.loadData[(this.loadData.length) - 1].value);
    this.current_solar_power = this.formatValues(this.solarData[(this.solarData.length) - 1].value);
    this.multi = obj;
  }

  formatValues(values) {
  	if(values >= 1000)
    	values = values / 1000;
    return parseFloat((values).toFixed(3));
  }

  formatDate(date) {
    return this._datePipe.transform(date, 'HH:mm:ss');
  }

}
