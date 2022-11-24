using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApi.Models
{
    public class Game
    {
        public Game()
        {
            GameCharacter = new HashSet<GameCharacter>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Title { get; set; }
        [MaxLength(250)]
        public string? Platform { get; set; }
        [MaxLength(20)]
        public string ReleaseYear { get; set; }
        [MaxLength(250)]
        public string? Image { get; set; }
        [NotMapped]
        public IFormFile? File { get; set; }
        public virtual ICollection<GameCharacter?> GameCharacter { get; set; }
    }
}
