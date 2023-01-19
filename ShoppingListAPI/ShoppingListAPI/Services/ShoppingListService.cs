using ShoppingListAPI.Models;
using ShoppingListAPI.Repositories;

namespace ShoppingListAPI.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly IShoppingListRepository _shoppingListRepository;

        public ShoppingListService(IShoppingListRepository shoppingListRepository)
        {
            _shoppingListRepository = shoppingListRepository;
        }

        public async Task<List<ShoppingItem>> GetShoppingList()
        {
            return await _shoppingListRepository.GetShoppingList();
        }

        public async Task AddItem(ShoppingItem shoppingItem)
        {
            await _shoppingListRepository.AddItem(shoppingItem);
        }

        public async Task RemoveItem(ShoppingItem shoppingItem)
        {
            await _shoppingListRepository.RemoveItem(shoppingItem);
        }
    }
}
