import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formanimal',
  templateUrl: './formanimal.component.html',
  styleUrls: ['./formanimal.component.css']
})
export class FormanimalComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  
  constructor() { }

  ngOnInit(): void {
  }

}
