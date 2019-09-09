import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientItineraryComponent } from './client-itinerary.component';

describe('ClientItineraryComponent', () => {
  let component: ClientItineraryComponent;
  let fixture: ComponentFixture<ClientItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
