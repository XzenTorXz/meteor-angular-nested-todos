import './imports/polyfills';
import { Meteor } from 'meteor/meteor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

Meteor.startup(() => {

  if (Meteor.isProduction) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule);

});
