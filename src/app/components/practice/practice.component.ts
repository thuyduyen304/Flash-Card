import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  public sid;
  set;
  cards;
  target;
  ans;
  
  dropdown_active = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.set = this.route.snapshot.data['setDetails'];
    this.cards = this.set.cards;
    this.target = 0;
    this.getRandomAns(this.target);
  }

  getRandomAns(target) {
    this.ans = [];
    let i = 0;
    while (this.ans.length < 3 && i < this.cards.length) {
      let rand_ans = Math.floor(Math.random() * this.cards.length);
      if (!this.ans.some(e => e.word === this.cards[rand_ans].word)) {
        this.ans.push({word: this.cards[rand_ans].word, state: 0});
        i++;
      }
    }
    var rand_target = Math.floor(Math.random() * this.ans.length);
    this.ans[3] = Object.assign({}, this.ans[rand_target]);
    this.ans[rand_target] = {word: this.cards[target].word, state: 0}
  }

  tap(idx) {
    if (this.ans[idx].word === this.cards[this.target].word) {
      this.target++;
      if (this.target >= this.cards.length) {
        this.target = 0;
      }
      this.getRandomAns(this.target);
    } else {
      this.ans[idx].state = 1;
    }
  }

}
