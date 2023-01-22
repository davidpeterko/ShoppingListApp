import { TestBed } from "@angular/core/testing";
import { ShoppingListService } from "./shopping-list.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ShoppingItem } from "../models/shopping-item";
import { environment } from "src/environments/environment";

describe('ShoppingListService', () => {
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
  });

  it('ShoppingListApi ServiceIsCreated', () => {
    expect(shoppingListService).toBeDefined();
  }); 

  it('ShoppingListApi HttpClientIsCreated', () => {
    expect(httpClient).toBeDefined();
  });

  it('ShoppingListApi GetShoppingList', () => {
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

  it('ShoppingListApi GetShoppingList Failure', () => {
    const errorMessage = 'status 500 error';

    shoppingListService
      .getShoppingList()
      .subscribe( () => fail('should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/getShoppingList');
    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('ShoppingListApi AddItem', () => {
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

  it('ShoppingListApi AddItem Failure', () => {
    const errorMessage = 'status 500 error';
    let inputData: ShoppingItem = { id: 1, itemName: null};

    shoppingListService
      .addShoppingItem(inputData)
      .subscribe( () => fail('should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/addItem');
    expect(req.request.method).toEqual('POST');

    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('ShoppingListApi RemoveItem', () => {
    let inputData: ShoppingItem = { id: 2, itemName: 'Toilet Paper'};

    let testData: ShoppingItem[] = [
      { id: 1, itemName: 'Chicken Nuggets' }
    ];
    
    shoppingListService
      .removeShoppingItem(inputData)
      .subscribe( (result) => expect(result).toEqual(testData));

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/removeItem');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('ShoppingListApi RemoveItem Failure', () => {
    const errorMessage = 'status 500 error';
    let inputData: ShoppingItem = { id: 1, itemName: null};

    shoppingListService
      .removeShoppingItem(inputData)
      .subscribe( () => fail('should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });

    const req = httpController.expectOne(environment.apiUrl + '/api/shoppinglist/removeItem');
    expect(req.request.method).toEqual('POST');

    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
