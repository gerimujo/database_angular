import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-opendatabse',
  templateUrl: './opendatabse.component.html',
  styleUrls: ['./opendatabse.component.css'],
})
export class OpendatabseComponent {
  path: String | null = null;
  path2: number | null = null;
  constructor(
    private path1: ActivatedRoute,
    private navigatetopath: Router,
    private cdr: ChangeDetectorRef,
    private httpClient: HttpClient,
    private Cookie: CookieService
  ) {}

  clicktenavbari(data: any) {
    this.cdr.markForCheck();
    if (data.emri == 'STRUCTURE') {
      this.navigatetopath.navigate([`/open/STRUCTURE/${this.path2}`]);
    }

    if (data.emri == 'SQL') {
      this.navigatetopath.navigate([`/open/SQL/${this.path2}`]);
    }
  }

  public tablename1 = '';
  public print() {
    const body = this.arraydataadd.filter(
      (d) =>
        d.name !== '' && d.type !== '' && d.length !== 0 && d.default1 !== ''
    );

    const body1 = {
      tablename: this.tablename1,

      databaseid: this.path2,
      token: this.Cookie.get('role'),
      columns: body,
    };
    console.log(body1);
    this.httpClient
      .post('http://localhost:8080/inserttablecolumns1', body1, {
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
      .subscribe((response) => {
        this.navigatetopath.navigate([`opentable/Browse/${response}`]);
        console.log(response);
      });
  }
  public databases: { name: string }[] = [];

  ngOnInit() {
    this.path1.paramMap.subscribe((params) => {
      this.path = params.get('data');
      this.path2 = parseInt(params.get('path') || '0', 10);

      console.log('path eshte ' + this.path2);
      this.get();
      this.cdr.detectChanges();
    });
  }
  public tabledata1: {
    tableid: number;
    databaseid: number;
    tablename: String;
  }[] = [];
  public tabledata: any[] = [];

  public arraynavbar: any[] = [
    {
      logo: 'fa-solid fa-pen',
      emri: 'STRUCTURE',
    },
    {
      logo: 'fa-solid fa-scroll',
      emri: 'SQL',
    },
    { logo: 'fa-solid fa-magnifying-glass', emri: 'SEARCH' },
    { logo: 'fa-solid fa-database', emri: 'QUERY' },
    { logo: 'fa-solid fa-file-export', emri: 'Export' },
    { logo: 'fa-solid fa-file-import', emri: 'Import' },
    { logo: 'fa-solid fa-wrench', emri: 'Settings' },
    { logo: 'fa-solid fa-user', emri: 'PRIVILAGES' },
  ];
  navigatetotable(x: number) {
    this.navigatetopath.navigate([`/opentable/Browse/${x}`]);
  }
  get() {
    const token = this.Cookie.get('role');
    const headers = new HttpHeaders().set('Authorization', token);

    this.httpClient
      .get(`http://localhost:8080/GetTableForDatabase/${this.path2}`, {
        headers,
      })
      .subscribe((response: any) => {
        const bodsasi = response[1];
        this.tabledata1 = response[0];
        this.tabledata = this.tabledata1.map((d, i) => {
          return { ...d, row: bodsasi[i] };
        });
      });
  }
  arrayqeliz = {
    name: '',
    type: '',
    length: 11,
    default1: '',
    defaultValue: '',
    tableid: 0,
    tablename: this.tablename1,
  };
  public arraydataadd = [
    {
      name: '',
      type: '',
      length: 11,
      default1: '',
      defaultValue: '',
      tableid: 0,
      tablename: this.tablename1,
    },
    {
      name: '',
      type: '',
      length: 11,
      default1: '',
      defaultValue: '',
      tableid: 0,
      tablename: this.tablename1,
    },
    {
      name: '',
      type: '',
      length: 11,
      default1: '',
      defaultValue: '',
      tableid: 0,
      tablename: this.tablename1,
    },
    {
      name: '',
      type: '',
      length: 11,
      default1: '',
      defaultValue: '',
      tableid: 0,
      tablename: this.tablename1,
    },
  ];
  public numnertoaddcolumn: number = 0;
  concat() {
    for (let i = 0; i < this.numnertoaddcolumn; i++) {
      const newQeliz = {
        name: '',
        type: '',
        length: 11,
        default1: '',
        defaultValue: '',
        tableid: 0,
        tablename: this.tablename1,
      };
      this.arraydataadd.push(newQeliz);
    }

    console.log(this.arraydataadd);
  }
}
