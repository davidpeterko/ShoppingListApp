using ShoppingListAPI.Models;

namespace ShoppingListAPI.Repositories
{
    public interface IShoppingListRepository
    {
        Task<List<ShoppingItem>> GetShoppingList();

        Task AddItem(ShoppingItem item);

        Task RemoveItem(ShoppingItem item);
    }
}
