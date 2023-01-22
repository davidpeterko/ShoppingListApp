import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ShoppingListService } from './service/shopping-list.service';

describe('AppComponent', () => {
  let shoppingListService: ShoppingListService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ShoppingListService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    shoppingListService = TestBed.inject(ShoppingListService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AppComponent ComponentCreated', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('AppComponent TitleRender', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container h2')?.textContent).toContain('Shopping List');
  });
});
