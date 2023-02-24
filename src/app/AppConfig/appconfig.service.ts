import {InjectionToken} from "@angular/core";
import {AppConfig} from "./appconfig.interface";
import {environment} from "../../environments/environment";

/**
 * App service configuration.
 */
export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>("app.config");

/**
 * Sets the apiEndpoint attribute based on the value of the environment variable apiEndpoint.
 */
export const APP_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
};
