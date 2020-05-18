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
	if (this.cards.length > 0) {
		let i = 0;
		let chosen = []
	    while (this.ans.length < 3 && i < this.cards.length) {
	      let rand_ans = Math.floor(Math.random() * this.cards.length);
	      if (!chosen.some(e => e == rand_ans)) {
			chosen.push(rand_ans);
	        this.ans.push({word: this.cards[rand_ans].word, state: 0});
	        i++;
	      }
	    }
		console.log(chosen);
		console.log(target);
	    var rand_target = Math.floor(Math.random() * 4);
		if (rand_target != 3) {
			this.ans[3] = Object.assign({}, this.ans[rand_target]);
		} 
	    this.ans[rand_target] = {word: this.cards[target].word, state: 0}
	}
    
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
