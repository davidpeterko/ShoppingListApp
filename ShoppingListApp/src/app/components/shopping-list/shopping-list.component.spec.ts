import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingListService } from '../../service/shopping-list.service';
import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
  let shoppingListService: ShoppingListService;
  let shoppingListComponent: ShoppingListComponent;
  let httpClient: HttpClient;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let page: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        HttpClientTestingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
          ShoppingListService
        ],
        declarations: [
          ShoppingListComponent
        ]
    });

    shoppingListService = TestBed.inject(ShoppingListService);
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ShoppingListComponent);
    shoppingListComponent = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('ShoppingListComponent ServiceCreated', () => {
    expect(shoppingListService).toBeDefined();
  });

  it('ShoppingListComponent ComponentCreated', () => {
    expect(shoppingListComponent).toBeTruthy();
  });

  it(`ShoppingListComponent AddShoppingItemLabel`, () => {
    expect(page.AddItemLabel.textContent).toContain('Add shopping item:');
  });

  it('ShoppingListComponent EmptyInput ButtonDisabled', () => {
    expect(shoppingListComponent.shoppingItem).toBe('');
    expect(page.AddItemButton.disabled).toBeTruthy();
  });

  it('ShoppingListComponent AddInput ButtonNotDisabled', () => {
    shoppingListComponent.shoppingItem = 'Cheetos';
    fixture.detectChanges();
    expect(page.AddItemButton.disabled).toBeFalse();
  });

  it('ShoppingListComponent TestClick', () => {
    spyOn(shoppingListComponent, 'addItem');
    shoppingListComponent.shoppingItem = 'Cheetos';
    fixture.detectChanges();
    expect(page.AddItemButton.disabled).toBeFalse();
    page.AddItemButton.click();
    fixture.detectChanges();
    expect(shoppingListComponent.addItem).toHaveBeenCalled();
  });

  it('ShoppingListComponent DeleteItemNull', () => {
    fixture.detectChanges();
    expect(page.DeleteButton).toBeFalsy();
  });
});

class Page {
  constructor(private fixture: ComponentFixture<ShoppingListComponent>) { } 

  get AddItemLabel() {
    return this.fixture.debugElement.nativeElement.querySelector('h4');
  }

  get AddItemButton() {
    return this.fixture.debugElement.nativeElement.querySelector('#add-item-button');
  }

  get AddItemInput() {
    return this.fixture.debugElement.nativeElement.querySelector('input');
  }

  get DeleteButton() {
    return this.fixture.debugElement.nativeElement.querySelector('.shopping-item button');
  }

  get DeleteButtonAll() {
    return this.fixture.debugElement.nativeElement.queryAll('#delete-item-button');
  }

  get EmptyListMessage() {
    return this.fixture.debugElement.nativeElement.querySelector('.empty-list');
  }

  get ErrorMessage() {
    return this.fixture.debugElement.nativeElement.querySelector('#input-error');
  }

  get ShoppingList() {
    return this.fixture.debugElement.queryAll(By.css('.list-item'));
  }
}