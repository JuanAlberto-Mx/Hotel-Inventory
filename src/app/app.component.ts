import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'jahm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'HotelInventory';
  role = 'Admin';

  // user variable is defined in ng-template
  @ViewChild('user', {read: ViewContainerRef}) userRef!: ViewContainerRef;

  // name variable to reference the template
  @ViewChild('name', {static: true}) nameRef!: ElementRef;

  ngOnInit(): void {
    // Access to innerText property by using nativeElement
    this.nameRef.nativeElement.innerText = "Holiday Inn Orizaba";
  }
}
