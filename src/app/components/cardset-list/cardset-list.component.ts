import { Component, OnInit, Input } from '@angular/core';
import { CardsetService } from '../../cardset.service';
import { MatDialog } from '@angular/material/dialog';
import { CardsetDetailComponent } from '../cardset-detail/cardset-detail.component';

@Component({
  selector: 'app-cardset-list',
  templateUrl: './cardset-list.component.html',
  styleUrls: ['./cardset-list.component.css']
})
export class CardsetListComponent implements OnInit {
  flashCardLists;
  maxItems;
  @Input() flashCardCat;
  @Input() type;
  constructor(private cardSetService: CardsetService, private dialog: MatDialog) { }

  ngOnInit() {
    switch (this.type) {
      case 'cat':
        this.cardSetService.getSetsByCat(this.flashCardCat)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists;
		  this.getMaxItems();
        });
        break;
      case 'recent':
        this.cardSetService.getSetsRecent(1)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists.map(x => x.set);
		  this.getMaxItems();
        });
        break;
      case 'fav':
        this.cardSetService.getSetsFavorite(1)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists.map(x => x.set);
		  this.getMaxItems();
        });
        break;
    }
	
  }

  getMaxItems(): void {
	if (this.flashCardLists && this.flashCardLists.length % 3 > 0) {
		this.maxItems = new Array(3 - this.flashCardLists.length % 3);
	} else {
		this.maxItems = [];
	}
	console.log(this.maxItems.length)
  }

  openDialog(sid): void {
    const dialogRef = this.dialog.open(CardsetDetailComponent, {
      closeOnNavigation: true,
      data: {sid: sid}
    });
  }

  ngOnDestroy() {
    if (this.dialog) {
        this.dialog.closeAll();
    }
  }

}

