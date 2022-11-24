using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using WarehouseApi.Contexts;
using WarehouseApi.Models;

namespace WarehouseApi.Controllers
{
    [Route("api/GameCharacter")]
    [ApiController]
    public class GameCharacterController : ControllerBase
    {
        private readonly WarehouseContext _context;

        public GameCharacterController(WarehouseContext context)
        {
            _context = context;
        }

        // GET: api/GameCharacter
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            return await _context.GameCharacter.Include(s => s.Game)
                .Select(s => new
                {
                    s.GameId,
                    s.Id,
                    s.Name,
                    s.Image,
                    Game = new
                    {
                        s.Game.Title
                    }
                })
                .ToListAsync();
        }

        // GET: api/GameCharacter/5
        [HttpGet("GetById")]
        public async Task<ActionResult<GameCharacter>> GetById(int id)
        {
            var game = await _context.GameCharacter.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // GET: api/GameCharacter/5
        [HttpGet("GetByName")]
        public async Task<ActionResult<GameCharacter>> GetByName(string name)
        {
            var game = await _context.GameCharacter.Where(s => s.Name == name).FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // PUT: api/GameCharacter/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update")]
        public async Task<ActionResult<bool>> Update([FromForm] GameCharacter model)
        {

            try
            {

                if (model.File != null)
                {
                    model.Image = updateFile(model.File);
                }

                _context.Entry(model).State = EntityState.Modified;
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(model.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        // POST: api/GameCharacter
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create")]
        public async Task<ActionResult<bool>> Create([FromForm] GameCharacter model)
        {

            if (model.File != null)
            {
                model.Image = updateFile(model.File);
            }

            _context.GameCharacter.Add(model);
            await _context.SaveChangesAsync();
            return true;
        }

        private string updateFile(IFormFile? file)
        {
            string path = string.Empty;

            if (file != null)
            {
                try
                {
                    // 2. set the file uploaded folder
                    var uploadFolder = Path.Combine(GetRootPath(), "files");

                    if (!Directory.Exists(uploadFolder))
                    {
                        Directory.CreateDirectory(uploadFolder);
                    }

                    // 3. check for the file length, if it is more than 0 the save it
                    if (file.Length > 0)
                    {
                        // 3a. read the file name of the received file
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition)
                            .FileName.Trim('"');

                        path = GetUniqueName(fileName);
                        // 3b. save the file on Path
                        var finalPath = Path.Combine(uploadFolder, path);
                        using (var fileStream = new FileStream(finalPath, FileMode.Create))
                        {
                            file.CopyTo(fileStream);
                        }

                        path = GetPreviewImagePath(path);
                    };
                }
                catch (Exception ex)
                {
                    path = "";
                }
            }

            return path;
        }
        public static string GetRootPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        }
        public static string GetUniqueName(string fileName)
        {
            string randFileName = Guid.NewGuid().ToString().Replace('-', '_') + Path.GetExtension(fileName);
            return randFileName;
        }
        public static string GetPreviewImagePath(string fileName)
        {
            string path = "files/" + fileName;
            return path;
        }
        // DELETE: api/GameCharacter/5
        [HttpDelete("Delete")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var game = await _context.GameCharacter.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.GameCharacter.Remove(game);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool GameExists(int id)
        {
            return _context.GameCharacter.Any(e => e.Id == id);
        }
    }
}
