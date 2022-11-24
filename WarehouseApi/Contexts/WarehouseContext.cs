#nullable disable
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Models;

namespace WarehouseApi.Contexts;
public class WarehouseContext : DbContext
{
    public WarehouseContext(DbContextOptions<WarehouseContext> options):base(options){}

    public DbSet<Order> Order {get; set;}
    public DbSet<Game> Game { get; set;}
    public DbSet<GameCharacter> GameCharacter { get; set; }
}