import { Component } from '@angular/core';
import { PageVisitTrackerService } from 'src/app/page-visit-tracker.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent {
logEntries: any[] = [];
  localData: any = [];

constructor(private pageVisitTracker: PageVisitTrackerService) {
  this.localData = localStorage.getItem('visited page');
  this.localData  = JSON.parse(this.localData);
  console.log(this.localData);
  
}

}
