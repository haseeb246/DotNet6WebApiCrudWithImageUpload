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
    [Route("api/game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly WarehouseContext _context;

        public GameController(WarehouseContext context)
        {
            _context = context;
        }

        // GET: api/Game
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Game>>> GetAll()
        {
            return await _context.Game.ToListAsync();
        }

        // GET: api/Game/5
        [HttpGet("GetById")]
        public async Task<ActionResult<Game>> GetById(int id)
        {
            var game = await _context.Game.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // GET: api/Game/5
        [HttpGet("GetByName")]
        public async Task<ActionResult<Game>> GetByName(string title)
        {
            var game = await _context.Game.Where(s => s.Title == title).FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // PUT: api/Game/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update")]
        public async Task<ActionResult<bool>> Update([FromForm] Game model)
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

        // POST: api/Game
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create")]
        public async Task<ActionResult<bool>> Create([FromForm] Game model)
        {

            if (model.File != null)
            {
                model.Image = updateFile(model.File);
            }

            _context.Game.Add(model);
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
        // DELETE: api/Game/5
        [HttpDelete("Delete")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var game = await _context.Game.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Game.Remove(game);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool GameExists(int id)
        {
            return _context.Game.Any(e => e.Id == id);
        }
    }
}
