
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'login', component: LoginComponent }
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [
      RouterModule
    ]
})
export class AppRoutingModule { }
