import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Client } from '../client';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})

export class ViewClientComponent implements OnInit {
  clients : Client[];
  constructor(private service:ApiService) { }
  getServ() : Client[]{
    console.log("Calling Service");
    this.service.getService().subscribe(data=>
      this.clients=data
      );
    

    return this.clients;
  }

  ngOnInit() {
    this.clients = this.getServ();
  }

}
