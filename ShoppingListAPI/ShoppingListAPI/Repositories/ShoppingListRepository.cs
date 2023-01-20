using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Data;
using ShoppingListAPI.Models;
using System.Data.Common;
using System.Runtime.CompilerServices;

namespace ShoppingListAPI.Repositories
{
    public class ShoppingListRepository : IShoppingListRepository
    {
        private readonly ShoppingListContext _context;

        public ShoppingListRepository(ShoppingListContext context)
        {
            _context = context; 
        }

        public async Task<List<ShoppingItem>> GetShoppingList()
        {
            try
            {
                return await _context.ShoppingItems.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task AddItem(ShoppingItem shoppingItem)
        {
            try
            {
                var item = await _context.ShoppingItems.Where(x => x.ItemName == shoppingItem.ItemName).FirstOrDefaultAsync();

                if (item == null)
                {
                    _context.ShoppingItems.Add(shoppingItem);
                    await _context.SaveChangesAsync();
                }
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.ToString());
            }
        }

        public async Task RemoveItem(ShoppingItem shoppingItem)
        {
            try
            {
                var item = await _context.ShoppingItems.Where(x => x.Id == shoppingItem.Id && x.ItemName == shoppingItem.ItemName).FirstOrDefaultAsync();

                if (item != null)
                {
                    _context.ShoppingItems.Remove(item);
                    await _context.SaveChangesAsync();
                }
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.ToString());
            }
        }
    }
}
