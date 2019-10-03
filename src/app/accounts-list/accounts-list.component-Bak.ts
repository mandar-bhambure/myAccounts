import { Component, OnInit } from '@angular/core';
import { AccountsDataService } from "../services/accounts-data.service";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  accountsList:[];
  isAscending = true;
  column = "accountNo";
  order = this.isAscending?"asc":"desc";
  displayLimit = 3;
  isAccounNoColumn : boolean;

  constructor(private acctsDataService:AccountsDataService) { 
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.acctsDataService.getAccounts().subscribe(accountData=>{
      //this.accountsList = this.sortAccounts(accountData,"accountNo",this.order);
      this.accountsList = this.acctsDataService.sortAccounts(accountData,"accountNo",this.order);
      //console.log(this.accountsList);
      //this.greyBgFlag = !this.greyBgFlag;
    });
  }

  sortAccountsClick(event){
    this.isAscending = !this.isAscending;
    this.order = this.isAscending?"asc":"desc"; 
    this.column = event.target.dataset.columnName;
    event.target.innerHTML = (this.order=="asc") ? "^":"v";
    this.accountsList = this.acctsDataService.sortAccounts(this.accountsList,this.column,this.order);

    if(this.column=='accountNo'){
      event.target.parentElement.classList.add('greyBg');
      event.target.parentElement.nextSibling.classList.remove('greyBg');
    }
    else if(this.column=='availableCash'){
      event.target.parentElement.classList.add('greyBg');
      event.target.parentElement.previousSibling.classList.remove('greyBg');
    }
    
  }

  loadMore(event){
    this.displayLimit += this.displayLimit;

    if(this.displayLimit>=this.accountsList.length)
      event.target.parentElement.innerHTML="End";
  }
}
