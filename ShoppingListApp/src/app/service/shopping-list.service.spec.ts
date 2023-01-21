import { TestBed } from "@angular/core/testing";
import { ShoppingListService } from "./shopping-list.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from "@angular/common/http";
import { ShoppingItem } from "../models/shopping-item";
import { environment } from "src/environments/environment";

describe('Shopping List Service', () => {
  let shoppingListService: ShoppingListService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingListService]
    });

    shoppingListService = TestBed.inject(ShoppingListService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('Service created', () => {
    expect(shoppingListService).toBeDefined();
  }); 

  it('Shopping List Api GetShoppingList', () => {
    let testData: ShoppingItem[] = [
      { id: 1, itemName: 'Cheetos' },
      { id: 2, itemName: 'Toilet Paper' }
    ];
    
    shoppingListService
      .getShoppingList()
      .subscribe( (result) => expect(result).toEqual(testData));

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/getShoppingList');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('Shopping List Api AddItem', () => {
    let inputData: ShoppingItem = { id: 1, itemName: 'Chicken Nuggets'};

    let testData: ShoppingItem[] = [
      { id: 1, itemName: 'Chicken Nuggets' }
    ];
    
    shoppingListService
      .addShoppingItem(inputData)
      .subscribe( (result) => expect(result).toEqual(testData));

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/addItem');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

});
