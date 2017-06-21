// reference to es6 typescript types.
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
