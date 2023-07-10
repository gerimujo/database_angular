import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css'],
})
export class HomecomponentComponent {
  constructor(private path1: ActivatedRoute, private navigatepath: Router) {}

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
  navigatetopath(data: any) {
    if (data.emri == 'SQL') {
      console.log(data);

      this.navigatepath.navigate(['home/SQL']);
    }
    if (data.emri == 'Databases') {
      this.navigatepath.navigate(['home/Databases']);
    }
  }
}
