import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingItem } from '../models/shopping-item';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getShoppingList() : Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.apiUrl + '/api/shoppinglist/getShoppingList');
  }

  public addShoppingItem(shoppingItem: ShoppingItem) :Observable<ShoppingItem[]> {
    return this.http.post<ShoppingItem[]>(this.apiUrl + '/api/shoppinglist/addItem', shoppingItem);
  }

  public deleteShoppingItem(shoppingItem: ShoppingItem) : Observable<ShoppingItem[]> {
    return this.http.post<ShoppingItem[]>(this.apiUrl + '/api/shoppinglist/removeItem', shoppingItem);
  }
}
