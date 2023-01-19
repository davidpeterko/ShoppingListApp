using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;
using ShoppingListAPI.Repositories;

namespace ShoppingListAPI.Test
{
    public class ShoppingListRepositoryTests
    {
        private readonly ShoppingListContext context;

        public ShoppingListRepositoryTests()
        {
            // We use a new guid here so every test will use a different db
            DbContextOptionsBuilder dbOptions = new DbContextOptionsBuilder()
                .UseInMemoryDatabase(
                    Guid.NewGuid().ToString()               
                );

            context = new ShoppingListContext(dbOptions.Options);
        }

        [Fact]
        public async Task GetShoppingList()
        {
            context.ShoppingItems.Add(new ShoppingItem { Id = 1, ItemName = "Toilet Paper", Quantity = 1 });
            context.ShoppingItems.Add(new ShoppingItem { Id = 2, ItemName = "Oranges", Quantity = 3 });
            context.ShoppingItems.Add(new ShoppingItem { Id = 3, ItemName = "Garlic Powder", Quantity = 1 });
            context.ShoppingItems.Add(new ShoppingItem { Id = 4, ItemName = "AA Batteries", Quantity = 1 });
            await context.SaveChangesAsync();

            var shoppingListRepository = new ShoppingListRepository(context);

            var shoppingList = await shoppingListRepository.GetShoppingList();

            Assert.NotNull(shoppingList);
            Assert.Equal(4, shoppingList.Count);
        }

        [Fact]
        public async Task AddShoppingItem()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos",
                Quantity = 5
            };

            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingItems = context.ShoppingItems.ToList();
            Assert.Single(shoppingItems);
            Assert.Equal(1, shoppingItems.First().Id);
        }
    }
}