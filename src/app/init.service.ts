import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InitService {

  // Property to set the configuration file address
  config: any;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * init method is loaded before the application is initialized.
   * The file loaded is found in assets directory and contains specific properties.
   */
  init() {
    return this.httpClient.get('assets/config.json').pipe(tap((config) => this.config = config));
  }
}
