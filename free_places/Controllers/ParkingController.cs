using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace free_places.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly ParkingContext _context;

        public ParkingController(ParkingContext context)
        {
            _context = context;
        }

        [HttpGet("available-spots")]
        public async Task<ActionResult<IEnumerable<object>>> GetAvailableSpots()
        {
            var availableSpots = await _context.ParkingLots
                .Select(p => new
                {
                    p.PlCode,
                    AvailableSpots = Math.Max(p.PlVolume - p.PlCapacity, 0) 
                })
                .ToListAsync();

            return Ok(availableSpots);
        }

    }
}
