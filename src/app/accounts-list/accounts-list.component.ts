import { Component, OnInit } from '@angular/core';
import { AccountsDataService } from "../services/accounts-data.service";
import { environment } from "../../environments/environment";
import { Account } from '../Account';
import { AccountHeader, SortingDirection } from './accounts-list-header';

@Component({
	selector: 'app-accounts-list',
	templateUrl: './accounts-list.component.html',
	styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
	accountsList: Account[] = [];
	isAscending = environment.defaultAccountsSortOrderAsc;
	displayLimit = environment.rowLimitLoadMore;

	public headers: AccountHeader[] = [
		{
			title: 'Account',
		},
		{
			title: 'Available cash',
			smallTitle: 'Today\'s Change',
			sortDirection: SortingDirection.ASC
		}
	];

	public activeHeader:AccountHeader = this.headers[1];	
	public SortingDirection = SortingDirection;
	

	constructor(private acctsDataService: AccountsDataService) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.acctsDataService.getAccounts().subscribe(accountData => {
			this.accountsList = this.acctsDataService.sortAccounts(accountData, this.activeHeader);
		});
	}

	private sortAccountsClick(header: AccountHeader): void {

		if( this.activeHeader === header ) {
			header.sortDirection = header.sortDirection === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC;
		} else {
			header.sortDirection = SortingDirection.ASC;
		}

		this.activeHeader = header;

		this.accountsList = this.acctsDataService.sortAccounts(this.accountsList, this.activeHeader);
	}

	private loadMore(): void {
		this.displayLimit+= this.accountsList.length-this.displayLimit;
	}
}
