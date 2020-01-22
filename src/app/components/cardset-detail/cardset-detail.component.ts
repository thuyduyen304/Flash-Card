import { Component, OnInit, Input } from '@angular/core';
import { CardsetService } from '../../cardset.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-cardset-detail',
  templateUrl: './cardset-detail.component.html',
  styleUrls: ['./cardset-detail.component.css']
})

export class CardsetDetailComponent implements OnInit {
  setDetails;
  loaded = false;

  constructor(private cardSetService: CardsetService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.cardSetService.getSetDetails(this.data.sid).subscribe((data: {}) => {
      this.setDetails = data;
      this.loaded = true;
    });
  }

}
