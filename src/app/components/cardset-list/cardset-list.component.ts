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
  @Input() flashCardCat;
  @Input() type;
  constructor(private cardSetService: CardsetService, private dialog: MatDialog) { }

  ngOnInit() {
    switch (this.type) {
      case 'cat':
        this.cardSetService.getSetsByCat(this.flashCardCat)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists;
        });
        break;
      case 'recent':
        this.cardSetService.getSetsRecent(1)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists.map(x => x.set);
        });
        break;
      case 'fav':
        this.cardSetService.getSetsFavorite(1)
        .subscribe(flashCardLists => {
          this.flashCardLists = flashCardLists.map(x => x.set);
        });
        break;
    }

  }

  openDialog(sid): void {
    const dialogRef = this.dialog.open(CardsetDetailComponent, {
      // width: '250px',
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

