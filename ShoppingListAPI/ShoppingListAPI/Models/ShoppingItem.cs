using System.ComponentModel.DataAnnotations;

namespace ShoppingListAPI.Models
{
    public class ShoppingItem
    {
        [Key]
        public int Id { get; set; } 

        public string ItemName { get; set; }

        public int Quantity { get; set; }
    }
}
