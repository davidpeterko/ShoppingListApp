using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;
using ShoppingListAPI.Repositories;
using System;

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

        #region GetShoppingList tests

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
                new ShoppingItem { Id = 1, ItemName = "Toilet Paper" },
                new ShoppingItem { Id = 2, ItemName = "Oranges" },
                new ShoppingItem { Id = 3, ItemName = "Garlic Powder" },
                new ShoppingItem { Id = 4, ItemName = "AA Batteries" });
            await context.SaveChangesAsync();

            var shoppingListRepository = new ShoppingListRepository(context);

            var shoppingList = await shoppingListRepository.GetShoppingList();

            Assert.NotNull(shoppingList);
            Assert.Equal(4, shoppingList.Count);
        }

        #endregion

        #region AddItem tests

        [Fact]
        public async Task AddShoppingItem_SingleItem()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos"
            };

            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Single(shoppingList);
            Assert.Equal(1, shoppingList.First().Id);
        }

        [Fact] 
        public async Task AddShoppingItem_DuplicateItem()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos"
            };

            await shoppingListRepository.AddItem(item);
            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Single(shoppingList);
            Assert.Equal(1, shoppingList.First().Id);
        }

        [Fact]
        public async Task AddShoppingItem_NoIdAutoIncrement()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                ItemName = "Cheez It Puffs White Cheddar"
            };

            await shoppingListRepository.AddItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Single(shoppingList);
            Assert.Equal(1, shoppingList.First().Id);
            Assert.Equal("Cheez It Puffs White Cheddar", shoppingList.First().ItemName);
        }

        [Fact]
        public async Task AddShoppingItem_Null()
        {
            var shoppingListRepository = new ShoppingListRepository(context);

            await Assert.ThrowsAsync<InvalidOperationException>(async () => await shoppingListRepository.AddItem(null));
        }

        #endregion

        #region RemoveItem tests

        [Fact]
        public async Task RemoveShoppingItem_RemoveFromEmpty()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 8,
                ItemName = "Garlic Powder"
            };

            await shoppingListRepository.RemoveItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Empty(shoppingList);
        }

        [Fact]
        public async Task RemoveShoppingItem_AddThenRemove()
        {
            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos"
            };

            await shoppingListRepository.AddItem(item);
            await shoppingListRepository.RemoveItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Empty(shoppingList);
        }

        [Fact]
        public async Task RemoveShoppingItem_RemoveItemThatDoesntExist()
        {
            context.ShoppingItems.AddRange(
                new ShoppingItem { Id = 1, ItemName = "Toilet Paper" },
                new ShoppingItem { Id = 2, ItemName = "Oranges" },
                new ShoppingItem { Id = 3, ItemName = "Garlic Powder" },
                new ShoppingItem { Id = 4, ItemName = "AA Batteries" });
            await context.SaveChangesAsync();


            var shoppingListRepository = new ShoppingListRepository(context);
            var item = new ShoppingItem()
            {
                Id = 1,
                ItemName = "Flamin' Hot Cheetos"
            };

            await shoppingListRepository.RemoveItem(item);

            List<ShoppingItem> shoppingList = context.ShoppingItems.ToList();
            Assert.Equal(4, shoppingList.Count);
        }

        [Fact]
        public async Task RemoveShoppingItem_Null()
        {
            var shoppingListRepository = new ShoppingListRepository(context);

            await Assert.ThrowsAsync<InvalidOperationException>(async () => await shoppingListRepository.RemoveItem(null));
        }

        #endregion
    }
}