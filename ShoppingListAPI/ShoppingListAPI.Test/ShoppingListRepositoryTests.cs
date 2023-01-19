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
        public async Task GetShoppingList_Empty()
        {
            var shoppingListRepository = new ShoppingListRepository(context);

            var shoppingList = await shoppingListRepository.GetShoppingList();

            Assert.Empty(shoppingList);
        }

        [Fact]
        public async Task GetShoppingList_WithData()
        {
            context.ShoppingItems.AddRange(
                new ShoppingItem { Id = 1, ItemName = "Toilet Paper", Quantity = 1 },
                new ShoppingItem { Id = 2, ItemName = "Oranges", Quantity = 3 },
                new ShoppingItem { Id = 3, ItemName = "Garlic Powder", Quantity = 1 },
                new ShoppingItem { Id = 4, ItemName = "AA Batteries", Quantity = 1 });
            await context.SaveChangesAsync();

            var shoppingListRepository = new ShoppingListRepository(context);

            var shoppingList = await shoppingListRepository.GetShoppingList();

            Assert.NotNull(shoppingList);
            Assert.Equal(4, shoppingList.Count);
        }

        [Fact]
        public async Task AddShoppingItem_SingleItem()
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

        [Fact] 
        public async Task AddShoppingItem_DuplicateItem()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos",
                Quantity = 5
            };

            await shoppingListRepository.AddItem(item);
            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingItems = context.ShoppingItems.ToList();
            Assert.Single(shoppingItems);
            Assert.Equal(1, shoppingItems.First().Id);
        }

        [Fact]
        public async Task AddShoppingItem_NoId()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                ItemName = "Cheez It Puffs Spicy",
                Quantity = 5
            };

            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingItems = context.ShoppingItems.ToList();
            Assert.Single(shoppingItems);
            Assert.Equal(1, shoppingItems.First().Id);
        }

        [Fact]
        public async Task AddShoppingItem_NullName()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = null,
                Quantity = 5
            };

            Action act = async () => await shoppingListRepository.AddItem(item);
        }
    }
}