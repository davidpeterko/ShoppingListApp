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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addItem(item: any) {
    let shoppingItem: ShoppingItem = { itemName: item };
    this.shoppingListService
      .addShoppingItem(shoppingItem)
      .subscribe((shoppingList: ShoppingItem[]) => { 
        this.addShoppingItem.emit(shoppingList);
        this.shoppingItem = ''; 
      });
  }

  deleteItem(item: ShoppingItem) {
    this.shoppingListService
      .deleteShoppingItem(item)
      .subscribe((shoppingList: ShoppingItem[]) => this.deleteShoppingItem.emit(shoppingList));
  }
}