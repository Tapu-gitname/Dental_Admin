import { Component, OnInit } from '@angular/core';
// import { CardModule } from 'primeng/card';
// import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css',
  // imports: [CardModule, ChartModule]
})
export class RevenueComponent implements OnInit {
  // lineChartData: any;

  ngOnInit() {
    // this.lineChartData = {
    //   labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    //   datasets: [
    //     {
    //       label: 'Daily Revenue',
    //       data: [1200, 1500, 1800, 1300, 2200, 2100, 1700, 1600, 1900, 2500, 2400, 2000, 2700, 2300, 2600, 2800, 2200, 2100, 2000, 2400, 2300, 2500, 2700, 2600, 2800, 2900, 3000, 3200, 3300, 3400],
    //       fill: false,
    //       borderColor: '#42A5F5',
    //       tension: 0.4
    //     }
    //   ]
    // };
  }
}
