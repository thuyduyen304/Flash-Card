import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SlideComponent } from './components/slide/slide.component';
import { CardsetDetailComponent } from './components/cardset-detail/cardset-detail.component';
import { PracticeComponent } from './components/practice/practice.component';
import { FormComponent } from './components/form/form.component';
import { CardsetService } from './cardset.service';

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardsetResolver implements Resolve<any> {
  constructor(private service: CardsetService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.getSetDetails(route.paramMap.get('sid'));
  }
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'set/:sid/learn',
    component: SlideComponent,
    resolve: {
          setDetails: CardsetResolver
    }
  },
  {
    path: 'set/:sid',
    component: CardsetDetailComponent,
	
  },

  {
    path: 'set/:sid/practice',
    component: PracticeComponent,
    resolve: {
      setDetails: CardsetResolver
    }
  },
  {
    path: 'set/:sid/edit',
    component: FormComponent,
    resolve: {
      setDetails: CardsetResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
