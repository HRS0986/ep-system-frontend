import { Injectable, NgZone } from '@angular/core';
import { FnResponse } from "../types";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { LoginStatus } from "../constants";
import firebase from "firebase/compat/app";
import { UserService } from "./user.service";
import { AuthRoutes, CustomerRoutes } from "../route-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: firebase.User | undefined; // Save logged in user data

  constructor(
      public angularFireAuth: AngularFireAuth, // Inject Firebase auth service
      public router: Router,
      public ngZone: NgZone, // NgZone service to remove outside scope warning
      public userService: UserService,
  ) { }

  public InitAuth(callback: (arg1: firebase.User | null) => void) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        callback(user);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        callback(null);
      }
    });
  }

  // Sign in with email/password
  public SignIn(email: string, password: string): Promise<FnResponse> {
    return this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .then(async (result: any) => {
          await this.userService.SetFirebaseUserData(result.user);
          return {
            status: true,
            message: "Successfully logged in",
            data: result.user,
          };
        })
        .catch((error) => {
          console.log(error.message);
          return {
            status: false,
            message: error.message as string,
            data: error
          };
        });
  }

  // Sign up with email/password
  public SignUp(email: string, password: string): Promise<FnResponse> {
    return this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((doc) => {
          return {
            status: true,
            message: "Successfully signed up",
            data: doc.user,
          };
        })
        .catch((error) => {
          return {
            status: false,
            message: error.message as string,
            data: null,
          };
        });
  }

  public async ChangePassword(oldPassword: string, newPassword: string): Promise<FnResponse> {
    const user = await this.angularFireAuth.currentUser;
    if (user == null) {
      return {
        status: false,
        message: "User not found",
        data: null,
      };
    }

    const credential = firebase.auth.EmailAuthProvider.credential(user.email!, oldPassword);
    return user.reauthenticateWithCredential(credential).then(() => {
      return user.updatePassword(newPassword).then(() => {
        return {
          status: true,
          message: "Password changed successfully",
          data: null,
        };
      }).catch((error) => {
        return {
          status: false,
          message: error.message as string,
          data: null,
        };
      });
    }).catch((error) => {
      return {
        status: false,
        message: error.message as string,
        data: error,
      };
    });
  }

  // Send email verification when new user sign up
  public SendVerificationMail() {
    return this.angularFireAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          // TODO: Implement email verification page
          this.router.navigate(['verify-email-address']);
        });
  }

  // Reset Forgot password
  public ForgotPassword(passwordResetEmail: string) {
    return this.angularFireAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          window.alert(error);
        });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): LoginStatus {
    const user = JSON.parse(localStorage.getItem('user')!);
    // TODO: Implement email verification
    // return user !== null && user.emailVerified !== false ? LoginStatus.LOGGED_IN : LoginStatus.LOGGED_OUT;
    return user !== null ? LoginStatus.LOGGED_IN : LoginStatus.LOGGED_OUT;
  }

  // Return Is Admin User
  public isAdmin(): boolean{
    return true;
  }

  // Auth logic to run auth providers
  public AuthLogin(provider: any) {
    return this.angularFireAuth
        .signInWithPopup(provider)
        .then(async (result: any) => {
          this.ngZone.run(() => {
            this.router.navigate([CustomerRoutes.Ep.url]);
          });
          await this.userService.SetFirebaseUserData(result.user);
        })
        .catch((error) => {
          window.alert(error);
        });
  }

  // Sign out
  public SignOut(): Promise<FnResponse>  {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([`${AuthRoutes.Root}/${AuthRoutes.Login}`]).then();
      return {
        status: true,
        message: "Successfully logged out",
        data: null,
      };
    });
  }
}
