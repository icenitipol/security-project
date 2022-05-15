import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('nav') nav: ElementRef<HTMLDivElement> | null = null;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  goto(path: string){
    this.router.navigate([path]);
    if(this.nav) this.toggleActive(this.nav.nativeElement, false)
  }

  toggleActive(elm: HTMLDivElement, force: boolean | undefined = undefined) {
    elm.classList.toggle('active', force)
  }

}
