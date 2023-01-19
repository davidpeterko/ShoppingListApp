namespace ShoppingListAPI.Models
{
    public class ShoppingItem
    {
        public int Id { get; set; } 
        public string? ItemName { get; set; }
        public int? Quantity { get; set; }
    }
}
