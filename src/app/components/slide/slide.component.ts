import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})

export class SlideComponent implements OnInit {
  public sid;
  set;
  cards;
  dropdown_active = false;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.set = this.route.snapshot.data['setDetails'];
    this.cards = this.set.cards;
    this.cards.forEach((x, i) => x.visible = (i === 0));
  }

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    // out of range
    if (currentIndex > this.cards.length || currentIndex < 0) {
      return;
    }
    let nextIndex = 0;

    // swipe right, next card
    if (action === this.SWIPE_ACTION.RIGHT) {
        const isLast = currentIndex === this.cards.length - 1;
        nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // swipe left, previous card
    if (action === this.SWIPE_ACTION.LEFT) {
        const isFirst = currentIndex === 0;
        nextIndex = isFirst ? this.cards.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.cards.forEach((x, i) => x.visible = (i === nextIndex));
  }

}
