import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsDataService {

  private apiUrl='http://localhost:3000/accounts';
  jsonData;
  start =0;
  limit =3;
  
  constructor(private http:HttpClient) { }

  /*getAccounts(){
    //console.log(ACCT_DATA);
    //http.get() call to a RESTful API will go here.

    return ACCT_DATA;
  }*/

  getAccounts():Observable<Account[]>{
    /*this.http.get<Account[]>(this.apiUrl).subscribe(res=>{
      console.log(res);
      this.jsonData=res;
    });
   return this.jsonData;*/
   
    let tempApiUrl = this.apiUrl+"?_start="+this.start+"&_limit="+this.limit;
    this.start=this.start+this.limit;
    return this.http.get<Account[]>(tempApiUrl);

  }
}
