import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic'
import { OlympicService } from 'src/app/core/services/olympic.service'
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Participation } from 'src/app/core/models/Participation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pieChartData: { name: string, value: number }[] = []
  public view: [number, number] = [700, 400];
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;

  public countryCount: number = 0
  public joCount: number = 0

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(olympics => {
      if (olympics != null) {
        this.pieChartData = olympics.map((olympic: Olympic) => ({
          name: olympic.country,
          value: olympic.participations.reduce((acc: number, participation: Participation) => acc + participation.medals_count, 0)
        }))

        this.countryCount = olympics.length
        this.joCount = new Set(olympics.flatMap(olympic => olympic.participations.map(p => p.year))).size
      }
    })
  }
}
