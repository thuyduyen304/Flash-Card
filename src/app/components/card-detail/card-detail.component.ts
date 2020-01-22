import { Component, OnInit, Input } from '@angular/core';
import { CardsetService } from '../../cardset.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})

export class CardDetailComponent implements OnInit {
  card;
  @Input() cid;

  constructor(private cardsetService: CardsetService) { }

  ngOnInit() {
    this.cardsetService.getCardById(this.cid)
    .subscribe(card => {
      this.card = card;
    });
  }

}
