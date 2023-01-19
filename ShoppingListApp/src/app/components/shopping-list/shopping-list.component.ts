import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ShoppingListService } from 'src/app/service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Input() shoppingList: ShoppingItem[];
  @Output() addShoppingItem = new EventEmitter<ShoppingItem[]>();
  @Output() deleteShoppingItem = new EventEmitter<ShoppingItem[]>();

  shoppingItem = '';
  error = '';

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addItem(item: any) {
    if (this.shoppingList.filter(x => x.itemName.toLowerCase() == item.toLowerCase()).length > 0) {
      this.error = item + ' already exists.';
    }
    else {
      let shoppingItem: ShoppingItem = { itemName: item };
      this.shoppingListService
        .addShoppingItem(shoppingItem)
        .subscribe((shoppingList: ShoppingItem[]) => { 
          this.addShoppingItem.emit(shoppingList);
          this.shoppingItem = '';
          this.error = '';
        });
    }
  }

  deleteItem(item: ShoppingItem) {
    this.shoppingListService
      .deleteShoppingItem(item)
      .subscribe((shoppingList: ShoppingItem[]) => this.deleteShoppingItem.emit(shoppingList));
  }
}
