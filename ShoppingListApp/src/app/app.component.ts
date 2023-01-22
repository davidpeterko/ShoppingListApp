import { Component } from '@angular/core';
import { ShoppingItem } from './models/shopping-item';
import { ShoppingListService } from './service/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  shoppingList: ShoppingItem[];
  title = 'Shopping List';

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService
      .getShoppingList()
      .subscribe(result => {
        this.shoppingList = result;
      });
  }

  updateShoppingList(shoppingList: ShoppingItem[]) {
    this.shoppingList = shoppingList;
  }
}