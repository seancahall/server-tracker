import { Component, Input } from '@angular/core';
import { Server } from '../server';
import * as moment from 'moment';

@Component({
  selector: 'overdue-servers',
  templateUrl: './overdue-servers.component.html',
  styleUrls: ['./overdue-servers.component.css']
})
export class OverdueServersComponent {

  @Input() servers: Server[];
  
  currentDate = new Date();
 // currentDate.setHours(0,0,0,0);

  // calculate the number of days past due
  getDays(deadline) {

    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    const parsedDate = new Date(deadline);
    let todaysDate = new Date(currentDate);
    todaysDate.setHours(0,0,0,0);
    const timeDiff = Math.abs(todaysDate.getTime() - parsedDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays > 1 ? diffDays + ' days ago' : diffDays + ' day ago';
  }

}
