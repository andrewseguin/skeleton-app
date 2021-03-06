import 'hammerjs';

import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {MatIconRegistry} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {Theme} from 'app/content/services/theme';
import {Login} from 'app/login/login';
import {LoginModule} from 'app/login/login.module';
import {GlobalConfigDao} from 'app/service/global-config-dao';

import {App} from './app';
import {FIREBASE_CONFIG} from './firebase.config';
import {UsersDao} from './service/users-dao';

@NgModule({
  declarations: [App],
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    LoginModule,
    RouterModule.forRoot(
        [
          {path: 'login', component: Login},
          {path: '', loadChildren: 'app/content/content.module#ContentModule'},
        ],
        {enableTracing: true}),
  ],
  providers: [
    MatIconRegistry,
    UsersDao,
    GlobalConfigDao,
    Theme,
    {provide: FirestoreSettingsToken, useValue: {}},
  ],
  bootstrap: [App]
})
export class AppModule {
}
