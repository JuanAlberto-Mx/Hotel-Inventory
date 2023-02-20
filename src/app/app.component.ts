import { Component } from '@angular/core';

/*@Component({
  selector: 'app-root',
  template: `<h1>Hello world</h1><h3>Using my own inline template</h3>`,
  styleUrls: ['./app.component.scss']
})*/
@Component({
  selector: 'jahm-root', // Selector name comes from angular.json
  template: `<h1>Hello world</h1><h3>Using my own inline template</h3>`, // Defining an inline template
  styles: [`h1{color: darkred;} h3{color: orangered}`] // Defining an inline style
})
export class AppComponent {
  title = 'HotelInventory';
}
