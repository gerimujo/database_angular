import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-databasesql',
  templateUrl: './databasesql.component.html',
  styleUrls: ['./databasesql.component.css'],
})
export class DatabasesqlComponent {
  path: String | null = null;
  constructor(
    private path1: ActivatedRoute,
    private navigatetopath: Router,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private HttpClient: HttpClient
  ) {}
  public addDatbase: String = '';
  public addDatabse() {
    const body = {
      name: this.addDatbase,
      token: this.cookieService.get('role'),
    };
    console.log('text is' + this.addDatbase);
    console.log(body);
    this.HttpClient.post('http://localhost:8080/addDatabse', body, {
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
        this.navigatetopath.navigate([`open/add/${response}`]);
      });
  }

  clicktenavbari(data: any) {
    this.cdr.markForCheck();
    if (data.emri == 'Databases') {
      this.navigatetopath.navigate(['/home/Databases']);
    }

    if (data.emri == 'SQL') {
      this.navigatetopath.navigate(['/home/SQL']);
    }
  }
  public databases: { name: String }[] = [];
  ngOnInit() {
    this.path1.paramMap.subscribe((params) => {
      this.path = params.get('data');
      this.get();
      this.cdr.detectChanges();
    });
  }
  get() {
    const token = this.cookieService.get('role');
    const headers = new HttpHeaders().set('Authorization', token);

    this.HttpClient.get(`http://localhost:8080/getdatabeses11/`, {
      headers,
    }).subscribe((response: any) => {
      this.databases = response;
    });
  }

  public arraynavbar: any[] = [
    {
      logo: 'fa-solid fa-database',
      emri: 'Databases',
    },
    {
      logo: 'fa-solid fa-scroll',
      emri: 'SQL',
    },
    { logo: 'fa-solid fa-square-poll-vertical', emri: 'Status' },
    { logo: 'fa-solid fa-address-card', emri: 'Accounts' },
    { logo: 'fa-solid fa-file-export', emri: 'Export' },
    { logo: 'fa-solid fa-file-import', emri: 'Import' },
    { logo: 'fa-solid fa-wrench', emri: 'Settings' },
    { logo: 'fa-solid fa-caret-down', emri: 'More' },
  ];
}
