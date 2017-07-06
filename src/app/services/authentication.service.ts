import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(email: string, password: string) : Observable<boolean> {
        return this.http.post('http://localhost:5000/api/user/login', { email, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
                if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                  localStorage.setItem('currentUser', '{}');
                }

                return user;
            });
    }

    signup(firstName: string, lastName: string, email: string, password: string) : Observable<boolean> {
        return this.http.post('http://localhost:5000/api/user/signup', { firstName, lastName, email, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
                if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                  localStorage.setItem('currentUser', '{}');
                }

                return user;
            });
    }
 
    logout() : Observable<boolean> {
        console.log("Login Service Logout");
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        return Observable.create(true);
    }

}
