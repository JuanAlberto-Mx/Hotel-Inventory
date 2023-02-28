import {Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef} from '@angular/core';
import {LoggerService} from "./logger.service";
import {localStorageToken} from "./localstorage.token";

@Component({
  selector: 'jahm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appTitle = 'HotelInventory';
  userRole = 'Admin';

  // user variable is defined in ng-template
  @ViewChild('user', {read: ViewContainerRef}) userRef!: ViewContainerRef;

  // name variable to reference the template
  @ViewChild('name', {static: true}) nameRef!: ElementRef;

  /**
   * Constructor with LoggerService and localStorage dependency injection.
   * Use of @Optional decorator in case of @Injectable decorator is not
   * declared in the service.
   * @param loggerService the LoggerService instance.
   * @param localStorage the localStorage instance.
   */
  constructor(@Optional() private loggerService: LoggerService, @Inject(localStorageToken) private localStorage: any) {
  }

  ngOnInit(): void {
    /**
     * Access to the loggerService dependency.
     * Use of '?' to avoid an error in case of property nonexistence because of null values.
     */
    this.loggerService?.log("AppComponent.ngOnInit()");

    // Access to innerText property by using nativeElement
    this.nameRef.nativeElement.innerText = "Holiday Inn Orizaba";
  }
}
