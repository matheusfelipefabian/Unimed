import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public af: AngularFireAuth) { }
      //   this.af.authState.subscribe(auth => {
      //   if(auth) {
      //     this.router.navigateByUrl('/members');
      //   }
      // });

   login(user: User) {
     return this.af.auth.signInWithEmailAndPassword(user.email, user.password);
   }

   register(user: User) {
     return this.af.auth.createUserWithEmailAndPassword(user.email, user.password);
   }

   getAuth() {
     return this.af.auth;
   }

}
 //
 //  logout() {
 //   return this.af.auth.signOut();
 // }
 //
