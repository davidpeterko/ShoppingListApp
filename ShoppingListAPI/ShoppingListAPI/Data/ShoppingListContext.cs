using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Models;

namespace ShoppingListAPI.Data
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext(DbContextOptions<ShoppingListContext> options) : base(options) { }

        public DbSet<ShoppingItem> ShoppingItems => Set<ShoppingItem>();
    }
}
