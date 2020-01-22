import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flacar';

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'has-navbar-fixed-bottom');
   }
}
