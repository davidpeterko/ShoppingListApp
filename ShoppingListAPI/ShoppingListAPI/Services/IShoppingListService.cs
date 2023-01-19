using ShoppingListAPI.Models;

namespace ShoppingListAPI.Services
{
    public interface IShoppingListService
    {
        Task<List<ShoppingItem>> GetShoppingList();

        Task AddItem(ShoppingItem item);

        Task RemoveItem(ShoppingItem item);

        Task UpdateItemQuantity(ShoppingItem item);
    }
}
