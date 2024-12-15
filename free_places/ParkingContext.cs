using Microsoft.EntityFrameworkCore;

namespace free_places
{
    public class ParkingContext : DbContext
    {
        public ParkingContext(DbContextOptions<ParkingContext> options) : base(options) { }

        public DbSet<ParkingLot> ParkingLots { get; set; }
    }
}
