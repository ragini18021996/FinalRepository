import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Events } from '../events';
import { ApiService } from '../api.service';
import { Client } from '../client';
import { ThrowStmt } from '@angular/compiler';
import {  ActivatedRoute} from '@angular/router';

import { constrainPoint } from '@fullcalendar/core';
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

  event:Events;
  
  calendarPlugins = [dayGridPlugin];

  handleDateClick(arg) { // handler method
     
    alert(arg.dateStr);
  }
    events: Events[];
    events2: Events[];
   clientId: number;
  // client: Client;
 
  

  constructor(private service: ApiService, private _ActivatedRoute : ActivatedRoute  ) {

   
  }
  getEvent(){
    this.service.getEventsById(this.clientId).subscribe((data) => {
      console.log('Fetching Result');
      this.events=data;
      console.log('inside getevent call '+this.events);
      
    });
      
  }
  
    ngOnInit() {
      this._ActivatedRoute.paramMap.subscribe(params => { 
        this.clientId = Number(params.get('clientId')); })
        
     
      this.getEvent();
    }
}
