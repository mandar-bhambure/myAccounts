import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { AccountHeader, SortingDirection } from '../accounts-list/accounts-list-header';

@Injectable({
	providedIn: 'root'
})
export class AccountsDataService {

	private apiUrl = environment.apiUrlAccounts;

	constructor(private http: HttpClient) { }

	public getAccounts() {

		let httpOptions = {
			headers: new HttpHeaders({ 
			  'Access-Control-Allow-Origin':'*',
			  'Content-Type': 'application/json'
			})
		  };

		return this.http.get(this.apiUrl,httpOptions);
	}

	public sortAccounts(objAccounts, header: AccountHeader) {
		return objAccounts.sort((a, b) => {
			switch (header.title) {
				case "Account":
					switch (header.sortDirection) {
						case SortingDirection.ASC:
							if (a.accountNo.split("-")[1] > b.accountNo.split("-")[1])
								return 1;
							else if (a.accountNo.split("-")[1] == b.accountNo.split("-")[1])
								return 0;
							else if (a.accountNo.split("-")[1] < b.accountNo.split("-")[1])
								return -1;
							break;
						case SortingDirection.DESC:
							if (a.accountNo.split("-")[1] > b.accountNo.split("-")[1])
								return -1;
							else if (a.accountNo.split("-")[1] == b.accountNo.split("-")[1])
								return 0;
							else if (a.accountNo.split("-")[1] < b.accountNo.split("-")[1])
								return 1;
							break;
					}
					break;
				case "Available cash":
					switch (header.sortDirection) {
						case SortingDirection.ASC:
							if (a.availableCash > b.availableCash)
								return 1;
							else if (a.availableCash == b.availableCash)
								return 0;
							else if (a.availableCash < b.availableCash)
								return -1;
							break;
						case SortingDirection.DESC:
							if (a.availableCash > b.availableCash)
								return -1;
							else if (a.availableCash == b.availableCash)
								return 0;
							else if (a.availableCash < b.availableCash)
								return 1;
							break;
					}
					break;
			}
		});
	}

}
