using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Contexts;
using WarehouseApi.Models;
using System.Linq;

namespace WarehouseApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly WarehouseContext context;

    public OrderController(WarehouseContext _context)
    {
        context = _context;
    }

    [HttpGet] // [HttpGet("{skip}/{take}")], Get(int skip, int take), https://7000/ordre/10/100
    public async Task<ActionResult<List<Order>>> Get()
    {
        try
        {
            // .Skip(20).Take(20)
            List<Order> orders = await context.Order.Take(20).ToListAsync();        
            return orders;
        }
        catch
        {
            return StatusCode(500);
        }        
    }

     [HttpGet] // [HttpGet("{skip}/{take}")], Get(int skip, int take), https://7000/ordre/10/100
     [Route("[action]/{name}")]
    public async Task<ActionResult<List<Order>>> Get(string name)
    {
        List<Order> orders = await context.Order.Where( ord => ord.Name == name ).ToListAsync();
        return orders;
        
    }    

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try{
            Order? orderToDelete  = await context.Order.FindAsync(id);
            if( orderToDelete != null )
            {
                context.Order.Remove(orderToDelete);
                await context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

}