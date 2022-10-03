import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Olympic } from 'src/app/core/models/Olympic'
import { OlympicService } from 'src/app/core/services/olympic.service'

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  public olympicName: string = ''
  public participationCount = 0
  public totalMedalCount = 0
  public totalAthleteCounts = 0
  public lineChartData: { name: string, series: { name: string, value: number }[] }[] = []

  public view: [number, number] = [700, 400];
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;

  // options
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const olympicName = this.route.snapshot.params['id'];

    this.olympicService.getOlympics().subscribe(olympics => {
      if (olympics != null) {
        const olympic = olympics.find(olympic => olympic.country === olympicName)
        if (olympic != null) {
          this.olympicName = olympic.country
          this.participationCount = olympic.participations.length
          this.totalMedalCount = olympic.participations.reduce((acc, p) => acc + p.medals_count, 0)
          this.totalAthleteCounts = olympic.participations.reduce((acc, p) => acc + p.athlete_count, 0)
          this.lineChartData = [{
            name: 'Medal count',
            series: olympic.participations.map(p => ({
              name: `${p.year}`,
              value: p.medals_count
            }))
          }]

          console.log(this.lineChartData)
        }
      }
    })
  }

}
