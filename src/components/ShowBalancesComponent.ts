import { Component, OnDestroy, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import {Account} from '../account';
import {Bank} from '../bank';

@Component({
  directives: [ CORE_DIRECTIVES ],
  providers: [ Bank ],
  selector: 'show-balances',
  styles: [`
    .zero-balance {
      color: red;
      font-weight: bold;
    }
  `],
  template: `
  <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric">Id</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="#account of accounts">
        <td class="mdl-data-table__cell--non-numeric">{{ account.id }}</td>
        <td [class.zero-balance]="isZeroBalance(account)">{{ account.balance }}</td>
      </tr>
    </tbody>
  </table>
  `
})
export class ShowBalancesComponent implements OnInit, OnDestroy {
  public accounts: Account[];

  private _accountUpdatesSubscription: any;
  private _bank: Bank;

  constructor(bank: Bank) {
    this._bank = bank;
  }

  public ngOnInit() {
    this._accountUpdatesSubscription = Bank.accountUpdates
      .subscribe(() => this.refreshAccounts());
  }

  public ngOnDestroy() {
    this._accountUpdatesSubscription.unsubscribe();
  }

  public isZeroBalance(account: Account) : boolean {
    return account.balance === 0;
  }

  public refreshAccounts() : void {
    this.accounts = this._bank.getAllAccounts();
  }
}
