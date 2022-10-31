import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('authAndRegModal') authAndRegModal;
  modalRegisterStatus = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPage(link: string) {
    this.router.navigateByUrl(link);
  }

  goToMovies() {
    this.router.navigateByUrl('/movies');
  }

  auth() {

  }

  reg() {
    !this.modalRegisterStatus ? this.modalRegisterStatus = true : false;
  }

  closeModal() {
    if (!this.modalRegisterStatus) {
      this.authAndRegModal.dismiss();
    } else {
      this.authAndRegModal.dismiss();
      this.modalRegisterStatus = false;
    }
  }
}
