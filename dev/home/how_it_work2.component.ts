import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';

@Component({
  selector: 'how_it_work2',
  templateUrl: 'dev/home/how_it_work2.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class HowItWorkComponent2 implements OnInit {
  title: string = 'Home Page';
  body:  string = 'This is the about home body';
  message: string='sas';
  
 Home(event) {
    event.preventDefault();
    this.router.navigate(['Home']);
  }
 
HowItWork3(event) {
    event.preventDefault();
    this.router.navigate(['HowItWork3']);
  } 

}
