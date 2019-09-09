import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ClientItineraryComponent} from './client-itinerary/client-itinerary.component';
import {ViewClientComponent} from './view-client/view-client.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ViewEventsComponent } from './view-events/view-events.component';
import { FullCalendarModule} from '@fullcalendar/angular';


export const RouterTable: Routes = [
  {path : '', 
  component : ClientItineraryComponent},
  {
    path:'clientItinerary',
    component:ClientItineraryComponent
  },
  {
    path :'viewCient' , 
    component : ViewClientComponent
  },
  {
    path :'viewevents/:clientId' , 
    component : ViewEventsComponent
  },
  {
    path :'**' , 
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule, CommonModule,ReactiveFormsModule,BrowserAnimationsModule,MatCheckboxModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    MatStepperModule,FormsModule,ReactiveFormsModule,MatSelectModule,MatMenuModule,MatButtonModule,MatTableModule,FullCalendarModule],

  declarations :[HomeComponent, ClientItineraryComponent, ViewClientComponent,NotFoundComponent,ViewEventsComponent],
  exports: [HomeComponent, ClientItineraryComponent, ViewClientComponent,NotFoundComponent,BrowserAnimationsModule,MatCheckboxModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    MatStepperModule,FormsModule,ReactiveFormsModule,MatSelectModule,MatMenuModule,MatButtonModule,MatTableModule,DatePipe,ViewEventsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  

})
export class AppRoutingModule { }
