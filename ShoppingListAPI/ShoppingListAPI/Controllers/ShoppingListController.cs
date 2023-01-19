using Microsoft.AspNetCore.Mvc;
using ShoppingListAPI.Models;
using ShoppingListAPI.Services;

namespace ShoppingListAPI.Controllers
{
    [ApiController]
    [Route("/api/shoppinglist")]
    public class ShoppingListController : ControllerBase
    {
        private readonly ILogger<ShoppingListController> _logger;
        private readonly IShoppingListService _shoppingListService;

        public ShoppingListController(ILogger<ShoppingListController> logger, IShoppingListService shoppingListService)
        {
            _logger = logger;
            _shoppingListService = shoppingListService;
        }

        [HttpGet("getShoppingList")]
        public async Task<List<ShoppingItem>> GetShoppingList()
        {
            try
            {
                return await _shoppingListService.GetShoppingList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        [HttpPost("addItem")]
        public async Task<List<ShoppingItem>> AddItem(ShoppingItem shoppingItem)
        {
            try
            {
                await _shoppingListService.AddItem(shoppingItem);
                return await _shoppingListService.GetShoppingList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        [HttpPost("removeItem")]
        public async Task<List<ShoppingItem>> RemoveItem(ShoppingItem shoppingItem)
        {
            try
            {
                await _shoppingListService.RemoveItem(shoppingItem);
                return await _shoppingListService.GetShoppingList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
    }
}