namespace free_places
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("TbParkingLot")]
    public class ParkingLot
    {
        [Key]
        public int PlCode { get; set; }
        public int PlVolume { get; set; }
        public int PlCapacity { get; set; }

        public int AvailableSpots => PlVolume - PlCapacity;
    }
}
