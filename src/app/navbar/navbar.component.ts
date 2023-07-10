import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private navigate1: Router,
    private CookieSer: CookieService,
    private HttpClient: HttpClient
  ) {}
  navigate() {
    this.navigate1.navigate(['/home/Databases']);
  }
  newtable(x: number) {
    this.navigate1.navigate([`open/add/${x}`]);
  }
  public plus: String = 'fa-solid fa-square-plus';
  public minus: String = 'fa-solid fa-square-minus';
  public nxjerrshenj: String = 'fa-solid fa-square-plus';
  navigatetodatabase(x: number) {
    this.navigate1.navigate([`open/STRUCTURE/${x}`]);
  }
  public databases2: { id: number; name: string; table: any[] }[] = [];
  /* public databses: any = [
    {
      id: 1,
      name: 'databses1',
      shenj: 'fa-solid fa-square-plus',
      table: [
        {
          tablename: 'table1',
          shenjtab: 'fa-solid fa-square-plus',
        },
        {
          tablename: 'table2',
          shenjtab: 'fa-solid fa-square-plus',
        },
        {
          tablename: 'table3',
          shenjtab: 'fa-solid fa-square-plus',
        },
        {
          tablename: 'table1',
          shenjtab: this.plus,
        },
        {
          tablename: 'table1',
          shenjtab: 'fa-solid fa-square-plus',
        },
      ],
    },
  ];
*/
  public databses: { id: number; name: string; shenj: string; table: any[] }[] =
    [];
  ngOnInit() {
    this.get();
    this.HttpClient.get('http://localhost:8080/gettoken', {
      responseType: 'text',
    })
      .pipe(
        catchError(
          catchError((error) => {
            console.log('Error occurred:', error);
            return throwError('Something went wrong');
          })
        )
      )
      .subscribe((response: any) => {
        this.CookieSer.set('role', response);
        console.log(response);
      });
  }
  get() {
    console.log(this.databses);
    this.HttpClient.get('http://localhost:8080/getdatabaseAndTable').subscribe(
      (response: any) => {
        console.log(response);
        this.databases2 = response;
        const body = this.databases2.map((d) => {
          const body1 = d.table.map((c) => {
            return { ...c, shenjtab: 'fa-solid fa-square-plus' };
          });
          return {
            ...d,
            shenj: 'fa-solid fa-square-plus',
            table: body1,
          };
        });
        this.databses = body;
        console.log(body);
      }
    );
  }
  gototable(x: number) {
    this.navigate1.navigate([`opentable/Browse/${x}`]);
  }
  public heightprocesor(table: any) {
    console.log(table);
    var returnstm: number = 80;
    const data = table.map((c: any) => {
      if (c.shenjtab == this.minus) {
        returnstm += 0;
      }
    });
    return returnstm.toString() + 'px';
  }
  clickshenj(id: number) {
    const data = this.databses.map((dq: any) => {
      if (dq.id === id) {
        if (dq.shenj === this.minus) {
          return { ...dq, shenj: this.plus };
        } else {
          return { ...dq, shenj: this.minus };
        }
      } else {
        return dq; // Return the original item for non-matching IDs
      }
    });

    this.databses = data;
  }
}
