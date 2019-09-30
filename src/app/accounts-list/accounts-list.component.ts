import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { AccountsDataService } from "../services/accounts-data.service";
import { Account } from "../Account";


@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  displayedColumns: string[] = ['accountNo', 'availableCash'];
  dataSource =  new MatTableDataSource<any>();  //ACCT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  renderedData: Account[];
  acctData=[];
  
  constructor(private acctsDataService:AccountsDataService) { 
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.acctsDataService.getAccounts().subscribe(accountData=>{
      this.dataSource = new MatTableDataSource(accountData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    console.log(this.dataSource.data);  
    });
  }

  sortingDataAccessor(item, property) {
    //This code sorts Account number based on it's numeric part 
    //item=Entire JSON obj & property= Column header on which sort invoked
    
    if(property=='accountNo'){
      let splitVal= item[property].split("-");
      return splitVal[1];
    }
    else{
      //For rest of the column sort will remain intact
      return item[property];
    }
  }
  loadMoreAccounts(){
    this.acctsDataService.getAccounts().subscribe(accountData=>{

      accountData.forEach(elem=>{
        this.dataSource.data.push(elem);
      });
      //this.dataSource.data.push(accountData[0],accountData[1]);//WORKS
      //this.dataSource.data.push(accountData);//DOESN'T WORK
            
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    });

  }
}
