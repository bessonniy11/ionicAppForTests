import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
})
export class TestPagePage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
  }

}
