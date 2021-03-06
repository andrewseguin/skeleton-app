import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {UsersDao} from 'app/service/users-dao';
import {distinctUntilChanged} from 'rxjs/operators';
import {sendPageview} from './utility/analytics';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor(
      private snackBar: MatSnackBar, private router: Router,
      private usersDao: UsersDao, private afAuth: AngularFireAuth) {
    this.router.events
        .pipe(distinctUntilChanged((prev: any, curr: any) => {
          if (curr instanceof NavigationEnd) {
            return prev.urlAfterRedirects === curr.urlAfterRedirects;
          }
          return true;
        }))
        .subscribe(x => sendPageview(x.urlAfterRedirects));

    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.navigateToLogin();
        return;
      }

      // Add or update the users profile in the db
      this.usersDao.addUserData(auth);
      this.notifyLoggedInAs(auth.email);
    });
  }

  /**
   * Send user to the login page and send current location for when they are
   * logged in.
   */
  private navigateToLogin() {
    if (location.pathname !== '/login') {
      this.router.navigate(['login'], {fragment: location.pathname});
    }
  }

  /** Show snackbar showing the user who they are logged in as. */
  private notifyLoggedInAs(email: string) {
    const snackbarConfig = new MatSnackBarConfig();
    snackbarConfig.duration = 2000;
    this.snackBar.open(`Logged in as ${email}`, null, snackbarConfig);
  }
}
