import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-tableopened',
  templateUrl: './tableopened.component.html',
  styleUrls: ['./tableopened.component.css'],
})
export class TableopenedComponent {
  constructor(
    private path1: ActivatedRoute,
    private navigatetopath: Router,
    private cdr: ChangeDetectorRef,
    private HttpClient: HttpClient,
    private Cookie: CookieService
  ) {}

  public tableheader: { name: string; tablename: string }[] = [];
  path: String | null = null;
  path2: String | null = null;

  ngOnInit() {
    this.path1.paramMap.subscribe((params) => {
      this.path = params.get('data');
      this.path2 = params.get('path');
      this.get();
      this.error = '';
      this.cdr.detectChanges();
    });
  }

  get() {
    const body = [this.Cookie.get('role'), this.path2];

    this.HttpClient.post('http://localhost:8080/getcolumns', body)
      .pipe(
        catchError(
          catchError((error) => {
            console.log('Error occurred:', error);
            return throwError('Something went wrong');
          })
        )
      )
      .subscribe((response: any) => {
        console.log(response);
        this.tableheader = response[0];
        this.tablename = response[0][0].tablename;
        this.rows = response[1];
        this.SQL = `SELECT * FROM  '${this.tablename}' WHERE 1 `;
      });
  }

  clicktenavbari(data: any) {
    this.cdr.markForCheck();
    if (data.emri == 'Browse') {
      this.navigatetopath.navigate([`/opentable/Browse/${this.path2}`]);
    }

    if (data.emri == 'SQL') {
      this.navigatetopath.navigate([`/opentable/SQL/${this.path2}`]);
    }
  }
  public arraynavbar: any[] = [
    {
      logo: 'fa-solid fa-table-columns',
      emri: 'Browse',
    },
    { logo: 'fa-solid fa-pen', emri: 'Structure' },
    {
      logo: 'fa-solid fa-scroll',
      emri: 'SQL',
    },
    { logo: 'fa-solid fa-magnifying-glass', emri: 'SEARCH' },
    { logo: 'fa-solid fa-user', emri: 'Privileges' },
    { logo: 'fa-solid fa-file-export', emri: 'Export' },
    { logo: 'fa-solid fa-file-import', emri: 'Import' },
    { logo: 'fa-solid fa-wrench', emri: 'Settings' },
    { logo: 'fa-solid fa-user', emri: 'PRIVILAGES' },
  ];
  public buttons = [
    'SELECT *',
    'SELECT',
    'INSERT',
    'UPDATE',
    'DELETE',
    'Clear',
    'Format',
  ];

  public rows: any[] = [];
  public tablename = '';
  public SQL = `SELECT * FROM  '${this.tablename}' WHERE 1 `;

  select(data: String) {
    if (data == 'SELECT *') {
      this.SQL = `SELECT * FROM  '${this.tablename}' WHERE 1 `;
    }
    if (data == 'SELECT') {
      var str = 'SELECT ';
      for (var i = 0; i < this.tableheader.length; i++) {
        if (i != this.tableheader.length - 1) {
          str += ` '${this.tableheader[i].name}', `;
        } else {
          str += ` '${this.tableheader[i].name}' `;
        }
      }
      str += ` FROM '${this.tablename}'  WHERE 1`;

      this.SQL = str;
    }
    if (data == 'INSERT') {
      var str = `INSERT INTO '${this.tablename}'`;

      var body1 = '';
      for (var i = 0; i < this.tableheader.length; i++) {
        if (i != this.tableheader.length - 1) {
          body1 += ` '${this.tableheader[i].name}', `;
        } else {
          body1 += ` '${this.tableheader[i].name}' `;
        }
      }
      body1 = '(' + body1 + ')  VALUES';
      this.SQL = str + body1;
      var body2 = '';
      for (var i = 0; i < this.tableheader.length; i++) {
        if (i != this.tableheader.length - 1) {
          body2 += ` '[value-${i + 1}]', `;
        } else {
          body2 += ` '[value-${i + 1}]' `;
        }
      }
      body2 = ' (' + body2 + ')';
      this.SQL = str + body1 + body2;
      console.log('str+  ' + str);
      console.log('body1' + body1);

      console.log('body2' + body2);
    }
    if (data == 'UPDATE') {
      str = `UPDATE  '${this.tablename}' SET `;
      body1 = ``;
      for (var i = 0; i < this.tableheader.length; i++) {
        if (i != this.tableheader.length - 1) {
          body1 += ` '${this.tableheader[i].name}' = '[value-${i + 1}]', `;
        } else {
          body1 += ` '${this.tableheader[i].name}' = '[value-${i + 1}]' `;
        }
      }
      body1 += 'WHERE 1';
      this.SQL = str += body1;
    }

    if (data == 'Clear') {
      this.SQL = '';
    }
    if (data == 'DELETE') {
      str = `DELETE FROM '${this.tablename}' WHERE 0`;
      this.SQL = str;
    }
  }
  public error = '';
  public color = 'green';
  clickpath() {
    const token = this.Cookie.get('role');
    const headers = new HttpHeaders().set('Authorization', token);
    this.HttpClient.post('http://localhost:8080/inserttotabel', this.SQL, {
      headers,
      responseType: 'text',
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error;
          console.log(errorMessage);
          this.color = 'red';
          this.error = errorMessage;
          return throwError(errorMessage);
        })
      )
      .subscribe((response: any) => {
        this.color = 'green';
        this.error = response;
        console.log(response);
      });
  }
}
