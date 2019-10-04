import { Component, OnInit } from '@angular/core';
import { AccountsDataService } from "../services/accounts-data.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  accountsList:[];
  isAscending = environment.defaultAccountsSortOrderAsc;
  column = environment.defaultAccountsSortColumn;
  order = this.isAscending?"asc":"desc";
  displayLimit = environment.rowLimitLoadMore;
  isAccounNoColumn : boolean;

  constructor(private acctsDataService:AccountsDataService) { 
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.acctsDataService.getAccounts().subscribe(accountData=>{
      this.accountsList = this.acctsDataService.sortAccounts(accountData, this.column, this.order);
      this.isAccounNoColumn = true;
    });
  }

  sortAccountsClick(event){
    this.isAscending = !this.isAscending;
    this.order = this.isAscending?"asc":"desc"; 
    this.column = event.target.dataset.columnName;
    event.target.innerHTML = (this.order=="asc") ? "^":"v";
    this.accountsList = this.acctsDataService.sortAccounts(this.accountsList,this.column,this.order);
    
    //  Logic to set <th> background when a user clicks on sort.
    this.column == 'accountNo' ? this.isAccounNoColumn = true : this.column == 'availableCash' ? this.isAccounNoColumn = false : "";
    
  }

  loadMore(event){
    this.displayLimit += this.displayLimit;

    if(this.displayLimit>=this.accountsList.length)
      event.target.parentElement.innerHTML="End";
  }
}
