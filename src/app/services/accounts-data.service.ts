import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsDataService {

  private apiUrl = environment.apiUrlAccounts;
  
  constructor(private http:HttpClient) { }

  getAccounts(){
  
    return this.http.get(this.apiUrl);
  }

  sortAccounts(objAccounts,column="accountNo",order="asc"){
    return objAccounts.sort((a,b)=>{
      switch (column) {
        case "accountNo":
          switch (order) {
            case "asc":
              if(a[column].split("-")[1] > b[column].split("-")[1])
                return 1;
              else if(a[column].split("-")[1] == b[column].split("-")[1])
                return 0;
              else if(a[column].split("-")[1] < b[column].split("-")[1])
              return -1;
            break;
            case "desc":
              if(a[column].split("-")[1] > b[column].split("-")[1])
                return -1;
              else if(a[column].split("-")[1] == b[column].split("-")[1])
                return 0;
              else if(a[column].split("-")[1] < b[column].split("-")[1])
              return 1;
            break;
          }
        break;
        case "availableCash":
            switch (order) {
              case "asc":
                if(a.availableCash > b.availableCash)
                  return 1;
                  else if(a.availableCash == b.availableCash)
                  return 0;
                  else if(a.availableCash < b.availableCash)
                  return -1;
              break;
              case "desc":
                if(a.availableCash > b.availableCash)
                  return -1;
                else if(a.availableCash == b.availableCash)
                  return 0;
                else if(a.availableCash < b.availableCash)
                  return 1;
              break;
            }
        break;
      }
    });
  }
  
}
