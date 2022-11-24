using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApi.Models
{
    public class GameCharacter
    {
        [Key]
        public int Id { get; set; }
        public int GameId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(250)]
        public string? Image { get; set; }
        public virtual Game? Game { get; set; }

        [NotMapped]
        public IFormFile? File { get; set; }
    }
}
