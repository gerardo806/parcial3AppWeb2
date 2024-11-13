import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FooterSigninComponent} from '../../modules/signin/pages/footer-signin/footer-signin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterSigninComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor() {}

  activate(e: Event){
    const target = e.target as HTMLElement;
    const linkList: NodeListOf<Element> = document.querySelectorAll('.navbar-nav a');

    if(linkList){
      linkList.forEach((link) => {
        if(link === target) {
          link.classList.add('active');
        }else{
          link.classList.remove('active');
        }
      });
    }
  }
}
