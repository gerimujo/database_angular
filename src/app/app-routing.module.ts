import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { DatabasesqlComponent } from './databasesql/databasesql.component';
import { OpendatabseComponent } from './opendatabse/opendatabse.component';
import { TableopenedComponent } from './tableopened/tableopened.component';

const routes: Routes = [
  { path: '', component: HomecomponentComponent },
  { path: 'home/:data', component: DatabasesqlComponent },
  { path: 'home/:data/:path', component: DatabasesqlComponent },
  { path: 'open/:data', component: OpendatabseComponent },
  { path: 'open/:data/:path', component: OpendatabseComponent },
  { path: 'opentable/:data/:path', component: TableopenedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
