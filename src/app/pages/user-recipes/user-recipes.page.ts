import { Component, OnInit } from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {LoadingController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {environment} from "../../../environments/environment";

interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.page.html',
  styleUrls: ['./user-recipes.page.scss'],
})
export class UserRecipesPage implements OnInit {

  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navigation: NavigationService
  ) { }


  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log('res', res);


      event?.target.complete();

      if (event) {
        event.target.disabled = res.total_pages === this.currentPage
      }

    }));
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  goToThisItem(id: any) {
    this.navigation.goToUrl(`movies/${id}`);
  }

}
