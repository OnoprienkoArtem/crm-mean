import { Component, OnInit } from '@angular/core';

interface SideMenu {
  url: string;
  name: string;
}

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: [ './site-layout.component.scss' ]
})
export class SiteLayoutComponent implements OnInit {

  public links: Array<SideMenu> = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Categories'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
