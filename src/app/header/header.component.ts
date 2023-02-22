import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jahm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  // Property to set the header title
  title: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

}
