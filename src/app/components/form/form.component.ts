import { Component, OnInit } from '@angular/core';
import { CardsetService } from '../../cardset.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public sid;
  flashCardForm: FormGroup = new FormGroup({});
  cardsForm: Array<FormGroup> = [];
  dropdown_active = false;

  categories = [];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cardSetService: CardsetService) {}

  ngOnInit() {
    var setDetails = this.route.snapshot.data['setDetails'];

    for (let card of setDetails.cards) {
      this.cardsForm.push(this.fb.group({
        word: card.word,
        des: card.des,
        pic: card.pic,
        id: card.id,
        setId: card.sestId,
        uid: card.uid,
        new: false,
      }))
    }

    this.flashCardForm = this.fb.group({
      name: setDetails.name,
      cat: setDetails.cat,
      des: setDetails.des,
      pic: setDetails.pic,
      uid: setDetails.uid,
      id: setDetails.id,
      rating: setDetails.rating,
      cards: this.fb.array(this.cardsForm),
    });

    this.categories = this.getCategories();
  }

  getCategories() {
    return [
      { id: 'life', name: 'Social' },
      { id: 'subject', name: 'School' },
      { id: 'disney', name: 'Fairy tale' }
    ];
  }

  getCardsFormArray(): FormArray {
    return this.flashCardForm.get('cards') as FormArray;
  }

  addNewCard(): void {
    this.getCardsFormArray().push(this.createNewCard());
  }

  createNewCard(): FormGroup {
    return this.fb.group({
      word: '',
      des: '',
      pic: '',
      new: true,
      setId: 1,
      uid: 1
    });
  }

  onSelectFile(event, idx=-1, type='card') { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        var picFile = <FileReader>event.target;
        if (type === 'card') {
          this.getCardsFormArray()['controls'][idx].get('pic').setValue(picFile.result);
        } else {
			this.flashCardForm.get('pic').setValue(picFile.result);
		}
      }
    }
  }

  onSubmit(form: FormGroup) {
    if(form.valid) {
      this.cardSetService.updateSet(form.value.id, {
        name: form.value.name,
        des: form.value.des,
        pic: form.value.pic,
        cat: form.value.cat,
        rating: form.value.rating,
        uid: form.value.uid
      }).subscribe((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
      for (let card of form.value.cards) {
        if (card.new) {
          if (card.word != '' && card.des != '') {
            this.cardSetService.createCard({
              word: card.word,
              des: card.des,
              uid: form.value.uid,
              pic: card.pic,
              setId: form.value.id
            }).subscribe((result) => {
            }, (err) => {
              console.log(err);
            });
          }
        } else {
          this.cardSetService.updateCard(card.id, {
            word: card.word,
            des: card.des,
            pic: card.pic,
            setId: form.value.id,
            uid: form.value.uid
          }).subscribe((result) => {
          }, (err) => {
            console.log(err);
          });
        }
      }
    }
  }

}
