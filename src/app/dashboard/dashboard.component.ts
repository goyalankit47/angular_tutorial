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
  minData: any;
  hourData: any;
  current_solar_power: number;
  current_load_power: number;
  current_battery_percentage: number = 0;
  selected_value: String = "1 min";
  toggleOptions: Array<String> = ["1 min", "1 hour"];

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
      data.minChartData.subscribe((res) => {
        this.minData = res.graph_value
        this.renderChart();
      });
      data.hourChartData.subscribe((res) => { this.hourData = res.graph_value });
      data.boxData.subscribe((res) => { this.current_battery_percentage = res.value });
    }
  }

  ngOnInit() {
    setInterval(() => {
      this._httpClient.getMinuteChartData()
        .subscribe((response) => {
          this.minData = response["graph_value"];
          this.renderChart();
        })

      this._httpClient.getBoxData()
        .subscribe((response) => {
          this.current_battery_percentage = parseFloat((response["value"]).toFixed(2));
        })
    }, 60000)

    setInterval(() => {
      this._httpClient.getHourChartData()
        .subscribe((response) => {
          this.hourData = response["graph_value"];
          this.renderChart();
        })
    }, 1000 * 3600)
  }

  selectionChanged(item) {
    this.renderChart();
  }

  renderChart() {
    if (this.selected_value == '1 min') {
      this.formatChartData(this.minData);
    } else {
      this.formatChartData(this.hourData);
    }
  }

  formatChartData(data) {
    let obj = [{
      "name": "Load Active Power",
      "series": []
    },
    {
      "name": "Solar Power",
      "series": []
    }];
    if (data[0].values)
      this.loadData = data[0].values;
    if (data[1].values)
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
    if (values >= 1000)
      values = values / 1000;
    return parseFloat((values).toFixed(3));
  }

  formatDate(date) {
    if (this.selected_value == "1 min") {
      return this._datePipe.transform(date, 'HH:mm:ss');
    } else {
      return this._datePipe.transform(date, 'H');
    }
  }

}
