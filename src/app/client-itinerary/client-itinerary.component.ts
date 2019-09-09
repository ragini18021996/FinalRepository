import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators, PatternValidator} from '@angular/forms';
import { StringifyOptions } from 'querystring';
import {AmazingTimePickerService} from 'amazing-time-picker';
import { MatDatepickerInputEvent } from '@angular/material';
import { any, string } from 'prop-types';
import { DatePipe, Time } from '@angular/common';
import { ApiService } from '../api.service';
import { Client } from '../client';
import { DateFormatPipe } from '../date-pipe.pipe';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Events } from '../events';


export interface eventValue {
  event: string;
  eventStartTimeDate: Date;
  eventEndTimeDate: Date;
  
}

let ELEMENT_DATA: eventValue[] = [
  //{event: 'Meal Unit-I Cafeteria', eventStartTimeDate: '2019-09-21', eventEndTimeDate:'2019-09-28'},
 ];


 let allEvents: Events[] = [
  //{event: 'Meal Unit-I Cafeteria', eventStartTimeDate: '2019-09-21', eventEndTimeDate:'2019-09-28'},
 ];
@Component({
  selector: 'app-client-itinerary',
  templateUrl: './client-itinerary.component.html',
  styleUrls: ['./client-itinerary.component.css']
})
export class ClientItineraryComponent implements OnInit {
  @ViewChild('table', {static: false}) table: MatTable<eventValue>;
  displayedColumns: string[] = ['event', 'eventStartTimeDate', 'eventEndTimeDate'];
   //dataSource = ELEMENT_DATA;

client : Client;
event:Events;
value='';
value1='';
AccountVal:string; 
ArrivalDate:Date;
DepartureDate:Date;
EventArrivalDate:Date;
EventDepartureDate:Date;
time:string;
time1:string;
  firstFormGroup: FormGroup;
 secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private timepicker: AmazingTimePickerService,public datepipe: DatePipe,private service:ApiService) {}
  public openDialog(){
    const ref= this.timepicker.open({
       time:'20:00',
       theme:'material-blue'
     });
     ref.afterClose().subscribe((data)=>{

       this.time=data;
       this.EventArrivalDate.setHours(parseInt(this.time));

     });
 }
 public openDialog1(){
  const ref= this.timepicker.open({
     time:'20:00',
     theme:'material-blue'
   });
   ref.afterClose().subscribe((data)=>{
     this.time1=data;
     this.EventDepartureDate.setHours(parseInt(this.time1));
   });
}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      'clientName' : ['', [Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z\\s]+$")]],

      'projectName':['', Validators.required],
      
      'arrivalDate' :['', [Validators.required]],
      
      'departureDate':['', Validators.required],
      'agenda':['', Validators.required],
       'account':['', Validators.required],
      
      'event':['', Validators.required],
       'eventStartTimeDate':['', Validators.required],
      'eventEndTimeDate':[],
       'viewEvents':['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      
    });
  }

   combined : string;
  
  onClick(val){
    this.value=val;
  }
  onClick1(val){
    this.value1=val;
    this.combined=this.value+":"+this.value1;
    //console.log(this.combined);
  }
  addEvent3(type: string, event: MatDatepickerInputEvent<Date>) { 
    console.log('I m here in add Event 3');
    this.EventArrivalDate=event.value;
    //console.log("event data"+ this.EventArrivalDate);
  
   }
   addEvent4(type: string, event: MatDatepickerInputEvent<Date>) { 
    console.log('I m here in add Event 4');
    this.EventDepartureDate=event.value;
    //console.log("event data"+ this.EventDepartureDate);
   }
  buttonEvent(){
    let data: eventValue[] = [];
    if (this.table.dataSource) {
      data = (this.table.dataSource as eventValue[]);
    }
    ELEMENT_DATA.push({ "event" : this.combined, "eventStartTimeDate" : this.EventArrivalDate,  "eventEndTimeDate":this.EventDepartureDate});
    data.push(ELEMENT_DATA[data.length]);

    
    
    this.table.dataSource = data;
   // alert(this.table.dataSource);
    this.table.renderRows();
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) { 
     this.ArrivalDate=event.value;
   
    }
    addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
      // this.stringDepart =this.datepipe.transform(event.value, 'yyyy-MM-dd');
      this.DepartureDate=event.value;
     }
  AccountDropdown(event){
    this.AccountVal=event.target.value
   
  }
  
  OnInsertClient(){
    
    console.log("event value class "+event);

    //here call the service to insert the array of Events
    console.log(ELEMENT_DATA);
      
    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      this.event = new  Events();
      this.event.title=ELEMENT_DATA[i].event;
      this.event.start=ELEMENT_DATA[i].eventStartTimeDate;
      this.event.end=ELEMENT_DATA[i].eventEndTimeDate;
      allEvents.push(this.event);

    }

  let client= this.firstFormGroup.value;
   this.client = new  Client();

     this.client.clientName = this.firstFormGroup.value.clientName;
     this.client .projectName = this.firstFormGroup.value.projectName;
      this.client.arrivalDate = this.ArrivalDate;
    this.client.deptDate = this.DepartureDate;
      this.client.account = this.AccountVal;

       this.client.agenda=this.firstFormGroup.value.agenda;
    
    this.client.eventData=allEvents;

    console.log("Event data"+this.client.eventData);
       
   
    this.service.InsertClient(this.client)
    .subscribe((result)=> {
      
      console.log(result);
      
    
  },
  error=>{
    //alert(error.message);
    console.log(error.message);
    
  },
    ()=> {
      console.log("Insertion successfull")
    }
    );
 }
  }
 
 
