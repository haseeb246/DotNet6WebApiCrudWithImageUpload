using System.ComponentModel.DataAnnotations;
using WarehouseApi.Interfaces;

namespace WarehouseApi.Models;

public class Order : IOrder
{
    [Key]
    public int Id {get; set;}
    public string Name {get; set;} = "";
    public string Image {get; set;} = null!;
}