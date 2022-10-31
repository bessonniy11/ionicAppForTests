import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {environment} from "../../../environments/environment";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) =>{
      this.movie = res;
    })
  }

  openHomepage() {
    window.open(this.movie.homepage)
  }
}
