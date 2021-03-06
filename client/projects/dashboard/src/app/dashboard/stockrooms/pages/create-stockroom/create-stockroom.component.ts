import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Stockroom } from '@inv/core';
import { IAppState } from '../../../../core/store/state/app.state';
import { createStockroom } from '../../../../core/store/actions/stockroom.actions'; 
import { selectSelectedStockroom } from '../../../../core/store/selectors/stockroom.selector';

@Component({
  selector: 'inv-create-stockroom',
  templateUrl: './create-stockroom.component.html',
  styleUrls: ['./create-stockroom.component.scss']
})
export class CreateStockroomComponent implements OnInit {
  public selectedStockroom$: Observable<Stockroom>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
  }

  public onCreateStockroom(stockroom: Stockroom): void {
    this._store.dispatch(createStockroom(stockroom));
  }
}
