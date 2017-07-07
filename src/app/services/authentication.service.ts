import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(username: string, password: string) : Promise<boolean> {
        console.log('Login Service Login');
//         return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
//             .map((response: Response) => {
//                 // login successful if there's a jwt token in the response
//                 let user = response.json();
//                 if (user && user.token) {
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     localStorage.setItem('currentUser', JSON.stringify(user));
//                 }
//
//                 return user;
//             });
//
      localStorage.setItem('currentUser', '{}');

      return new Promise((resolve, reject) => {
          resolve(true);
      });
    }
 
    logout() : Promise<boolean> {
        console.log('Login Service Logout');
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

}
