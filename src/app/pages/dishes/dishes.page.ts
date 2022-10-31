import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {AnimationController, LoadingController} from "@ionic/angular";
import {MovieService} from "../../services/movie.service";
import {environment} from "../../../environments/environment";


interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
})
export class DishesPage implements OnInit {
  @ViewChild('headerwrapper', {read: ElementRef}) headerWrapper: ElementRef;
  @ViewChild('condenseheader', {read: ElementRef}) condenseheader: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;

  currentPage = 1;
  searching = false;
  inputFired = false;

  search: string | null = null;

  dishes = [];
  imageBaseUrl = environment.images;

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navigation: NavigationService,
    private loadingCtrl: LoadingController,
    private movieService: MovieService,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadDishes();
  }

  async loadDishes(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      // message: 'Loading..',
      // spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res => {
      loading.dismiss();
      this.dishes.push(...res.results);
      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage
      }

    }));
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadDishes(event);
  }

  goToThisItem(id: any) {
    this.navigation.goToUrl(`movies/${id}`);
  }

  toggleSearch() {
    // if (this.inputFired) {
    //   return;
    // }
    // this.inputFired = true;
    // const titleToolBar = this.condenseheader.nativeElement.children[2];
    //
    // // Fade out the status bar area
    // const toolbarFade = this.animationCtrl.create('fade')
    //   .addElement(this.headerWrapper.nativeElement)
    //   .fromTo('opacity', 1, 0)
    //   .fromTo('height', '90px', '36px')
    //   .afterStyles({'z-index': -1})
    //
    // // Fade out the condensed header
    // const headerFade = this.animationCtrl.create('header')
    //   .addElement(titleToolBar)
    //   .fromTo('opacity', 1, 0)
    //   .fromTo('height', '48px', '0px')
    //   .afterStyles({'z-index': -1})
    //
    // // Chain all animations
    // const wrapper = this.animationCtrl.create('wrapper')
    //   .addAnimation([toolbarFade, headerFade])
    //   .easing('ease-in')
    //   .duration(200)
    //
    // // Fade in/put the background overlay
    // const overLayFade = this.animationCtrl.create('wrapper')
    //   .addElement(this.overlay.nativeElement)
    //   .fromTo('opacity', 1, 0)
    //   .duration(200)
    //
    //   if (this.searching) {
    //     wrapper.direction('reverse').play();
    //     overLayFade.direction('reverse')
    //       .afterStyles({'z-index': 0})
    //       .play();
    //   } else {
    //     wrapper.play();
    //     overLayFade
    //       .beforeStyles({'z-index': 2})
    //       .play();
    //   }
    //
    //
    // this.inputFired = false;
    this.searching = !this.searching;
  }

  keypress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.submitSearch(event);
    }
    console.log('search', this.search);
    // if (this.search?.length <= 0) {
    //   console.log('this.search?.length');
    //   this.loadDishes();
    //   this.searching = false;
    //   this.currentPage = 1;
    // }
  }

  submitSearch(event) {
    this.searching = false;
    this.currentPage = 1;
    const query = event.target.value.toLowerCase();
    const results = [...this.dishes];
    this.dishes = results.filter(item => item.title.toLowerCase().indexOf(query) > -1);
    this.toggleSearch();

  }

  outSearch() {
    this.currentPage = 1;
    this.dishes = [];
    this.search = '';
    this.toggleSearch();
    this.loadDishes();
  }
}
